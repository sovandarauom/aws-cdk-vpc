import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AwsCdkVpc from '../lib/aws-cdk-vpc-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsCdkVpc.AwsCdkVpcStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
