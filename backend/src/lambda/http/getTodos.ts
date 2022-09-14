import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core';
import cors from '@middy/http-cors'
import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todos = await getTodosForUser(getUserId(event))

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
)
