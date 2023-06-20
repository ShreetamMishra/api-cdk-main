// import { expect, haveResource } from "@aws-cdk/assert";
// import * as sst from "@serverless-stack/resources";
// import DynamoDBStack from "../lib/DynamoDBStack";
// test("Test Stack", () => {
//   const app = new sst.App();

//   // WHEN
//   const stack = new DynamoDBStack(app, "test-stack");

//   // THEN
//   expect(stack).to(
//     haveResource("AWS::DynamoDB::Table")
//   );
// });
//  import { haveResource } from "aws-cdk-lib/assertions";
// import { Template } from "aws-cdk-lib/assertions";
// import { App, getStack } from "@serverless-stack/resources";
// import DynamoDBStack from "../lib/DynamoDBStack";
// import { test } from "vitest";

// test("Test DynamoDBStack", () => {
//   const app = new App();
//   // const stack = new DynamoDBStack(app, "test-stack");

//   // app.stack(DynamoDBStack);

//   const template = Template.fromStack(getStack(DynamoDBStack));
//   template.hasResourceProperties("AWS::DynamoDB::Table");
// });
import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import DynamoDBStack from "../lib/DynamoDBStack";
test("Test Stack", () => {
    const app = new sst.App();

  // WHEN
  const stack = new DynamoDBStack(app, "test-stack");
  const template = Template.fromStack(stack);
  // THEN
  template.hasResource("AWS::DynamoDB::Table",{});
  });
