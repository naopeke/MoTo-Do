"use client"

import { Todo } from "../lib/definitions"

type TodoItemProps = {
    item_id: string;
    description: string;
    onRemove: (item_id: string) => void;
}

export default function TodoItem ({item_id, description, onRemove}: TodoItemProps){

    return (
        <div className="flex justify-between">
            {/* <input type="text" /> */}
            <span>{description}</span>
            <button 
                className="p-2 rounded-md bg-rose-900"
                onClick={()=>onRemove(item_id)}
            >Delete</button>
        </div>
    )
}