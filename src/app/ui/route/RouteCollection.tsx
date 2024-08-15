"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RouteListCollection } from "../../lib/definitions";
import RouteCollectionItem from "./RouteCollectionItem";
import { getRouteCollections, postRouteCollection, deleteRouteCollection, putRouteCollection } from "../../lib/actions";


export default function RouteCollection() {
  const [todos, setTodos] = useState<RouteListCollection[]>([]); // fetch
  const [newTodo, setNewTodo] = useState(""); // add
  const router = useRouter();
  const [userId, setUserId] =useState<number>(); //localstorage

  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      const userData = JSON.parse(user);
      setUserId(userData.user_id);
    }
  },[]);

  useEffect(() => {
    if (userId !== undefined) { 
    const fetchPrevRoutes = async () => {
      try {
        const data = await getRouteCollections(userId);
        setTodos(data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
      };
      fetchPrevRoutes();
    }
  }, [userId]); 


  const addCollection = async () => {
    if (!newTodo.trim() || userId === undefined) return;

    try {
      const formData = new FormData();
      formData.append("description", newTodo);
      const data = await postRouteCollection(formData, userId);
      const updatedData = await getRouteCollections(userId);
      setTodos(updatedData);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding", err);
    }
  };

  const removeCollection = async (collection_id: number) => {
    if (userId === undefined) return;

    try {
      await deleteRouteCollection(collection_id);
      const updatedData = await getRouteCollections(userId);
      setTodos(updatedData);
    } catch (err) {
      console.error("Error removing", err);
    }
  };

  const updateCollection = async (collection_id: number, collection_name: string) => {
    if (userId === undefined) return;

    try {
      await putRouteCollection(collection_id, collection_name);
      const updatedData = await getRouteCollections(userId);
      setTodos(updatedData);
    } catch (err) {
      console.error("Error updating", err);
    }
  };

  const redirect = (collection_id: number)=>{
    router.push(`/todo/${collection_id}`);
  }


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

      <div>
            <ul>
                {todos.map((collection: RouteListCollection) => (
                    <li key={collection.route_collection_id} 
                        className="p-2 shadow-md rounded-md"
                    >
                        <RouteCollectionItem
                            collection_id={collection.route_collection_id}
                            collection_name={collection.route_collection_name}
                            onEdit={updateCollection}
                            onRemove={()=> removeCollection(collection.route_collection_id)}
                            onRedirect={redirect}
                        />
                    </li>
                ))}
            </ul>
            </div>
    </div>
  );
}
