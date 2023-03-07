import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { useEffect } from 'react';
import { setEvent, addEvent } from "../features/event/eventSlice";


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



const Events = () => {
    const events = useSelector(state => state.events.events); 
    const [newEvent, setNewEvent] = useState({ title: "", startDate: "", endDate: "" });
    const [allEvents, setAllEvents] = useState('');



    const [hideForm, setHideForm] = useState(true)
    const dispatch = useDispatch();



    const fetchEvents = async () => {
        await fetch("/list-events")
            .then(response => response.json())
            .then(json => dispatch(setEvent(json)));
    }




    const submitForm = async (e) => {
        console.log("getting form")
        e.preventDefault();
      
        console.log(e.target.startDate, "are we getting to form?")
        await fetch('/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               newEvent: newEvent,
               allEvents: allEvents
            }),
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log('Success:', data);
            dispatch(addEvent(data));
            setNewEvent();
            setAllEvents();
      
        })
        .catch((error) =>
        console.log("Unable to add post", error)
        )
    }
   

   
        function handleAddEvent(e) {
           e.preventDefault();
            for (let i=0; i<allEvents.length; i++){
    
                const d1 = new Date (allEvents[i].startDate);
                console.log("hi there event",d1.toDateString())
                const d2 = new Date (newEvent);
                const d3 = new Date (allEvents[i].endDate);
                const d4 = new Date (newEvent);
          /*
              console.log(d1 <= d2);
              console.log(d2 <= d3);
              console.log(d1 <= d4);
              console.log(d4 <= d3);
                */
    
                 if (
                  ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                    (d4 <= d3) )
                  )
                {   
                    alert("CLASH"); 
                    break;
                 }
        
            }
            
            
            setAllEvents([...allEvents, newEvent]);
        
        }


    function showEventForm() {
        setHideForm(false)
      }

    useEffect(() => {
        fetchEvents();
    }, [])


    return (
        <div className="App" >  
       
            <div className="container"> 
                
                <div className="left">
                    <div className="calendar">
                    <p>Calendar</p>
                    <img className="pencil" src="/images/pencil.png" style={{position: "absolute",width: "100px"}}></img>
                        <Calendar fetchEvents={fetchEvents} className="fullCalendar" id="calendar" localizer={localizer}  events={events} startAccessor="startDate" endAccessor="endDate" style={{ height: 500, margin: "50px",  backgroundColor: 'white' }} />
                    </div>
                </div>
           
            <div className="right" >
      
                <div className="events">
                    <div className="btnWrap">
                         <button className="addEventBtn" onClick={showEventForm} > Add Event </button >  
                    </div>
                    <form className="addEventForm"  style={{display: hideForm ? 'none' : 'block'}} onSubmit={submitForm}> 
                        <div>
                            <input type="text" className="title" placeholder="Add Title" value={newEvent.title} name="event" style={{ width: "15%", borderRadius: '5px' }} onChange={(e) => newEvent(e.target.value)} />
                            <DatePicker  className="title" type="date" placeholderText="Start Date" name="startDate" style={{ marginRight: "10px", borderRadius: '20px' }} selected={newEvent.newEvent} onChange={(newEvent) => setNewEvent({ ...newEvent, newEvent })} />
                            <DatePicker  className="title" type="date"  placeholderText="End Date" name="endDate" selected={newEvent.endDate} onChange={(newEvent) => setNewEvent({ ...newEvent, newEvent })}/>
                            <div className="btnWrap">
                                <button className="addBtn" onClick={handleAddEvent}> Submit </button>
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