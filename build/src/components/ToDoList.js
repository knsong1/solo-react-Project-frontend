import "../App.css"
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from "react-redux";
import { setTodo, addTodo, deleteTodo } from "../features/todos/todoSlice";




const ToDoList = () => {
    const todos = useSelector(state => state.todos.todos);
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
   const dispatch = useDispatch();

    let submitForm = async (e) => {
        console.log("in submit form")
        e.preventDefault()
        await fetch('/add-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               todo: input,
            }),
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log('Success:', data);
            dispatch(addTodo(data));
            setInput('');
      
        })
        .catch((error) =>
        console.log("Unable to add post", error)
        )
    }
  
    const clickaddTodo = (todo) => {
      const newTodo = {
        todo: todo,
      };
  
      // add the todo to the list
      setList([...list, newTodo]);
  
      // clear input box
      setInput("");
    };
  
    const removeEventByID = async (id, e) => {
        await fetch(`/delete-todos/${id}`, {
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
            dispatch(deleteTodo(id));
            
        })
    }

    const fetchTodos = async () => {
        await fetch("/list-todos")
            .then(response => response.json())
            .then(json => dispatch(setTodo(json)));
    }

    useEffect(() => {
        fetchTodos();
    }, [])
  
    return (
      <div className="todoList" style={{borderStyle:"solid",padding:"auto", borderRadius:"20px", width:"20em", color:"black", left:"180px", top:"500px"}}>
        <h1 style={{ alignContent:"center", fontFamily:"'Roboto', sans-serif"}}>Todo List</h1>
        <form onSubmit={submitForm}>
             <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
          <button onClick={() => clickaddTodo(input)}>Add</button>
        </form>
      
        <ul>
          {list.map((list) => (
            <li style={{ textAlign:"center"}} key={list.id}>
              {list.todo}
              <button onSubmit={removeEventByID}>&times;</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ToDoList

