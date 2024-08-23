import React, { useState } from 'react';
import './Forget.css'; 
import Lottie from 'lottie-react';
import ForgetAni from '../../public/Animation/ani-forget.json';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import BarLoader from "react-spinners/BarLoader";

const Forget = () => {
    const [email, setEmail]                 = useState('');
    const [emailError, setEmailError]       = useState('');
    const navigate                          = useNavigate();
    const auth                              = getAuth();
    const [loading, setLoading]             = useState(false);

    const handelEmail = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('Enter your email');
        } else {
            setLoading(true);
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setLoading(false);


                    // toast kaz kore na aitar jonno tai .2s secend er dealy disi 
                    setTimeout(() => {
                      navigate('/');
                  }, 2000);

                    toast('Verification Link Sent', {
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
                })
                .catch((error) => {
                    setLoading(false);
                    setEmailError('Failed to send email');
                });
        }
    };

    return (
      <>
      
        <div className="forget-page">
            <div className="container">
                <div className="main">
                    <div className='main-ani'>
                        <Lottie animationData={ForgetAni} />
                    </div>
                    <div className="main-form">
                        <h1>Reset Password</h1>
                        <form onSubmit={handelSubmit} className='form'>
                            <div className='h-[80px] mb-1'>
                                <label>Email</label>
                                <input onChange={handelEmail} className='input focus:outline-none focus:shadow-outline' type="email" placeholder='Email' />
                                <p className='error text-xs italic text-red-600 mt-1'>{emailError}</p>
                            </div>
                            {loading ? (
                                <div className='w-full h-[40px] flex justify-center items-center px-4 py-2 font-bold text-white bg-[#970430] rounded-full focus:outline-none focus:shadow-outline'>
                                    <BarLoader color='#fff' />
                                </div>
                            ) : (
                                <button type='submit' className='w-full px-4 py-2 font-bold text-white bg-[#970430] rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline'>
                                    Reset Password
                                </button>
                            )}
                            <hr className='my-6' />
                            <div className="from-text flex flex-col gap-1 items-center">
                                <Link to='/' className="text-[12px] text-white align-baseline">Already have an Account! <span className='hover:text-[#970430]'>Login</span></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    );
};

export default Forget;
