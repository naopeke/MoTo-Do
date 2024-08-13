import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    return(
        <header>
            <nav>
                <Link title="App Title" href="/">Naopeke Todo</Link>
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/todo">
                    About
                </Link>
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/todo">
                    Todo
                </Link>
            </nav>
        </header>
    )
}