import React from 'react';
import {useSelector } from "react-redux";
import { deleteEvent } from "../features/event/eventSlice";

export const ToggleEvent = () => {
    const events = useSelector(state => state.events.events); 
    console.log(events)

    const removeEventByID = async (id, e) => {
        await fetch(`/delete-events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            window.location.reload();
            dispatch(deleteEvent(id)); 
            
        })
    }
  return (
    events.map(date =>
        
   <TriggerButton removeEventByID={removeEventByID}  key={post.id} date={date}/>
    )
  );
};
export default ToggleEvent;