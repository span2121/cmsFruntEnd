const express = require('express')
const route = express.Router();
const database = require("../config/db.config")
const getHeaderNode = require('../modals/header').header;
var sql = "";
var isInError = 0;
var isErrorMsg = "";
var isErrorCode = "";

route.post('/', async (req, res, next) => {
    let action = req.query.action || null;
    let regCode = req.query.regCode || null;
    let usnNumber = req.query.usnNumber || null;
    let firstName = req.query.firstName || null;
    let lastName = req.query.lastName || null;
    let fatherName = req.query.fatherName || null;
    let motherName = req.query.motherName || null;
    let email = req.query.email || null;
    let phoneNo = req.query.phoneNo || null;
    let emergencyNo = req.query.emergencyNo || null;
    let branch = req.query.branch || null;
    let instructor = req.query.instructor || null;
    let gender = req.query.gender || null;
    let DOB = req.query.DOB || null;
    let matrixPercentage = req.query.matrixPercentage || null;
    let puPercentage = req.query.puPercentage || null;
    let password = req.query.password || null;
    let role = req.query.role || null;
    let maxQualification = req.query.maxQualification || null;
    let subAssigned = req.query.subAssigned || null;
    let address = req.query.address || null;
    let totalPercentage = req.query.totalPercentage || null;
    let semister = req.query.semister || null;
    //added newly for teacher

    let params = [action, regCode, usnNumber, firstName, lastName, fatherName,
                 motherName, email,  phoneNo, emergencyNo, branch, instructor,gender, DOB, 
                matrixPercentage, puPercentage, password, role, maxQualification,  subAssigned,
                address, totalPercentage, semister ];

    let result = "";
	isInError = 0;
	isErrorMsg = "";
	isErrorCode = "";

    // -- call REGISTER_register('TEACHER_REGISTER','std-1','34rf44dd','Natraj','service','gangappa','gangavva',
    // -- 'mail@mail.com','3456785643','323454454','ECE','3454','Male','1990-02-02','60','70','12345','3','MTECH','DIP',
    // -- 'fnjdbfd fenfjod ','80','6');
let sql = () => {
    let SQL = "call REGISTER_register(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    console.log("SQL --- > ", SQL, req.query);
    return new Promise((resolve, reject) => {
        database.query(SQL, params, (err, result) => {
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
                resolve(result[0]);
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

route.post('/percentage', async (req, res, next) => {
    let action = req.query.action || null;
    let studentId = req.query.studentId || null;
    let matrix = req.query.matrix || null;
    let puc = req.query.puc || null;
    let sem1 = req.query.sem1 || null;
    let sem2 = req.query.sem2 || null;
    let sem3 = req.query.sem3 || null;
    let sem4 = req.query.sem4 || null;
    let sem5 = req.query.sem5 || null;
    let sem6 = req.query.sem6 || null;
    let sem7 = req.query.sem7 || null;
    let sem8 = req.query.sem8 || null;

    let result = "";
	isInError = 0;
	isErrorMsg = "";
	isErrorCode = "";
    let params = [ action, studentId, matrix, puc, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8]

    let sql = () => {
        let SQL = "call STUDEMNT_Percentage(?,?,?,?,?,?,?,?,?,?,?,?)";
        console.log("SQL ---> ", SQL, req.query);
        return new Promise((resolve, reject) => {
            database.query(SQL, params, (err, result) => {
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
                    resolve(result[0]);
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

})
module.exports = route;