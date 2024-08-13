'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import Image from "next/image";

export default function Header() {
    const pathname = usePathname()

    return(
        <header className="py-3">
            <nav className="flex justify-between">
                <div>
                    <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl ml-5">MoTo-Do</Link>
                </div>
                <div>
                    <Link className={`link ${pathname === '/' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                        About
                    </Link>
                    <Link className={`link ${pathname === '/' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/todo">
                        Todo
                    </Link>
                    <Link title="Login" href="/login" className="mr-5 ml-5 font-semibold">
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}