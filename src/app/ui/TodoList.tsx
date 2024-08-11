"use client"

import { useState, useEffect } from "react";
import { Todo } from "../lib/definitions"; 
import TodoItem from "./TodoItem";
import { getTodos, postTodo, deleteTodo } from "../lib/actions";

export default function TodoList(){

    // const [ todos, setTodos ] = useState<Todo[]>([
    //     {item_id: "1a", description: "task1", isDone: false},
    //     {item_id: "1b", description: "task2", isDone: false},
    //     {item_id: "1c", description: "task3", isDone: false}
    // ]); // fetch

    const [ todos, setTodos ] = useState<Todo[]>([]); // fetch
    const [ newTodo, setNewTodo ] = useState(''); //add

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchedTodos = [
    //             { item_id: "1a", description: "task1", isDone: false },
    //             { item_id: "1b", description: "task2", isDone: false },
    //             { item_id: "1c", description: "task3", isDone: false }
    //         ];
            
    //         setTodos(fetchedTodos);
    //     };

    //     fetchData();
    // }, []); 

    // /pages/api/todosの場合
//     useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const res = await fetch("pages/api/todos");
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data: Todo[] = await res.json();
//         setTodos(data); // フェッチしたTODOリストを状態にセット
//       } catch (err) {
//         console.error("Failed to fetch todos:", err);
//       }
//     };

//     fetchTodos();
//   }, []);

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

    // const addTodo = () => {
    //     if (newTodo){
    //         setTodos([...todos, {item_id:(todos.length +1).toString(), description: newTodo, isDone:false}])
    //         setNewTodo('');
    //     }
    // }


    // const addTodo = async () => {
    //     if(newTodo){
    //         try {
    //             const res = await fetch('/pages/api/todos', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json'},
    //                 body: JSON.stringify({ description: newTodo })
    //             });

    //             if (!res.ok){
    //                 throw new Error (`status:  ${res.status}`);
    //             }

    //             const data = await res.json();
    //             setTodos([...todos, data]);
    //             setNewTodo('');

    //         } catch (err) {
    //             console.error('Failed adding', err)
    //         }
    //     }
    // }

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


    // const removeTodo = (item_id: string) => {
    //     setTodos(todos.filter(todo => todo.item_id !== item_id));
    // }

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