

import { toast } from 'sonner';
import { z } from "zod";
import { useState } from 'react';
import { Eye, EyeOff, Brain } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Input } from '../components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../components/ui/form";
import { useForm } from "react-hook-form";
/*how to use toast library, first write toast and then write 
Toaster in the App.tsx  */
// export default function Success() {
//   return (
//     <Button
//       className="toast-button"
//       onClick={() => {
//         toast.success('This is a success toast');
//       }}
//     >
//       Render toast
//     </Button>
//   );
// }

// use zod for schema parsing, 
const formSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters long")
      .regex(/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers, and underscores (no spaces or other special characters)"),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    repeatPassword: z.string().min(8, "Repeat Password must be at least 8 characters long"),
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
});


const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
        repeatPassword: "",
      },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
            username: data.username,
            password: data.password,
          });
    
          if (response.data.userId) {
            toast.success('Account created successfully! Redirecting to login...');
            setTimeout(() => {
              navigate('/signin');
            }, 1500);
          }
        } catch (error) {
          console.error('Signup error:', error);
          const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to sign up'
            : 'Failed to sign up. Please try again.';
          toast.error(errorMessage, {
            description: 'Please check your credentials and try again'
          });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] via-[hsl(var(--hero-gradient-via))] to-[hsl(var(--hero-gradient-to))]">
          <ThemeToggle />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse dark:from-purple-600/20 dark:to-pink-600/20"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-600/20 dark:to-cyan-600/20"></div>
          </div>
    
          <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
            <div className="w-full max-w-md">
              {/* Logo and title */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Join BrainVault</h1>
                <p className="text-muted-foreground">Create your digital brain and start organizing your knowledge</p>
              </div>
    
              {/* Signup form */}
              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Username</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Choose a username"
                              className="bg-background/50 border-border"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="bg-background/50 border-border"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="bg-background/50 border-border pr-10"
                                disabled={isLoading}
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
    
                    <FormField
                      control={form.control}
                      name="repeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="bg-background/50 border-border"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
    
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/signin')}
                      className="text-purple-600 hover:text-purple-700 font-medium underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
    
              {/* Back to home */}
              <div className="text-center mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-foreground 
                  transition-colors"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default Signup;
    
