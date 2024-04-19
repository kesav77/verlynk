var response = require('../config/responses.json')
var Responses = {
  get:function(errorCode,errorMessage,data,logError) {
    var response = { meta: {}, data: {} };
    switch(errorCode) {
      case 200:
        response.meta.type="success";break
      case 201:
        response.meta.type="created";break
      case 204:
        response.meta.type="deleted";break
      case 400:
        response.meta.type="Invalid Request";break
      case 401:
        response.meta.type="Unauthorized Requests";break
      case 403:
        response.meta.type="Forbidden";break
      case 404:
        response.meta.type="Resource Not Found";
        break
      case 500:
        response.meta.type="Server Issue";break
    }
    response.meta.code = errorCode;
    response.meta.message = errorMessage;
    if(data) {
      response.meta.rows = data.length
    }
    //console.log(data)
    response.data=data;
    return response;
  }
};

module.exports = Responses;
