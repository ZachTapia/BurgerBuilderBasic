import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-my-burger-52ff4.firebaseio.com/'
});

export default instance;