'use client'; 
import { useState } from 'react';
import { FormEvent } from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/actions';
import {ExclamationCircleIcon,} from '@heroicons/react/24/outline';


export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const FormSchema = z.object({
    username: z.string().min(2, {message:'Username must be as leeast 2 characters.'}),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, {message:'Password must be at least 6 characters.'})
  });


  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const username = formData.get('username') as string;
  //   const email = formData.get('email') as string;
  //   const password = formData.get('password') as string;

  //   const response = await fetch('/api/auth/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, email, password }),
  //   });

  //   if (response.ok) {
  //     console.log('Registration successful');
  //   } else {
  //     console.log('Registration failed');
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationCheck = FormSchema.safeParse({username, email, password});
    console.log(validationCheck); 
    if(!validationCheck.success){
      setError(validationCheck.error.errors.map(e => e.message).join(','));
      return;
    }


    try {
      const formData = new FormData(e.currentTarget);
      formData.append('username',username);
      formData.append('email',email);
      formData.append('password', password);

      const user = await registerUser(formData);
      console.log('User data', user)
      router.push('/login');
    } catch(err){
      console.error('Error logging in', err);
      setError('Does not match with the database');
    }
  }


  return (
    <div className="bg-gray-50">
      <div className="border-4 border-pink-600 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 rounded-xl">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:space-y-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                  Username:
                  <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                      Email:
                      <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                      Password:
                      <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                  </label>
              <button 
                type="submit"
                className="bg-pink-600 text-white hover:bg-white hover:text-pink-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";


// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   password: z.string().min(6, {
//     message: "Password must be at least 6 characters.",
//   }),
// });

// type FormData = z.infer<typeof FormSchema>;

// export default function FormPage() {
//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     console.log("Submitting form", data);

//     const { username: email, password } = data;

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       // Process response here
//       console.log("Registration Successful", response);
//     } catch (error: any) {
//       console.error("Registration Failed:", error);
//     }
//   };

//   return (
//     <Form {...form} className="w-2/3 space-y-6">
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="Username" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Password" {...field} type="password" />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }