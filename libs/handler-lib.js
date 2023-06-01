export default function handler(lambda) {
    return async function (event, context) {
      let body, statusCode;
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
<<<<<<< HEAD
        console.log(e);
=======
>>>>>>> a85d214b736d3951b0786219669a1549849c111f
        body = { error: e.message };
        statusCode = 500;
      }
    // Return HTTP response
      return {
        statusCode,
        body: JSON.stringify(body),
      };
    };
  }