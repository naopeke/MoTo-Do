'use client';

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react"; //occur error if you use localStrage only

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    useEffect(()=> {
        const checkLogin = () => {
            const user = localStorage.getItem('user');
            setIsLoggedIn(user !== null);
        };
        checkLogin();

        // needs to check about the status again
        window.addEventListener('storage', checkLogin);
        return () => {
            window.removeEventListener('storage', checkLogin);
        };
    },[]);

    const handleLogout = async () => {
        localStorage.removeItem('user');
        router.push('/')
        setIsLoggedIn(false);
    };

    const toggleMenu = () =>{
        setIsOpenMenu(prevState => !prevState);
    }


    return(
            <header className={` ${isOpenMenu ? 'bg-white h-48 py-2' : 'h-15'} transition-all duration-300`}>
               <nav className="flex justify-between items-center">
                <div>
                    <Link title="App Title" href="/" className="text-pink-600 font-extrabold text-xl px-10 py-4">MoTo-Do</Link>
                </div>            
                    <div className="block lg:hidden">
                        {!isOpenMenu ? (
                        <button onClick={toggleMenu} className="flex items-center px-10 py-4 border-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        </button>
                        ):(
                            <button onClick={toggleMenu} className="px-10 py-4 absolute top-2 right-2 lg:hidden transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        )}
                    </div>

                    <div
                    className={`${isOpenMenu ? 'flex flex-col items-center absolute inset-x-0 top-20 bg-white py-4 z-10' : 'hidden lg:flex'}`}>         
                    {isLoggedIn ? (
                        <>
                            <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white transition-all duration-300`} href="/about">
                                About
                            </Link>
                            <Link className={`link ${pathname === '/todo' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white transition-all duration-300`} href="/todo">
                                Todo
                            </Link>
                            <button title="Login" onClick={handleLogout} className="px-10 py-4 font-semibold hover:text-pink-600 transition-all duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white transition-all duration-300`} href="/about">
                                About
                            </Link>
                            <Link title="Login" href="/login" className="px-10 py-4 font-semibold hover:text-pink-600 transition-all duration-300">
                                Login
                            </Link>
                        </>
                    )
                    }
                   </div> 
            </nav>
        </header>
    )
}