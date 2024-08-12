// import { useSession, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import { signOut } from '../../../auth';

export function Header(){
    const {data: session, status} = useSession();


    return(
        <header className="w-full fixed top-0">
        <nav className="w-full flex items-center justify-between flex-wrap bg-[#0d6efd] p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <a href="/" className="font-semibold text-xl tracking-tight">
              Naopeke App
            </a>
          </div>
  
          <div className="hidden lg:flex lg:items-center lg:w-auto md:hidden">
            <div className="text-sm lg:flex-grow">
              {session ? (
                <>
                  <a href="/books" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Libros
                  </a>
  
                  <a href="/add-book" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Añadir Libro
                  </a>
  
                  <a href="/edit-book" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Editar Libro
                  </a>
  
                  <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Perfil
                  </a>
  
                  <a href="/login" 
                     onClick={(e)=> {
                        e.preventDefault();
                        signOut();
                     }} 
                     className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mx-6">
                    Register
                  </a>
                  <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-600 hover:bg-white mt-4 lg:mt-0">
                    Log In
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

    )
}