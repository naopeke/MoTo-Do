"use client"

import { useState } from "react"

type TodoItemProps = {
    item_id: string;
    description: string;
    onEdit: (item_id: string, description: string) => void;
    onRemove: (item_id: string) => void;
}

export default function TodoItem ({item_id, description, onEdit, onRemove}: TodoItemProps){

    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(description);
    const [isCompleted, setIsCompleted] = useState(false)

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleEditSave = () => {
        onEdit(item_id, editedTodo);
        setIsEditing(false);
    };

    const handleCheckboxChange = () => {
        setIsCompleted(!isCompleted)
    }

    return (
        <div>
            {isEditing ? (
                <div className="flex justify-between">
                    <input 
                        type="text"
                        value={editedTodo}
                        onChange={(e)=> setEditedTodo(e.target.value)}
                        className="border p-1"
                    />
                    <button
                        className="p-2 rounded-md bg-lime-600"
                        onClick={handleEditSave}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                </div>
            ): (
                <div className="flex justify-between">
                    <div>
                        <input 
                            type="checkbox"
                            checked={isCompleted}
                            onChange={handleCheckboxChange}
                            className="m-2"
                        />
                        <span className={isCompleted? "line-through": ""}>
                            {description}
                        </span>
                    </div>
                    <div>
                        <button
                            className="p-2 mr-1 rounded-full bg-pink-500"
                            onClick={handleEdit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </button>
                        <button 
                            className="p-2 rounded-full bg-pink-500"
                            onClick={()=>onRemove(item_id)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        </button>
                    </div>
                </div>
            )
            }
        </div>
    )
}