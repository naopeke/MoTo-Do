 'use client'

import TodoList from "../../ui/TodoList";
import { getCollectionNameById, getTodos } from "@/app/lib/actions";
import { useRouter, usePathname } from "next/navigation";

export default async function TodoPage() {

  const router = useRouter();
  const pathname = usePathname();

  const collection_id = parseInt(pathname.split('/').pop() || '0', 10);
  const collectionName = await getCollectionNameById(collection_id);

  // const [collectionName, setCollectionName] = useState<string | null>(null);

  const data = await getTodos(collection_id);
 

  const handleBack = () => {
    router.back();
  };

  return (
    <>
    <div className="relative flex min-h-screen flex-col items-center p-24">
      <div className="absolute top-6 right-20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={handleBack}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </div>

      <h1 className="m-3 font-extrabold">{collectionName}</h1>
       <TodoList todos={data}></TodoList>
    </div>
    </>
  );
}