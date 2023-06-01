<<<<<<< HEAD
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
const client = new AWS.DynamoDB.DocumentClient();

=======
import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();
>>>>>>> a85d214b736d3951b0786219669a1549849c111f

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
