import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

  const handleAddUser = ({name, email, github}: User) => {
    dispatch(addNewUser({name, email, github}));
  
  }

    const handleRemoveUser = (id: UserId) => {
      dispatch(deleteUserById(id));
    };
    
    return {
      handleAddUser,
      handleRemoveUser,
    };}