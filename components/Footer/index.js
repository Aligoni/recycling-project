import { useState } from 'react';
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import axios from 'axios';
import { server } from '../../constants/server';
import { CircularProgress } from '@mui/material';

import styles from "./Footer.module.scss"

export default function Footer () {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState("");

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");

    const handleFirst = e => setFirst(e.target.value);
    const handleLast = e => setLast(e.target.value);
    const handleEmail = e => setEmail(e.target.value);

    const subscribe = async () => {
        setError(false);
        setSuccess(false);
        setText("");
        setLoading(true);
    
        if (!first || !last || !email) {
          setError(true);
          setText("Please fill all fields");
          setLoading(false);
          return;
        }
    
        const body = {
          firstname: first,
          lastname: last,
          email,
        }
    
        try {
          const sub = await axios.post(`${server}/subscribers`, body);
          console.log(sub.data);
    
          if (sub.status == 200) {
            setSuccess(true);
            setText("Subscription Succesful");
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setText("Email already subscribed");
          setLoading(false);
        }
    }

    return (
        <footer className={styles.footer}>
            <div className="flex justify-evenly pt-8" style={{ backgroundColor: "rgb(19, 19, 19)" }}>
                <img className="m-10 w-28 h-32" src="/logo.png" alt="" />
                <div className={styles['input-cont']} style={{ width: '30%' }}>
                    {
                        (error || success) && (
                        <div className={`${error ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'} px-4 py-2 text-center block`} >
                            {text}
                        </div>
                        )
                    }
                    <p className='text-white'>Subscribe Now!</p>
                    <input type='text' placeholder='First Name' value={first} onChange={handleFirst} />
                    <input type='text' placeholder='Last Name' value={last} onChange={handleLast} />
                    <input type='text' placeholder='Email' value={email} onChange={handleEmail} />
                    <div>
                    <button onClick={subscribe}>
                        {
                        loading ? <CircularProgress className='text-white' /> : 'Subscribe'
                        }
                    </button>
                    </div>
                </div>
                <div className="m-10" style={{ width: '30%' }}>
                    <p className="text-2xl text-gray-200 text-center">Where you can find us</p>
                    <div className="flex items-center justify-center my-8">
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaFacebookF />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaGoogle />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaTwitter />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: 30, className: 'mx-4 text-white transition cursor-pointer hover:text-blue-700' }}>
                            <FaInstagram />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
            <div className="bg-gray-600 text-gray-200 p-2 text-center text-lg">© 2022 Recycle-tronics. All rights reserved.</div>
        </footer>
    )
}