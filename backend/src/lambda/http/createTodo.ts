import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import middy from '@middy/core';
import cors from '@middy/http-cors'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';
import { TodoItem } from '../../models/TodoItem';
import * as uuid from 'uuid';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const todoItem: TodoItem = {
      ...newTodo,
      userId: getUserId(event),
      done: false,
      todoId: uuid.v4(),
      attachmentUrl: '',
      createdAt: new Date().toDateString()
    };

    await createTodo(todoItem);

    return {
      statusCode: 201,
      body: JSON.stringify({item: todoItem})
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
