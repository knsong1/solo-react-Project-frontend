import React from "react"

function ListPosted(todos, removeEventByID) {
    return (
        <div>
            <ul>
                 <li>
                 <p>{todos ? todos.todo : 'NOT SET'}</p>   
        
            </li>   
            </ul> 
            <input type="checkbox" id="checkbox"/> 
            <button onClick={() => removeEventByID(todos ? todos.id : 'NOT SET')}>&times;</button>  
    
        </div>

    )
    
}

export default ListPosted;