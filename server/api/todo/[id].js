import {db} from '../../db'

export default defineEventHandler((event)=> {
    const method = event.method;
    const {id} = event.context.params

    const findTodoById = (todoId) => {
        let index;
        const todo = db.todos.find((t, i) => {
         if(t.id === todoId) {
            index = i;
            return true;
         }
         return false;
        })
        if(!todo) {
            const notFoundError = createError({
                statusCode : 404,
                statusMessage : "item not found",
                data : {},
            });
            sendError(event, notFoundError);
        }
        return {todo, index};
    }
    if (method === 'PUT') {
        const {todo, index} = findTodoById(id);

        const updateTodo = {
            ...todo,
            completed : !todo.completed
        }

        db.todos[index] = updateTodo;
        return updateTodo;
    }
    if(method === 'DELETE') {
        const {index} = findTodoById(id);
        db.todos.splice(index, 1);
        return {
            message : "item deleted successfully"
        }
    }
});