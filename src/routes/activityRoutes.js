const  express = require('express');
const route = express.Router();
const database = require("../config/db.config")
const getHeaderNode = require('../modals/header').header;
var sql = "";
var isInError = 0;
var isErrorMsg = "";
var isErrorCode = "";

route.post("/",  async (req, res, next) => {
    let action = req.query.action || null;
    let activityId = req.query.activityId || null;
    let activityDetId = req.query.activityDetId || null;
    let title = req.query.title || null;
    let details = req.query.details || null;
    let assignedTo = req.query.assignedTo || null;
    let scheduleDate = req.query.scheduleDate || null;
    let dueDate = req.query.dueDate || null;
    let activityType = req.query.activityType || null;
    let status = req.query.status || null;
    let assignedBy = req.query.assignedBy || null;
    let priority = req.query.priority || null

    let result = "";
	isInError = 0;
	isErrorMsg = "";
	isErrorCode = "";

    let sql = () => {
        let SQL = "call ACTIVITY_details(?,?,?,?,?,?,?,?,?,?,?,?)";

        console.log("SQL --- > ", SQL, req.query);
        return new Promise((resolve, reject) => {
            database.query(SQL, [action, activityId, activityDetId, title, details, assignedTo, 
                scheduleDate, dueDate, activityType, status, assignedBy, priority ], (err, result) => {
                if(err){
                    console.log("Error:" , err);
                    isInError= 1;
                    isErrorCode="FILTER_ERROR";
                    if(err.sqlState == 41001) {
                        isErrorMsg = "Make sure to provide your login.";
                    } else {
                        isErrorMsg = err.sqlState + ": We had difficulty performaing this action.  Pleae report his number to your contact.";
                    }
                    resolve("");
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    if(isInError == 0){
        if(action != null) {
            result = await sql();
            if(result && Array.isArray(result))
            result= result
        }
        getHeaderNode(isErrorCode, isErrorMsg)
        .then((header) => {
            let response = {
                header: header,
                results: result,
            };
           return res.send(response);
        })
        .catch((err) => {
            res.send(err);
        });
    } else {
        // end isError
		console.log("get /api/ ERROR ");
		getHeaderNode(isErrorCode, isErrorMsg)
			.then((header) => {
				let response = {
					isErrorMsg: isErrorMsg,
				};
			  return res.send(response);
			})
			.catch((err) => {
				res.send(err);
			});
	} // end isError
});

module.exports = route;
