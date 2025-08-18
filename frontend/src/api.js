 import axios from 'axios';

 const API_URL = 'http://localhost:8080/auth';

 export const googleauth = (code) => 
    axios.get(`${API_URL}/google?code=${code}`);

