import React from 'react'
import { Button, Col } from 'antd'
import { useStore } from '../../store/useStore';
import cryptoRandomString from "crypto-random-string";
import { useRouter } from "next/router";


const Login: React.FC = (): JSX.Element => {

    const randomString = cryptoRandomString({ length: 20 });
    const router = useRouter()
    const token = useStore(state => state.token);

    if (token) {
        router.push('/jokes/list');
    }

    const setToken = useStore(state => state.setToken)
    const handleLogin = () => {
        setToken(randomString);
        router.push('/jokes/list');
    };

    return (
        <Col offset={8} span={6} >
            <div className='login-page'>
                <Button block size='large' type="primary" onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </Col>

    );
}

export default Login;