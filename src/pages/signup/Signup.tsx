import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "components/Wrapper";
import TextField from "components/TextField";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공했습니다.");
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
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
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <Wrapper>
      <PageTitle>회원가입</PageTitle>
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
          type="password"
          onChange={onChange}
        />
        <TextField
          label="비밀번호 확인"
          id="password_confirm"
          name="password_confirm"
          type="password"
          onChange={onChange}
        />
        {error && error?.length > 0 && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        <Button type="submit">
          회원가입
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

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

export default Signup;