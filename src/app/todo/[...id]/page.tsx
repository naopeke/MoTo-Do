'use client'

import TodoList from "../../ui/TodoList";
import { getCollectionNameById } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function TodoPage() {

  const [collectionName, setCollectionName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const collection_id = parseInt(pathname.split('/').pop() || '0', 10);

  useEffect(()=> {
    const fetchCollectionName = async() => {
      try {
        const name = await getCollectionNameById(collection_id);
        setCollectionName(name);
        console.log('collection name', name);
      } catch(err){
        console.error('Error fetching collection name', err)
      }
    }
    fetchCollectionName(); 
  }, [collection_id])

  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">{collectionName}</h1>
       <TodoList></TodoList>
    </div>
  );
}