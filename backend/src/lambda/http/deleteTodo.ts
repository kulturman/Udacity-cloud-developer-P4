import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'
import { deleteTodo, getTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    const todoItem = await getTodo(userId, todoId);

    if (!todoItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `TodoItem ${todoId} does not exist` })
      } 
    }
    
    await deleteTodo(userId, todoId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `TodoItem ${todoId} deleted successfully` })
    } 
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
