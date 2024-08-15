import TodoCollection from '../ui/todo/TodoCollection';

export default function TodoPage() {

  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <h1 className="m-3 font-extrabold">Todo List Collection</h1>
       <TodoCollection />
    </div>
  );
}