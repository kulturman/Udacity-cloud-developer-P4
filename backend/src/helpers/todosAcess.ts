import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

const todosTable = process.env.TODOS_TABLE
const docClient = new AWS.DynamoDB.DocumentClient()

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

async function createTodo(todoItem: TodoItem) {
    await docClient.put({
        TableName: todosTable,
        Item: todoItem
    }).promise()
}

async function updateTodo() {

}

async function deleteTodo(userId: string, todoId: string) {
    await docClient
      .delete({
        TableName: todosTable,
        Key: { userId, todoId }
      })
      .promise();
}

async function getTodo(userId: string, todoId: string) {
    const result = await docClient
      .get({
        TableName: todosTable,
        Key: { userId, todoId }
      })
      .promise();
    logger.info('Items: ' + JSON.stringify(result));
    return result.Item;
}

async function getTodosForUser(userId: string) {
    const result = await docClient
      .query({
        TableName: todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise();
    return result.Items;
}

export {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo,
    getTodosForUser
}