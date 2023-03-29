import {
  APIGatewayRequestAuthorizerEvent,
  APIGatewayAuthorizerResult
} from 'aws-lambda';
import { datadog } from 'datadog-lambda-js';

const authorizer = async (
  event: APIGatewayRequestAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const shouldAuthorizeRequest =
    process.env.SHOULD_AUTHORIZE_REQUEST?.toLowerCase() === 'true'

  if (!shouldAuthorizeRequest) {
    throw new Error("Unauthorized");
  }

  return {
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: 'Allow',
        Resource: '*'
      }],
    },
    principalId: 'user'
  }
};

export const handler = datadog(authorizer);

