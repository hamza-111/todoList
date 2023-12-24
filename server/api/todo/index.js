import {db} from "../../db/index.js";
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event)=> {
    const method = event.method

    if(method ==='GET') {
        return db.todos
    }

    else if(method === 'POST') {
        const body = await readBody(event)
        console.log({body})
        if(!body.item) throw new Error()
        const newTodo = {
            id : uuidv4(),
            item : body.item,
            completed : false,
        }
    db.todos.push(newTodo)
    return newTodo
    }
})