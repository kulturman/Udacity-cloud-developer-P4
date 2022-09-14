import * as AWS from "aws-sdk"
import 'source-map-support/register'
import * as uuid from 'uuid'
import middy from '@middy/core';
import { cors } from 'middy/middlewares'
import { TodoItem } from "../models/TodoItem"

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

function updateTodo() {

}

function deleteTodo() {

}

function getTodo() {

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