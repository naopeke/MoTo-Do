"use client"

import { useState, useEffect } from "react";
import { Todo } from "../lib/definitions"; 
import TodoItem from "./TodoItem";
import { getTodos, postTodo, deleteTodo } from "../lib/actions";

export default function TodoList(){

    const [ todos, setTodos ] = useState<Todo[]>([]); // fetch
    const [ newTodo, setNewTodo ] = useState(''); //add

    useEffect(()=>{
        const fetchPrevTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };
        fetchPrevTodos();
    }, []);

    const addTodo = async() =>{
        if (!newTodo.trim()) return;

        try {
            const formData = new FormData();
            formData.append('description', newTodo)
            const data = await postTodo(formData);
            console.log('data in front', data[0].item_id);
            const updatedData = await getTodos();
            setTodos(updatedData);

        } catch (err){
            console.error('Error adding', err);
        }
    }

    const removeTodo = async(item_id: string) =>{
        try {
            const data = await deleteTodo(item_id);
            console.log('data after removing front', data);
            const updatedData = await getTodos();
            setTodos(updatedData);

        } catch (err){
            console.error('Error removing', err);
        }
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    className="shadow-md rounded-md p-2" 
                    placeholder="Text your task"
                    value={newTodo}
                    onChange ={(event)=> setNewTodo(event.target.value)}
                />
                <button 
                    className="m-3 p-2 shadow-md border border-white rounded-md"
                    onClick={addTodo}
                >Enter</button>
            </div>

            <div>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.item_id} 
                        className="p-2 border border-white rounded-md"
                    >
                        <TodoItem
                            item_id={todo.item_id}
                            description={todo.description}
                            onRemove={() => removeTodo(todo.item_id)}
                        />
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}