'use client'; 
import { useState } from 'react';
import { FormEvent } from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation'

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const FormSchema = z.object({
    username: z.string().min(2, {message:'Username must be as leeast 2 characters.'}),
    password: z.string().min(6, {message:'Password must be at least 6 characters.'})
  });


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log('Registration successful');
    } else {
      console.log('Registration failed');
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
            Username:
            <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
            Password:
            <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit">Register</button>
        </form>
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