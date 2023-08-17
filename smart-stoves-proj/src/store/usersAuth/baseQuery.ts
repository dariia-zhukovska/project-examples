import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/api';



export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            headers.set('Access-Token', userData.accessToken);
            headers.set('Client', userData.client);
            headers.set('Uid', userData.uid);
        }
        return headers;
    },
    // credentials: "include"
})

