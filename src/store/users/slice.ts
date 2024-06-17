import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserId = string;

export interface User {
  id: string;
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    github: 'johndoe',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    github: 'janedoe',
  },
  {
    id: '3',
    name: 'Alice Smith',
    email: 'alicesmith@gmail.com',
    github: 'alicesmith',
  },
  {
    id: '4',
    name: 'Bob Johnson',
    email: 'bobjohnson@gmail.com',
    github: 'bobjohnson',
  },
  {
    id: '5',
    name: 'Eva Johnson',
    email: 'evajohnson@gmail.com',
    github: 'evajohnson',
  },
  {
    id: '6',
    name: 'Michael Smith',
    email: 'michaelsmith@gmail.com',
    github: 'michaelsmith',
  },
];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter(user => user.id !== id);
    },
  },
});

export default usersSlice.reducer;
