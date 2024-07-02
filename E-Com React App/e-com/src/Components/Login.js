import { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [failedLogin, setFailedLogin] = useState("");
    const history = useHistory();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };
        setIsPending(true);
        setFailedLogin("");

        try {
            const result = await fetch(`${process.env.REACT_APP_URL}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Application": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (!result.ok) throw Error("Login Error");
            const data = await result.json();
            setIsPending(false);
            if (data.token) {
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (30 * 30 * 1000));
                document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/;`;
                document.cookie = `username=${user.username}; expires=${expirationDate.toUTCString()}; path=/;`;
                login(user.username);
                history.push('/');
            }
        } catch (err) {
            console.log(err);
            if (err.message === "Login Error") {
                setFailedLogin("Login failed! Please recheck the username and password and try again")
            }
            setIsPending(false);
        }
    }

    return ( 
        <div className="login mt-20 mx-auto px-5 pt-8 pb-16 max-w-xs items-center bg-[#a1a1a1] rounded-lg">
            <h2 className="my-6 text-white">LogIn</h2>
            {failedLogin && (
                <div className="failed bg-[#ffdddd] text-[#f53a3a]">
                    <p className="p-[9px] rounded-[3px] mb-3">{failedLogin}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label className="login-signup-label">Username</label>
                <input 
                    type="text"
                    placeholder="Enter your username..."
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="login-signup-input mb-[28px]"
                />
                <div className="flex flex-col">
                    <label className="login-signup-label">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password..."
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="login-signup-input"
                    />
                    <Link className="mr-auto ml-2 mt-1 text-white font-semibold">Forgot Password?</Link>
                </div>
                {!isPending && <button onSubmit={handleSubmit} className="block mt-3 mx-auto text-white rounded-2xl text-[20px] bg-black font-semibold w-[80%] cursor-pointer">LogIn</button>}
                {isPending && <button className="block mt-3 mx-auto text-white rounded-2xl text-[20px] bg-black font-semibold w-[80%] cursor-pointer">Logging in...</button>}
                <p className="mt-2 mb-1 text-white">Dont have an account?</p>
                <Link to="/signup" className="text-white font-semibold">Create an account</Link>
            </form>
        </div>
     );
}
 
export default Login;