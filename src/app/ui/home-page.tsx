import Image from "next/image";

export default function HomePage() {
    return (
      <>
      <div className="relative w-full h-[400px]">
        <Image
          src={'/motero.jpg'}
          alt="biker"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E83560] to-[rgba(239,146,93,0.3)]">
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-4 rounded-md">
          <h1 className="text-4xl font-bold">Plan your next two-wheeled adventure with ease.</h1>
          <h4 className="mt-2 text-lg">The all-in-one app for bikers.</h4>
          <a
            href="/login"
            className="mt-4 inline-block bg-white text-black py-2 px-4 rounded-full hover:bg-pink-500 hover:text-white hover:font-bold transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 py-4 pl-20">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold mb-5 text-xl text-pink-600">Gear Up for Your Next Ride with MoTo-Do</h2>
          <div className="rounded-md p-3">
            <p className="text-justify">Are you ready to rev up your productivity and hit the open road? MoTo-Do is the ultimate to-do app designed exclusively for motorbike enthusiasts like you. Whether you're planning a weekend getaway, optimizing your daily commute, or embarking on an epic cross-country tour, MoTo-Do is your trusty sidekick.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-[200px] h-[250px]">
            <Image
            src={'/todo.png'}
            alt="biker"
            fill
            className="object-cover"
            />
          </div>
        </div>
      </div>
      </>
    );
  }