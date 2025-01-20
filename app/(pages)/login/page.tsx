import React from "react";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm />
        </div>
    )
}
// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         const signInResponse = await signIn("credentials", {
//             redirect: false,
//             username: username,
//             password: password,
//             callbackUrl: "/"
//         });
//         if (signInResponse?.ok) {
//             router.push(signInResponse.url || "/");
//         }
//         if (signInResponse?.error) {
//             setError(signInResponse?.error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <Card
//                 className="shadow-lg w-full max-w-md"
//                 sx={{
//                     borderRadius: "12px",
//                 }}
//             >
//                 <CardContent>
//                     <Typography variant="h5" className="text-center mb-4">
//                         Login
//                     </Typography>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <TextField
//                             label="Username"
//                             variant="outlined"
//                             fullWidth
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <TextField
//                             label="Password"
//                             type="password"
//                             variant="outlined"
//                             fullWidth
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             className="mt-2"
//                         >
//                             Login
//                         </Button>
//                         {error && (
//                             <Typography
//                                 color="error"
//                                 variant="body2"
//                                 className="text-center mt-2"
//                             >
//                                 {error}
//                             </Typography>
//                         )}
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default LoginPage;