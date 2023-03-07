import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from "../features/event/eventSlice"
import todoReducer from "../features/todos/todoSlice"

export default configureStore({
  reducer: {
    events: eventsReducer,
    todos: todoReducer
  },
});
