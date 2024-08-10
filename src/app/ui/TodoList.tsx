"use client"

import { useState, useEffect } from "react";
import { Todo } from "../lib/definitions"; 
import TodoItem from "./TodoItem";
export default function TodoList(){

    const [ todos, setTodos ] = useState<Todo[]>([
        {item_id: "1a", description: "task1", isDone: false},
        {item_id: "1b", description: "task2", isDone: false},
        {item_id: "1c", description: "task3", isDone: false}
    ]); // fetch
    const [ newTodo, setNewTodo ] = useState(''); //add

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTodos = [
                { item_id: "1a", description: "task1", isDone: false },
                { item_id: "1b", description: "task2", isDone: false },
                { item_id: "1c", description: "task3", isDone: false }
            ];
            
            setTodos(fetchedTodos);
        };

        fetchData();
    }, []); 

    const addTodo = () => {
        if (newTodo){
            setTodos([...todos, {item_id:(todos.length +1).toString(), description: newTodo, isDone:false}])
            setNewTodo('');
        }

    }

    const removeTodo = (item_id: string) => {
        setTodos(todos.filter(todo => todo.item_id !== item_id));
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
                    <li key={todo.item_id} className="p-2 border border-white rounded-md">
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