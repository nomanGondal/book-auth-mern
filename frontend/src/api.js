 import axios from 'axios';

 const API_URL = 'https://book-auth-mern.onrender.com/auth';

 export const googleauth = (code) => 
    axios.get(`${API_URL}/google?code=${code}`);

