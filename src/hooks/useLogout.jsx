import { useAuthContext } from './useAuthContext.jsx';

const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        //remove user from loaclStorage
        localStorage.removeItem('userPort');

        //dispatch logout action
        dispatch({type: 'logout'});
    }
    return logout;
}

export default useLogout;