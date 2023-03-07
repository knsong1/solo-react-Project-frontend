import format from "date-fns/format";
import {useSelector, useDispatch } from "react-redux";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {  useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { setEvent, addEvent, deleteEvent } from "../features/event/eventSlice";

import Container from "./DeleteFunction";



// import ReactWeather, { useOpenWeather } from 'react-open-weather';
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



const Events = (index) => {
    const events = useSelector(state => state.events.events); 
   
    const [newEvent, setNewEvent] = useState({ event: "", startDate: "", endDate: "" }); 

    const [hideForm, setHideForm] = useState(true)
    const triggerText = 'Add ToDo';
    const dispatch = useDispatch();



    let submitForm = async (e) => {
        e.preventDefault()
   
        await fetch('/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               event: newEvent.event,
               endDate: newEvent.endDate,
               startDate: newEvent.startDate
            }),
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log('Success:', data);
            dispatch(addEvent(data));
            setNewEvent();
      
        })
        .catch((error) =>
        console.log("Unable to add post", error)
        )
    }

    const fetchEvents = async () => {
        await fetch("/list-events")
            .then(response => response.json())
            .then(json => dispatch(setEvent(json)));
    }



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

    


    function showEventForm(e) {
        e.preventDefault();
        setHideForm(false)
      }

      const submitDeleteBtn = (event) => {
        event.preventDefault(event);
      };

      useEffect(() => {
        fetchEvents();
    }, [])


    return (
        <div className="App" >  
            <div className="container"> 
                <div className="left">
                    <div className="calendar">
                    <p style={{position:"relative"}}>Calendar</p>
                    <img className="pencil" src="/images/pencil.png" style={{position: "absolute",width: "100px"}}></img>
                        <Calendar removeEventByID={removeEventByID} key={index.id} onSubmit={submitDeleteBtn} title={events} className="fullCalendar" id="calendar" localizer={localizer}  events={events} startAccessor="startDate" endAccessor="endDate" style={{ height: 500, margin: "50px",  backgroundColor: 'white' }} />
                        <div style={{position:"absolute", right:"20px", top:"10px"}}>
                            <Container  triggerText={triggerText} />
                        </div>
             
                    </div>
                </div>
           
            <div className="right" >
               
                <div className="events">
                         <button className="addEventBtn" onClick={showEventForm} > Add Event </button >  
          
                    <form autoComplete="off" className="addEventForm"  style={{display: hideForm ? 'none' : 'block'}}  onSubmit={submitForm}> 
                        <div className="addEventForm">
                            <input type="text" className="title" placeholder="Add Title" name="event" style={{ width: "20%", marginRight: "10px" }} value={newEvent.event} onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })} required/>
                            <DatePicker className="title" type="date" placeholderText="Start Date" name="startDate" style={{ marginRight: "10px", borderRadius: '20px' }} value={newEvent.startDate} selected={newEvent.startDate} onChange={(startDate) => setNewEvent({ ...newEvent, startDate })} required/>
                            <DatePicker className="title" type="date"  placeholderText="End Date" name="endDate" selected={newEvent.endDate} onChange={(endDate) => setNewEvent({ ...newEvent, endDate })} required/>
                            <div className="btnWrap">
                                <button className="addBtn" > Submit </button>
                            </div>
                          
                        </div>
                    </form>  
                 
                </div>

                
            </div>
        </div>
     </div>
    );
}

export default Events;

