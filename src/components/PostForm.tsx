import React from "react";
import styled from "styled-components";
import TextField from "components/TextField";
import TextAreaField from "components/TextAreaField";

const PostForm = () => {
  return (
    <FormWrapper action="">
      <TextField label="제목" id="subject" />
      <TextField label="요약" id="shortsText" />
      <TextAreaField label="내용" id="content" />
      <Button type="button">
        제출하기
      </Button>
    </FormWrapper>
  );
};

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

export default PostForm;