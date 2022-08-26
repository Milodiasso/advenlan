import { useState, useEffect } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return tokenString
    };

    const [token, setToken] = useState(getToken());


    return {
        setToken,
        token
    }
}