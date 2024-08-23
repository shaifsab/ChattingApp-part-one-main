import { useState } from 'react'; 
import './Register.css'; 
import Lottie from 'lottie-react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { IoMdEye, IoIosEyeOff } from "react-icons/io"; 
import 'react-toastify/dist/ReactToastify.css'; 
import loginAni from '../../public/Animation/logIn.json'; 
import { Bounce, toast, ToastContainer } from 'react-toastify'; 
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth"; 
import { CircleLoader } from 'react-spinners'; 

const Register = () => {
    // State variables 
    const [pass, setPass] = useState(false); 
    const [user, setUser] = useState(''); 
    const [userErr, setUserErr] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [emailErr, setEmailErr] = useState('');
    const [password, setPassword] = useState(''); 
    const [passErr, setPassErr] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [confirmPassErr, setConfirmPassErr] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    
    // Initialize Firebase authentication
    const auth = getAuth();

    // Function to toggle password visibility
    const handleShow = () => {
        setPass(!pass);
    };

    // Function to handle username input changes
    const handleUser = (e) => {
        setUser(e.target.value);
        setUserErr(''); 
    };

    // Function to handle email input changes
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('');
    };

    // Function to handle password input changes
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPassErr(''); 
    };

    // Function to handle password input changes
    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
      setConfirmPassErr(''); 
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate user, email, and password fields
        if(!user) {
            setUserErr('Please enter your user name');
        }
        if(!email) {
            setEmailErr('Please enter your email');
        }
        if(!password) {
            setPassErr('Please enter your password');
        } 
        if(!confirmPassword) {
          setConfirmPassErr('Please enter your password');
      } 
      else{
        if(password !== confirmPassword){
            toast.error('Use same Password', {
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
        }
        else{
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // update user profile 
                updateProfile(auth.currentUser, {
                    displayName: user
                  })

                // email verification 
                sendEmailVerification(auth.currentUser)

                setLoading(false)
                
                toast.success('Registration Successful', {
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

                    // navigate('/')
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                setLoading(false)

                if(errorCode === 'auth/weak-password'){
                    toast.error('Please Select Stronge password', {
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
                }
                if(errorCode === 'auth/email-already-in-use'){
                    toast.error('Email already used', {
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
                }
            }); 
        }

    }
}


    // JSX for rendering the registration page
    return (
        <>
         
        <div className='reset-page'>
            <div className="relative w-full h-screen overflow-hidden">

                {/* Main registration form container */}
                <div className="relative w-[1070px] h-[550px] z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-transparent shadow-[-10px_10px_19px_10px_rgba(0,0,0,0.38)]">
                    <div className='main flex gap-32 justify-center items-center'>

                        {/* Registration animation */}
                        <Lottie className='animation' animationData={loginAni} loop={true} />
                        <div className='w-[400px] h-[500px] bg-[#5a34f1] mt-7 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col items-center'>
                            <h1 className='login'>Sign Up</h1>
                            <form onSubmit={handleSubmit}>
                                {/* Username input field */}
                                <label htmlFor="user">User Name</label>
                                <br />
                                <input 
                                    onChange={handleUser} 
                                    type="user" 
                                    id='user' 
                                    name='user' 
                                    placeholder='Enter your User name' 
                                />
                                <p>{userErr}</p> {/* Display username error */}

                                {/* Email input field */}
                                <label htmlFor="email">Email</label>
                                <br />
                                <input 
                                    onChange={handleEmail} 
                                    type="email" 
                                    id='email' 
                                    name='email' 
                                    placeholder='Enter your email' 
                                />
                                <p>{emailErr}</p> {/* Display email error */}

                                {/* Password input field */}
                                <label htmlFor="password">Password</label>
                                <div className='relative'>
                                    <input 
                                        onChange={handlePassword} 
                                        type={pass ? "text" : "password"} 
                                        id='password' 
                                        name='password' 
                                        placeholder='Enter your Password' 
                                    />
                                    {/* Password visibility toggle */}
                                    {pass ? 
                                        <IoMdEye onClick={handleShow} className='icon' /> : 
                                        <IoIosEyeOff onClick={handleShow} className='icon' />
                                    }
                                </div>
                                <p>{passErr}</p> {/* Display password error */}

                                {/* Confirm Password  */}
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className='relative'>
                                    <input 
                                        onChange={handleConfirmPassword} 
                                        type={pass ? "text" : "password"} 
                                        id='confirmPassword' 
                                        name='confirmPassword' 
                                        placeholder='Enter your Password' 
                                    />
                                    {/* Password visibility toggle */}
                                    {pass ? 
                                        <IoMdEye onClick={handleShow} className='icon' /> : 
                                        <IoIosEyeOff onClick={handleShow} className='icon' />
                                    }
                                </div>
                                <p>{confirmPassErr}</p> {/* Display password error */}

                                {/* Loading spinner or sign-up button */}
                                {loading ?
                                    <div className='logBtn h-[44px] flex items-center justify-center'>
                                        <CircleLoader size="30px" color='#113C7A' />
                                    </div> :
                                    <button className='logBtn'>Sign Up</button>
                                }

                                {/* Link to sign-in page */}
                                <h4 className='pt-1'>Already have an account? 
                                    <Link className='text-[#E3FF43] text-md font-sans font-bold' to="/">Sign In</Link>
                                </h4>
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

export default Register;
