var getHeaderNode = function (code, msg) {
	return new Promise((resolve, reject) => {
		//console.log("Header Node");
		var header = {
			message: msg,
			errorMessage: "",
			errorCode: "0",
		};

		var getErrorCode = function () {
			return new Promise(function (resolve, reject) {
				//console.log("Error code function");
				if (code) {
					//console.log("is Code True");
					switch (code) {
						case "INVALID_PASSWORD": {
							header.message = "Password Is Invalid.";
							header.errorCode = 1;
							break;
						}
						case "LOGIN_FAILED": {
							header.message =
								"Login failed, please confirm your email and password and the account is active.";
							header.errorCode = 1;
							break;
						}
						case "CONNECTION_ERROR": {
							header.message =
								"There is a problem connecting to server, please try again.";
							break;
						}
						case "INVALID_DATA": {
							header.message = "Your parameters appear to be invalid.";
							header.errorCode = 1;
							break;
						}
						case "INVALID_EMAIL": {
							header.message = "Please check the eamil used, it was not found.";
							header.errorCode = 1;
							break;
						}
						case "USER-EXCEPTION": {
							header.errorCode = 1;
							break;
						}
						default: {
							header.message = "";
							break;
						}
					}
					return resolve();
				} else {
					return resolve();
				}
			});
		};

		// Promise.all([getErrorCode()])
		getErrorCode()
			.then(function (allData) {
				//console.log("header from promise all", header);
				resolve(header);
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
	});
};

exports.header = getHeaderNode;
