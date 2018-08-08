import axios from 'axios';

export const FETCH_USER = 'fetch_users';
export const CREATE_USER = 'create_user';
export const DELETE_USER = 'delete_user';
export const UPDATE_USER = 'update_user';

//MOCK Api 
const ROOT_URL = 'https://5b65f22e9daa3f0014cb8e77.mockapi.io';
const USER = 'user';

export function fetchUser() {
    const request = axios.get(`${ROOT_URL}/${USER}`);
    return {
        type: FETCH_USER,
        payload: request
    };
}


export function createUser(values, callback) {
    const request = axios.post(`${ROOT_URL}/${USER}`, values)
        .then(() => callback());

    return {
        type: CREATE_USER,
        payload: request
    };
}


export function updateUserImage(values) {
    const request = axios.put(`${ROOT_URL}/${USER}/1`, value)
        .then(res => {
            console.log(res);
        });
        
    return {
        type: UPDATE_USER,
        payload: request
    };
}

