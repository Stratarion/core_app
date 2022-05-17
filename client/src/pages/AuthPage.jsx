import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { signup, signin, googlesignin } from 'actions/auth';
import { MainLib } from 'lib';

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

  const googleError = () => MainLib.auth.googleError;

  const renderSignUp = () => (
    <>
      <Col span={24}>
        <Form.Item
          name="firstName"
          label={MainLib.person.firstName}
        >
          <Input placeholder={MainLib.person.firstName} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="lastName"
          label={MainLib.person.lastName}
        >
          <Input placeholder={MainLib.person.lastName} />
        </Form.Item>
      </Col>
    </>
  );

  return (
    <Row>
      <Col offset={8} span={8}>
        <Card title={isSignup ? MainLib.auth.signUp : MainLib.auth.signIn}>
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
                  label={MainLib.person.email}
                >
                  <Input placeholder={MainLib.person.emailPlaceholder} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label={MainLib.auth.password}
                >
                  <Input.Password placeholder={MainLib.auth.passwordPlaceholder} />
                </Form.Item>
              </Col>
              { isSignup && (
                <Col span={24}>
                  <Form.Item
                    name="confirmPassword"
                    label={MainLib.auth.confirmPassword}
                  >
                    <Input.Password placeholder={MainLib.auth.confirmPasswordPlaceholder} />
                  </Form.Item>
                </Col>
              )}
              <Col>
                <Button htmlType="submit">{ isSignup ? MainLib.auth.signUp : MainLib.auth.signin }</Button>
              </Col>
              <Col>
                <GoogleLogin
                  clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      {MainLib.buttons.googleSignIn}
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
              </Col>
              <Col>
                <Button onClick={switchMode}>
                  { isSignup ? MainLib.auth.signUpText : MainLib.auth.signInText }
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
