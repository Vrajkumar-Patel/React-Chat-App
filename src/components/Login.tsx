import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa';
import { styled } from '@material-ui/core/styles'
import firebase from 'firebase';
import { auth } from '../fire';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from "../redux/store";
import { setUser } from "../redux/UserReducer";


const LoginButton = styled(Button)({
    background: 'linear-gradient(45deg, #4a90e2 , rgb(74,144,226, 0.4))',
    color: "white",
    // textTransform: "capitalize",
    letterSpacing: "2px",
    fontSize: "15px",
    padding: '15px 20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center'
});

const Login = () => {

    const history = useHistory();
    const { user } = useSelector((state: StateType) => state.user);
    const dispatch = useDispatch();
    console.log(user);

    useEffect(() => {
        if (user) {
            return history.push('/chats')
        }
    }, [user])
    

    const handleLogin = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider

        auth.signInWithPopup(googleProvider)
            .then((result) => {
                dispatch(setUser(result.user))
                localStorage.setItem('user', JSON.stringify(result.user))
            })
        .catch((err) => alert(err))
    }

  return (
    <div className="login">
      <LoginButton onClick={handleLogin}>
              <FaGoogle style={{ marginRight: '10px', fontSize: '20px' }} />
              <>Signin With Google</>
        
      </LoginButton>
    </div>
  );
};

export default Login;
