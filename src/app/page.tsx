import TodoList from "./ui/TodoList";
import { Metadata } from "next";
import styles from './ui/home.module.css'; 

export const metadata: Metadata = {
  title: 'Naopeke Todo'
}

export default function Home() {
  return (
    <main className={`${styles.homePage} flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">Naopeke Todo</h1>
       <TodoList></TodoList>
    </main>
  );
}
