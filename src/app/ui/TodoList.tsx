// "use client";

// import { useState, useEffect } from "react";
// import { Todo } from "../lib/definitions";
// import TodoItem from "./TodoItem";
// import { getTodos, postTodo, deleteTodo, putTodo, doneTodo } from "../lib/actions";
// import { List, arrayMove } from 'react-movable';

// export default function TodoList() {
//     const [todos, setTodos] = useState<Todo[]>([]); // fetch
//     const [newTodo, setNewTodo] = useState(''); // add
//     const [items, setItems] = useState<Todo[]>([]); // react-movable

//     useEffect(() => {
//         const fetchPrevTodos = async () => {
//             try {
//                 const data = await getTodos();
//                 setTodos(data);
//                 setItems(data); // Initialize items with fetched todos
//             } catch (err) {
//                 console.error('Failed to fetch data', err);
//             }
//         };
//         fetchPrevTodos();
//     }, []);

//     const addTodo = async () => {
//         if (!newTodo.trim()) return;
//         try {
//             const formData = new FormData();
//             formData.append('description', newTodo);
//             await postTodo(formData);
//             const updatedData = await getTodos();
//             setTodos(updatedData);
//             setItems(updatedData); // Update items as well
//             setNewTodo('');
//         } catch (err) {
//             console.error('Error adding', err);
//         }
//     };

//     const removeTodo = async (item_id: string) => {
//         try {
//             await deleteTodo(item_id);
//             const updatedData = await getTodos();
//             setTodos(updatedData);
//             setItems(updatedData); // Update items as well
//         } catch (err) {
//             console.error('Error removing', err);
//         }
//     };

//     const updateTodo = async (item_id: string, description: string) => {
//         try {
//             await putTodo(item_id, description);
//             const updatedData = await getTodos();
//             setTodos(updatedData);
//             setItems(updatedData); // Update items as well
//         } catch (err) {
//             console.error('Error updating', err);
//         }
//     };

//     const checkTodo = async (item_id: string, isDone: boolean) => {
//         try {
//             await doneTodo(item_id, isDone);
//             const updatedData = todos.map(todo =>
//                 todo.item_id === item_id ? { ...todo, isDone } : todo
//             );
//             setTodos(updatedData);
//             setItems(updatedData);
//         } catch (err) {
//             console.error('Error updating checked status', err);
//         }
//     }

//     const handleDragEnd = async ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
//         if (oldIndex !== newIndex) {
//             const reorderedItems = arrayMove(items, oldIndex, newIndex);
//             setItems(reorderedItems);
//             // Optionally, send the reordered list to the backend
//             // await updateTodosOrder(reorderedItems);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <input
//                     type="text"
//                     className="shadow-md rounded-md p-2"
//                     placeholder="Text your task"
//                     value={newTodo}
//                     onChange={(event) => setNewTodo(event.target.value)}
//                 />
//                 <button
//                     className="m-3 p-2 shadow-md bg-pink-400 rounded-full"
//                     onClick={addTodo}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="size-6">
//                         <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
//                     </svg>
//                 </button>
//             </div>

//             <div
//                 style={{
//                     maxWidth: '800px',
//                     margin: '0px auto',
//                     backgroundColor: '#F7F7F7',
//                 }}
//             >
//                 <List
//                     values={items}
//                     onChange={handleDragEnd}
//                     renderList={({ children, props, isDragged }) => (
//                         <ul
//                             {...props}
//                             style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
//                         >
//                             {children}
//                         </ul>
//                     )}
//                     renderItem={({ value, props, isDragged, isSelected }) => (
//                         <li
//                             {...props}
//                             key={props.key}
//                             style={{
//                                 ...props.style,
//                                 padding: '1.5em',
//                                 margin: '0.5em 0em',
//                                 listStyleType: 'none',
//                                 cursor: isDragged ? 'grabbing' : 'grab',
//                                 border: '1px solid #CCC',
//                                 boxShadow: '3px 3px #AAA',
//                                 color: '#333',
//                                 borderRadius: '5px',
//                                 fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
//                                 backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
//                             }}
//                         >
//                             <TodoItem
//                                 item_id={value.item_id}
//                                 description={value.description}
//                                 isDone={value.isDone}
//                                 onEdit={updateTodo}
//                                 onRemove={() => removeTodo(value.item_id)}
//                                 onCheckboxChange={checkTodo}
//                             />
//                         </li>
//                     )}
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { Todo } from "../lib/definitions";
import TodoItem from "./TodoItem";
import { getTodos, postTodo, deleteTodo, putTodo, doneTodo, updateTodoOrder
} from "../lib/actions";
import { List, arrayMove } from "react-movable";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]); // fetch
  const [newTodo, setNewTodo] = useState(""); // add
  const [items, setItems] = useState<Todo[]>([]); // react-movable

  useEffect(() => {
    const fetchPrevTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
        setItems(data); // Initialize items with fetched todos
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchPrevTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const orderIndex = items.length;
      const formData = new FormData();
      formData.append("description", newTodo);
      const data = await postTodo(formData, orderIndex);
      const updatedData = await getTodos();
      setTodos(updatedData);
      setItems(updatedData);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding", err);
    }
  };

  const removeTodo = async (item_id: string) => {
    try {
      await deleteTodo(item_id);
      const updatedData = await getTodos();
      setTodos(updatedData);
      setItems(updatedData); // Update items as well
    } catch (err) {
      console.error("Error removing", err);
    }
  };

  const updateTodo = async (item_id: string, description: string) => {
    try {
      await putTodo(item_id, description);
      const updatedData = await getTodos();
      setTodos(updatedData);
      setItems(updatedData); // Update items as well
    } catch (err) {
      console.error("Error updating", err);
    }
  };

  const checkTodo = async (item_id: string, isDone: boolean) => {
    try {
      await doneTodo(item_id, isDone);
      // Update todos state with new isDone status
      const updatedData = todos.map((todo) =>
        todo.item_id === item_id ? { ...todo, isDone } : todo
      );
      setTodos(updatedData);
      setItems(updatedData);
    } catch (err) {
      console.error("Error updating checked status", err);
    }
  };

  const handleDragEnd = async ({ oldIndex, newIndex,}: { oldIndex: number; newIndex: number;}) => {
    if (oldIndex !== newIndex) {
      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      setItems(reorderedItems);

      const updatedTodos = reorderedItems.map((item, index) => ({
        ...item,index,
    }));

      try {
        await updateTodoOrder(updatedTodos);
      } catch (err){
        console.error('Error updating order', err);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="shadow-md rounded-md p-2"
          placeholder="Text your task"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          className="m-3 p-2 shadow-md bg-pink-400 rounded-full"
          onClick={addTodo}
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
              <TodoItem
                item_id={value.item_id}
                description={value.description}
                isDone={value.isDone}
                onEdit={updateTodo}
                onRemove={() => removeTodo(value.item_id)}
                onCheckboxChange={checkTodo}
              />
            </li>
          )}
        />
      </div>
    </div>
  );
}
