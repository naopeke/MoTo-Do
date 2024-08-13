import styles from './ui/home.module.css'; 
import HomePage from "./ui/home-page";


export default function Home() {
  return (
    <main className={`${styles.homePage} flex min-h-screen flex-col items-center p-24`}>
      <HomePage/>
    </main>
  );
}
