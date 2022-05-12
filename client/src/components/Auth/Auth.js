import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { signup, signin, googlesignin } from '../../actions/auth';

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (values) => {
    const form = signin ? { ...values }
      : {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
      };

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch(googlesignin({ result, token }, history));
  };

  const googleError = () => 'Google Sign In was unsuccessful. Try again later';

  const renderSignUp = () => (
    <>
      <Col span={24}>
        <Form.Item
          name="firstName"
          label="First Name"
        >
          <Input placeholder="Имя" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="lastName"
          label="Last Name"
        >
          <Input placeholder="Фамилия" />
        </Form.Item>
      </Col>
    </>
  );

  return (
    <Row>
      <Col offset={8} span={8}>
        <Card title={isSignup ? 'Sign up' : 'Sign in'}>
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={handleSubmit}
          >
            <Row gutter={[16, 16]}>
              { isSignup && renderSignUp()}
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email Address"
                >
                  <Input placeholder="Email Address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                >
                  <Input.Password placeholder="input password" />
                </Form.Item>
              </Col>
              { isSignup && (
                <Col span={24}>
                  <Form.Item
                    name="confirmPassword"
                    label="Repeat Password"
                  >
                    <Input.Password placeholder="Repeat password" />
                  </Form.Item>
                </Col>
              )}
              <Col>
                <Button htmlType="submit">{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
              </Col>
              <Col>
                <GoogleLogin
                  clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
              </Col>
              <Col>
                <Button onClick={switchMode}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
