'use client';

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react"; //occur error if you use localStrage only
import Image from "next/image";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
        const user = localStorage.getItem('user');
        setIsLoggedIn(user !== null);
    })

    const handleLogout = async () => {
        localStorage.removeItem('user');
        router.push('/')
    };


    return(
        <header className="py-3">
            <nav className="flex justify-between">
                {isLoggedIn ? (
                <>
                    <div>
                        <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTo-Do</Link>
                    </div>
                    <div>
                        <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                            About
                        </Link>
                        <Link className={`link ${pathname === '/todo' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/todo">
                            Todo
                        </Link>
                        <button title="Login" onClick={handleLogout} className="mr-5 ml-5 font-semibold">
                            Logout
                        </button>
                    </div>
                </>

                ) : (
                <>
                    <div>
                        <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTo-Do</Link>
                    </div>
                    <div>
                        <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                            About
                        </Link>
                        <Link title="Login" href="/login" className="mr-5 ml-5 font-semibold">
                            Login
                        </Link>
                    </div>
                </>
                )
                } 
               
            </nav>
        </header>
    )
}