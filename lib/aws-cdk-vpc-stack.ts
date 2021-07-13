import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class AwsCdkVpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Vpc", {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Ingress',
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ]
    });

    const properties: lambda.FunctionProps = {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'product-mgmt.handler',
      vpc: vpc,
      vpcSubnets:
      {
        subnetType: ec2.SubnetType.ISOLATED
      }
    }
    const hello = new lambda.Function(this, 'ProductHandler', properties);
    const apigateway = new apigw.LambdaRestApi(this, "api", {
      handler: hello
    });
  }
}
