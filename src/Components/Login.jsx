// Importing necessary libraries and styles
import React from 'react'; 
import './Login.css'; 
import { useState } from 'react'; 
import Lottie from 'lottie-react'; 
import { Link } from 'react-router-dom'; 
import { IoMdEye, IoIosEyeOff } from "react-icons/io"; 
import 'react-toastify/dist/ReactToastify.css'; 
import loginAni from '../../public/Animation/logIn.json';
import { Bounce, toast, ToastContainer } from 'react-toastify'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 

// Login component definition
const Login = () => {
    // State variables for managing form data and errors
    const [pass, setPass] = useState(false); // State for toggling password visibility
    const [email, setEmail] = useState(''); // State for storing the email input
    const [emailerr, setEmailerr] = useState(''); // State for storing email error messages
    const [password, setPassword] = useState(''); // State for storing the password input
    const [passerr, setPasserr] = useState(''); // State for storing password error messages

    // Initialize Firebase authentication
    const auth = getAuth();

    // Function to toggle password visibility
    const handleShow = () => {
        setPass(!pass);
    };

    // Function to handle email input changes
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailerr(''); // Clear email error when user starts typing
    };

    // Function to handle password input changes
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasserr(''); // Clear password error when user starts typing
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate email and password fields
        if (!email) {
            setEmailerr('Please enter your email');
        }
        if (!password) {
            setPasserr('Please enter your password');
        } 
        else {
            // Sign in the user with Firebase authentication
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successful sign-in
                    const user = userCredential.user;
                    toast('Login successful!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                })
                .catch((error) => {
                    // Handle sign-in errors
                    toast(error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                });
        }
    };

    // JSX for rendering the login page
    return (
        <>
       
            <div className='login-page'>
                <div className="relative w-full h-screen overflow-hidden">
                    <div className="relative w-[1070px] h-[550px] z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-transparent shadow-[-10px_10px_19px_10px_rgba(0,0,0,0.38)]">
                        <div className='main'>

                            {/* Login animation */}
                            <Lottie className='animation' animationData={loginAni} loop={true} /> 


                            <div className='w-[400px] h-[500px] bg-[#5a34f1] mt-7 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col items-center'>
                                <h1 className='login'>Login</h1>

                                <form onSubmit={handleSubmit}>

                                    {/* Email input field */}
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input onChange={handleEmail} type="email" id='email' name='email' placeholder='Enter your email' />
                                    <p>{emailerr}</p> 

                                    {/* Password input field */}
                                    <label htmlFor="pass">Password</label>
                                    <div className='relative'>
                                        <input onChange={handlePassword} type={pass ? "text" : "password"} id='pass' name='pass' placeholder='Enter your Password' />
                                        {/* Password visibility toggle */}
                                        {
                                            pass ?
                                                <IoMdEye onClick={handleShow} className='icon' />
                                                :
                                                <IoIosEyeOff onClick={handleShow} className='icon' />
                                        }
                                    </div>
                                    <p>{passerr}</p>
                                    
                                    {/* Additional form options */}
                                    <div className='text flex items-center gap-10'>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" />
                                            <p>Remember me</p>
                                        </div>
                                        <Link to="/forget">Forgot Password?</Link>
                                    </div>
                                    
                                    {/* Submit button */}
                                    <button className='logBtn'>Log In</button>
                                    
                                    {/* Link to the registration page */}
                                    <h4 className='pt-1'>Don't have an account? <Link className='text-[#E3FF43] text-md font-sans font-bold' to="/register">Sign Up</Link></h4>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
