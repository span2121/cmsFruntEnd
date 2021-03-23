const  express = require('express');
const route = express.Router();
const database = require("../config/db.config")
const getHeaderNode = require('../modals/header').header;
var sql = "";
var isInError = 0;
var isErrorMsg = "";
var isErrorCode = "";

route.get("/",  async (req, res, next) => {
    let action = req.query.action || null;
    let userId = req.query.userId || null;
    let loginMail = req.query.loginMail || null;
    let loginPassword = req.query.loginPassword || null;
    let isloginEnabeled = req.query.isloginEnabeled || null;
    let passwordReset = req.query.passwordReset || null;

    let result = "";
	isInError = 0;
	isErrorMsg = "";
	isErrorCode = "";

//  CALL USER_login("LOGIN",NULL, "SACHIN", '1234',NULL, null )
// CALL USER_login(_action, _userId, _userLoginEmail, _userPassword, _userLoginIsEnabeled, _userPasswordReset)
    let sql = () => {
        let SQL = "call USER_login(?,?,?,?,?,?)";

        console.log("SQL --- > ", SQL, req.query);
        return new Promise((resolve, reject) => {
            database.query(SQL, [action, userId, loginMail, loginPassword, isloginEnabeled, passwordReset], (err, result) => {
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
