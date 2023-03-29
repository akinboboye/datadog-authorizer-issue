import { AWS } from '@serverless/typescript';

const configuration: AWS = {
  service: 'datadog',
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    timeout: 30,
    stage: 'test',
  },
  package: { individually: true },
  functions: {
    authorizer: {
      handler: 'dist/authorizer.handler',
      architecture: 'arm64',
      environment: {
        SHOULD_AUTHORIZE_REQUEST: '${env:SHOULD_AUTHORIZE_REQUEST}'
      },
      package: {
        patterns: ['!./**', 'dist/authorizer.js']
      }
    },
    getUsers: {
      handler: 'dist/get-user.handler',
      architecture: 'arm64',
      events: [
        {
          http: {
            method: 'get',
            path: '/',
            authorizer:  {
              name: 'authorizer',
              resultTtlInSeconds: 0,
              type: 'request',
            },
            cors: true,
          },
        },
      ],
      package: {
        patterns: ['!./**', 'dist/get-user.js']
      }
    },
  },
  plugins: ['serverless-plugin-datadog', 'serverless-offline', 'serverless-plugin-lambda-insights'],
  custom: {
    datadog: {
      enableXrayTracing: true,
      addLayers: true,
      apiKey: '${env:DATADOG_API_KEY}',
      env: 'test',
    },
    lambdaInsights: {
      defaultLambdaInsights: true,
    },
  }
}

module.exports = configuration;