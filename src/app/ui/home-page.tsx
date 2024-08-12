import Image from "next/image";

export default function HomePage() {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
            <h1 className="text-2xl font-bold">Organize your life with our Todo app</h1>
            <h4 className="mt-2 text-lg">Tired of forgetting important tasks? Our Todo app will help you stay organized. Create lists, set reminders, and mark tasks as complete. It's simple, effective, and fully customizable!</h4>
        </div>
        <div className="flex">
            <Image 
                src={'/img-app.png'}
                alt="app-image"
                width={500}
                height={300}
                className="border border-slate-200 rounded-md"
            />
        </div>
      </div>
    );
  }