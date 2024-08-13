import TodoList from "../ui/TodoList";
import styles from '../ui/home.module.css';
import Image from "next/image"; 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
  };


export default function TodoPage() {
  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <div className="w-full relative">
        <div className="absolute inset-x-0 bottom-5 h-1/3 bg-gradient-to-b from-transparent to-black">
          <p>Date </p>
        </div>
      </div>
      <h1 className="m-3 font-extrabold">Naopeke Todo</h1>
       <TodoList></TodoList>
    </div>
  );
}