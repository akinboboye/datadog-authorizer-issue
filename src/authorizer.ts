import {
  APIGatewayRequestAuthorizerEvent,
  Context,
  Callback
} from 'aws-lambda';
import { datadog } from 'datadog-lambda-js';

const authorizer = async (
  event: APIGatewayRequestAuthorizerEvent,
  _: Context,
  callback: Callback
): Promise<void> => {
  const shouldAuthorizeRequest =
    process.env.SHOULD_AUTHORIZE_REQUEST?.toLowerCase() === 'true'

  if (!shouldAuthorizeRequest) {
    callback('Unauthorized')
  } else {
    callback(null, {
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*'
        }],
      },
      principalId: 'user'
    })
  }
};

export const handler = datadog(authorizer);

