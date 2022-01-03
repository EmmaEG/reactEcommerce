import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: pink;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  border-radius: 15px;
  background-color: white;
  ${mobile({ width: "80%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 14px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault(); // this prevent refresh the page
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            LOGIN
          </Button>
          <Link
            to={"/register"}
            style={{ color: "black", textDecoration: "none" }}
          >
            DON'T REMEMBER THE PASSWORD?
          </Link>
          <Link
            to={"/register"}
            style={{ color: "black", textDecoration: "none" }}
          >
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
