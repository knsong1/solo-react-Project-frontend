import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: []
    },
    reducers: {
        setEvent: (state, action) => {
            state.events = action.payload
        },
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload]
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(events => events.id !== action.payload)
        }
    }
})

export const { setEvent, addEvent, deleteEvent} = eventSlice.actions;

export default eventSlice.reducer;