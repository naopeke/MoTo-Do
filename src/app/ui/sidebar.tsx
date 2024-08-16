import Link from "next/link";
import { useEffect, useState } from "react"; //occur error if you use localStrage only
import { usePathname, useRouter } from 'next/navigation';


type SidebarProps = {
    toggleMenu: () => void;
}

export default function Sidebar (props: SidebarProps){
    const {toggleMenu} = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();


    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(user !== null);
    }, []); 

    const handleLogout = async () => {
        localStorage.removeItem('user');
        router.push('/')
    };

    return (
        <div className="transition-opacity duration-500 absolute left-0 top-0 flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh-1rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="absolute top-5 right-7 cursor-pointer">
                <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Menú</h5>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                {isLoggedIn ? (
                <>
                    <Link className={`link ${pathname === '/about' ? 'active' : ''} flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none`} href="/about">
                        About
                    </Link>
                    <Link className={`link ${pathname === '/todo' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/todo">
                        Todo
                    </Link>
                    <Link className={`link ${pathname === '/route' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/route">
                        My Route
                    </Link>
                    <button onClick={handleLogout} className="link px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white">
                        Logout
                    </button>
                </>
                ) : (
                <>
                    <Link className={`link ${pathname === '/about' ? 'active' : ''} px-10 py-4 border font-semibold border-white hover:bg-pink-600 hover:text-white`} href="/about">
                        About
                    </Link>
                    <Link title="Login" href="/login" className="mr-5 ml-5 font-semibold">
                        Login
                    </Link>
                </>
                )}
            </nav>
        </div>
    );
}
