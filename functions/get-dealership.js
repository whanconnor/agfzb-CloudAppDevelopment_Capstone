/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  return new Promise(function (resolve, reject) {
    const { CloudantV1 } = require("@ibm-cloud/cloudant");
    const { IamAuthenticator } = require("ibm-cloud-sdk-core");
    const authenticator = new IamAuthenticator({
      apikey: "s-g2zETnXBkhUAbBHig6BxIvuqyBnRCHloECHxSKmlJ1", 
    });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator,
    });
    cloudant.setServiceUrl("https://c2c7ace2-972b-444c-999b-269dccab31e4-bluemix.cloudantnosqldb.appdomain.cloud"); 
    if (params.st) {
     
      cloudant
        .postFind({ db: "dealerships", selector: { st: params.st } })
        .then((result) => {
          let code = 200;
          if (result.result.docs.length == 0) {
            code = 404;
          }
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
            body: result.result.docs,
          });
        })
        .catch((err) => {
          reject(err);
        });
    } else if (params.dealerId) {
      id = parseInt(params.dealerId);
      // return dealership with this id
      cloudant
        .postFind({
          db: "dealerships",
          selector: {
            id: parseInt(params.dealerId),
          },
        })
        .then((result) => {
          let code = 200;
          if (result.result.docs.length == 0) {
            code = 404;
          }
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
            body: result.result.docs,
          });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      // return all documents
      cloudant
        .postAllDocs({ db: "dealerships", includeDocs: true })
        .then((result) => {
          let code = 200;
          if (result.result.rows.length == 0) {
            code = 404;
          }
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
            body: result.result.rows,
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
