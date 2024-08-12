interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
}

export function Button({ children, className, ...rest}: ButtonProps){
    return (
        <button></button>
    )
}