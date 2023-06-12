import axios from 'axios';


const usersUrl = 'http://localhost:8005';

export const getUsers = async () => {
    
    return await axios.get(`${usersUrl}`);
}

export const addUser = async (account) => {
    console.log(account)
    return await axios.post(`${usersUrl}/create`, account);
}

