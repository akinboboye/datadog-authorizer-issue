import { 
  APIGatewayProxyStructuredResultV2, 
  APIGatewayEvent,
} from 'aws-lambda';

import { datadog } from "datadog-lambda-js";

const getUser = async (
  event: APIGatewayEvent
  ): Promise<APIGatewayProxyStructuredResultV2> => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    },
    body: JSON.stringify({
      message: 'get user handler response',
    }),
  };
};

export const handler = datadog(getUser);
