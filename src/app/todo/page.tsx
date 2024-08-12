import TodoList from "../ui/TodoList";
import styles from '../ui/home.module.css'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
  };


export default function TodoPage() {
  return (
    <div className={`${styles.homePage} flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">Naopeke Todo</h1>
       <TodoList></TodoList>
    </div>
  );
}