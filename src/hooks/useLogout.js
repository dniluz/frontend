import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    // eslint-disable-next-line
    const logout = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        //add barer token to header
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        }
        await axios.post(process.env.REACT_APP_API_URL + 'user/logout', {token: currentUser.refreshToken}, config);
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('user');
    };

    return { logout };
}