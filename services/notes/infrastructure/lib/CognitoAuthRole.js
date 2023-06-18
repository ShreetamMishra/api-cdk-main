import * as cdk from "aws-cdk-lib";
import { Construct } from 'constructs';
import * as iam from "aws-cdk-lib/aws-iam";
import * as cognito from "aws-cdk-lib/aws-cognito";
export default class CognitoAuthRole extends Construct {
    // Public reference to the IAM role
  role;

  constructor(scope, id, props) {
    super(scope, id);

    const { identityPool } = props;

    // IAM role used for authenticated users
    this.role = new iam.Role(this, "CognitoDefaultAuthenticatedRole", {
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
    });

    this.role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "mobileanalytics:PutEvents",
          "cognito-sync:*",
          "cognito-identity:*",
        ],
        resources: ["*"],
      })
    );

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      "IdentityPoolRoleAttachment",
      {
        identityPoolId: identityPool.ref,
        roles: { authenticated: this.role.roleArn },
      }
    );
  }
}
// import * as cdk from "aws-cdk-lib";
// import { Construct } from 'constructs';
// import * as iam from "aws-cdk-lib/aws-iam";
// import * as cognito from "aws-cdk-lib/aws-cognito";

// export default class CognitoAuthRole extends cdk.Construct {
//   // Public reference to the IAM role
//   role;

//   constructor(scope, id, props) {
//     super(scope, id);

//     const { identityPool } = props;

//     // IAM role used for authenticated users
//     this.role = new iam.Role(this, "CognitoDefaultAuthenticatedRole", {
//       assumedBy: new iam.FederatedPrincipal(
//         "cognito-identity.amazonaws.com",
//         {
//           StringEquals: {
//             "cognito-identity.amazonaws.com:aud": identityPool.ref,
//           },
//           "ForAnyValue:StringLike": {
//             "cognito-identity.amazonaws.com:amr": "authenticated",
//           },
//         },
//         "sts:AssumeRoleWithWebIdentity"
//       ),
//     });

//     this.role.addToPolicy(
//       new iam.PolicyStatement({
//         effect: iam.Effect.ALLOW,
//         actions: [
//           "mobileanalytics:PutEvents",
//           "cognito-sync:*",
//           "cognito-identity:*",
//         ],
//         resources: ["*"],
//       })
//     );

//     new cognito.CfnIdentityPoolRoleAttachment(
//       this,
//       "IdentityPoolRoleAttachment",
//       {
//         identityPoolId: identityPool.ref,
//         roles: { authenticated: this.role.roleArn },
//       }
//     );
//   }
// }
