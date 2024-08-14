"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TodoListCollection } from "../lib/definitions";
import TodoCollectionItem from "./TodoCollectionItem";
import { getCollections, postCollection, deleteCollection, putCollection } from "../lib/actions";
import { List, arrayMove } from "react-movable";
import { useSession } from "next-auth/react";

export default function TodoCollection() {
  const [todos, setTodos] = useState<TodoListCollection[]>([]); // fetch
  const [newTodo, setNewTodo] = useState(""); // add
  const [items, setItems] = useState<TodoListCollection[]>([]); // react-movable
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);

  useEffect(() => {
    const fetchPrevTodos = async () => {
      try {
        const data = await getCollections();
        setTodos(data);
        setItems(data); // Initialize items with fetched todos
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchPrevTodos();
  }, []);

  const addCollection = async () => {
    if (!newTodo.trim() || !session?.user?.id) return;
    const user_id = Number(session.user.id);

    try {
      const formData = new FormData();
      formData.append("description", newTodo);
      const data = await postCollection(formData, user_id);
      const updatedData = await getCollections();
      setTodos(updatedData);
      setItems(updatedData);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding", err);
    }
  };

  const removeCollection = async (collection_id: number) => {
    try {
      await deleteCollection(collection_id);
      const updatedData = await getCollections();
      setTodos(updatedData);
      setItems(updatedData); // Update items as well
    } catch (err) {
      console.error("Error removing", err);
    }
  };

  const updateTodo = async (item_id: number, description: string) => {
    try {
      await putCollection(item_id, description);
      const updatedData = await getCollections();
      setTodos(updatedData);
      setItems(updatedData); // Update items as well
    } catch (err) {
      console.error("Error updating", err);
    }
  };

  const redirect = (collection_id: number)=>{
    router.push(`/todo/${collection_id}`);
  }


  const handleDragEnd = async ({ oldIndex, newIndex,}: { oldIndex: number; newIndex: number;}) => {
    if (oldIndex !== newIndex) {
      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      setItems(reorderedItems);

      const updatedTodos = reorderedItems.map((item, index) => ({
        ...item,index,
    }));
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="shadow-md rounded-md p-2"
          placeholder="Make your new Todo List"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          className="m-3 p-2 shadow-md bg-pink-400 rounded-full"
          onClick={addCollection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0px auto",
          backgroundColor: "#F7F7F7",
        }}
      >
        <List
          values={items}
          onChange={handleDragEnd}
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{ padding: 0, cursor: isDragged ? "grabbing" : undefined }}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => (
            <li
              {...props}
              key={props.key}
              style={{
                ...props.style,
                padding: "1.5em",
                margin: "0.5em 0em",
                listStyleType: "none",
                cursor: isDragged ? "grabbing" : "grab",
                border: "1px solid #CCC",
                boxShadow: "3px 3px #AAA",
                color: "#333",
                borderRadius: "5px",
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
              }}
            >
              <TodoCollectionItem
                collection_id={value.collection_id}
                collection_name={value.collection_name}
                onEdit={updateTodo}
                onRemove={() => removeCollection(value.collection_id)}
                onRedirect={()=> redirect(value.collection_id)}
              />
            </li>
          )}
        />
      </div>
    </div>
  );
}
