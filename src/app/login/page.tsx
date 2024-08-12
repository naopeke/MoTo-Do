import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
// import { authenticate } from '@/app/lib/actions'
// import { useFormState, useFormStatus } from 'react-dom'
// import LoginForm from '../ui/login-form'
 
// export default function Page() {
//   const [errorMessage, dispatch] = useFormState(authenticate, undefined)
 
//   return (
//     <>
//     <form action={dispatch}>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <div>{errorMessage && <p>{errorMessage}</p>}</div>
//       <LoginButton />
//     </form>
//     </>
//   )
// }
 
// function LoginButton() {
//   const { pending } = useFormStatus()
 
//   const handleClick = (event:any) => {
//     if (pending) {
//       event.preventDefault()
//     }
//   }
 
//   return (
//     <button aria-disabled={pending} type="submit" onClick={handleClick}>
//       Login
//     </button>
//   )
// }