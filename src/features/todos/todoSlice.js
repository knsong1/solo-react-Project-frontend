import { createSlice } from '@reduxjs/toolkit';

export const toDoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        setTodo: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todos => todos.id !== action.payload)
        }
    }
})

export const { setTodo, addTodo, deleteTodo} = toDoSlice.actions;

export default toDoSlice.reducer;