import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_STATE = [
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

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('redux_state');
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      state.push({ ...action.payload, id });

      // return [
      //   ...state,
      //   { ...action.payload, id },
      // ];
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter(user => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        user => user.id === action.payload.id
      );
      if (!isUserAlreadyDefined) {
        state.push(action.payload);
        // return [...state, action.payload];
      }
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
