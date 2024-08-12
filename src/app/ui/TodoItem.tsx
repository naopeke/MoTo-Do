"use client"

import { Todo } from "../lib/definitions"
import { useState } from "react"
import { getTodos, putTodo } from "../lib/actions"

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
                        className="p-2 rounded-md bg-lime-800"
                        onClick={handleEditSave}
                    >
                        Save
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
                            className="p-2 mr-1 rounded-md bg-yellow-600"
                            onClick={handleEdit}
                        >Edit
                        </button>
                        <button 
                            className="p-2 rounded-md bg-rose-900"
                            onClick={()=>onRemove(item_id)}
                        >Delete
                        </button>
                    </div>
                </div>
            )
            }
        </div>
    )
}