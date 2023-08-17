import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { FieldValues } from 'react-hook-form';


//   accessToken: string;
// };

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<void, FieldValues>({
      query: (userData) => ({
        url: 'auth/sign_in',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (_, meta) => {
        const accessToken = meta?.response?.headers.get('Access-Token');
        const client = meta?.response?.headers.get('Client')
        const uid = meta?.response?.headers.get('Uid')

        localStorage.setItem('userData', JSON.stringify({ accessToken, client, uid }))
      }
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/sign_out',
        method: 'DELETE',
      }),
    }),
    passwordRecovery: builder.mutation<void, { email: string }>({
      query: (email) => ({
        url: '/auth/password',
        method: 'POST',
        body: {
          email, redirect_url: ******************* ' },
        })
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, usePasswordRecoveryMutation } = usersApi;
