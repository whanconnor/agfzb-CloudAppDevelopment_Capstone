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
    dealership = parseInt(params.dealerId);
    // return reviews with this dealer id
    cloudant
      .postFind({
        db: "reviews",
        selector: {
          dealership: parseInt(params.dealerId),
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
  });
}

