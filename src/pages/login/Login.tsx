import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import TextField from "components/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      return;
    }

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인에 성공했습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    if (name === "email") {
      setEmail(value);

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  return (
    <Wrapper>
      <PageTitle>로그인</PageTitle>
      <FormWrapper onSubmit={onSubmit}>
        <TextField
          label="이메일"
          id="email"
          name="email"
          type="email"
          onChange={onChange}
        />
        <TextField
          label="비밀번호"
          id="password"
          name="password"
          type="password" onChange={onChange}
        />
        <LinkButton to="/signup">계정이 없으신가요?</LinkButton>
        <Button type="submit">
          로그인
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

const PageTitle = styled.h1`
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 25px;
  text-align: center;
`;

const Button = styled.button`
  background: #5b7dbd;
  color: #ffffff;
  padding: 10px 30px;
  border-radius: 2px;
  border: 0;
  width: 100%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LinkButton = styled(Link)`
  text-decoration: underline;
`;

export default Login;