'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import Image from "next/image";

export default function Header() {
    const pathname = usePathname()

    return(
        <header>
            <nav className="flex justify-between">
                <div>
                    <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTodo</Link>
                </div>
                <div>
                    <Link className={`link ${pathname === '/' ? 'active' : ''} mr-5 p-3 border border-white rounded-full hover:bg-pink-600 hover:text-white`} href="/about">
                        About
                    </Link>
                    <Link className={`link ${pathname === '/' ? 'active' : ''} mr-5 p-3 border border-white rounded-full hover:bg-pink-600 hover:text-white`} href="/todo">
                        Todo
                    </Link>
                    <Link title="Login" href="/login" className="mr-5">
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}