import { configureStore, Middleware, PayloadAction } from '@reduxjs/toolkit';
import usersReducer, { rollbackUser, UserId, UserWithId } from './users/slice';
import { toast } from 'sonner';

const persistanceLocalStorageMiddleware: Middleware =
  store => next => action => {
    next(action);
    localStorage.setItem('redux_state', JSON.stringify(store.getState()));
  };

const syncWithDatabase: Middleware = store => next => action => {
  const { type, payload } = action as PayloadAction<UserId | UserWithId>;
  const previousState: RootState = store.getState();

  next(action);

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload;
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove);

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          // return toast.success('Usuario eliminado correctamente');
        }
        throw new Error('Error al eliminar el usuario');
      })
      .catch(err => {
        if (userToRemove) {
          store.dispatch(rollbackUser(userToRemove));
        }
        console.log(err);
        toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
      });
  }
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware,
      syncWithDatabase
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
