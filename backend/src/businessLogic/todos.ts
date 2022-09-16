import 'source-map-support/register'
import { TodoItem } from "../models/TodoItem"
import * as dbAccessor from '../helpers/todosAcess';
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import * as uuid from 'uuid';
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

async function createTodo(userId: string, newTodo: CreateTodoRequest) {
    const todoItem: TodoItem = {
        ...newTodo,
        userId,
        done: false,
        todoId: uuid.v4(),
        attachmentUrl: '',
        createdAt: new Date().toDateString()
    };
    await dbAccessor.createTodo(todoItem);
    return todoItem;
}

async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest) {
    await dbAccessor.updateTodo(userId, todoId, updatedTodo);
}

async function deleteTodo(userId: string, todoId: string) {
    await dbAccessor.deleteTodo(userId, todoId);
}

async function getTodo(userId: string, todoId: string) {
    return await dbAccessor.getTodo(userId, todoId);
}

async function getTodosForUser(userId: string) {
    return dbAccessor.getTodosForUser(userId);
}

export {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo,
    getTodosForUser
}