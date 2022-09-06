import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { alertAction } from './alertSlice';

const setAlert =
  (msg, alertType) =>
  (dispatch = useDispatch()) => {
    const id = uuidv4();
    dispatch(alertAction.addAlert({ msg, alertType, id }));
    setTimeout(() => dispatch(alertAction.removeAlert(id)), 3000);
  };

export default setAlert;
