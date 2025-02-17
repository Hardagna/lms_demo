import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../main';
import toast, { Toaster } from 'react-hot-toast';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loginUser ( email, password, navigate ) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/users/user/login`,{ email, password });

            toast.success(data.message);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            setIsAuth(false);
            toast.error(error.response.data.message);
            // console.error(error);
        }
    }

    async function fetchUser () {
        try {
            const { data } = await axios.get(`${server}/api/users/user/me`, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            });
            setUser(data);
            setIsAuth(true);
            setLoading(false);
        }
        catch (error) {
            // setIsAuth(false);
            setLoading(false);
            console.error(error);
        }
    };
    

    useEffect(() => {
        fetchUser();
    }, []);

    return ( 
    <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading, loading }}>
        {children}
        <Toaster />
    </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);