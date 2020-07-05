import axios from 'axios';

import { USER_SERVER } from '../components/utils/misc';
import { LOGIN_USER } from './types';
import Axios from 'axios';


export const loginUser = dataToSubmit => async dispatch => {
  try {
    const { data } = await Axios.post(`${USER_SERVER}/login`, dataToSubmit);
    // console.log(data);
    dispatch({
      type: LOGIN_USER,
      payload: data
    })
    return data
  } catch (error) {
    console.log(error);
  }
}