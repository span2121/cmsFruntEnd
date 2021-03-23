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
    let circularDetail = req.query.circularDetail || null;
    let circularTitle = req.query.circularTitle || null;
    let circularSpecificto = req.query.circularSpecificto || null;
    let circulartoRole = req.query.circulartoRole || null;
    let attachmentURL = req.query.attachmentURL || null;
    let startDate = req.query.startDate || null;
    let EndDate = req.query.EndDate || null;
    let circularId = req.query.circularId || null;

    let result = "";
	isInError = 0;
	isErrorMsg = "";
	isErrorCode = "";


    let sql = () => {
        let SQL = "call circular_Notification(?,?,?,?,?,?,?,?,?)";

        console.log("SQL --- > ", SQL, req.query);
        return new Promise((resolve, reject) => {
            database.query(SQL, [action, circularTitle, circularDetail, circularSpecificto, circulartoRole, attachmentURL, startDate, EndDate, circularId ], (err, result) => {
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
            result= result[0]
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
