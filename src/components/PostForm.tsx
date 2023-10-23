import React from 'react';
import styled, { css } from 'styled-components';

const PostForm = () => {
  return (
    <FormWrapper action=''>
      <FormInput label='제목' id='subject' />
      <FormInput label='요약' id='shortsText' />
      <FormTextarea label='내용' id='content' />
      <Button type='button'>
        제출
      </Button>
    </FormWrapper>
  );
};

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
}

const FormInput = ({ label, id, type = 'text' }: FormInputProps) => {
  return (
    <div>
      <LabelComponent htmlFor={id}>{label}</LabelComponent>
      <InputComponent type={type} id={id} />
    </div>
  );
};

interface FormTextareaProps {
  label: string;
  id: string;
}

const FormTextarea = ({ label, id }: FormTextareaProps) => {
  return (
    <div>
      <LabelComponent htmlFor={id}>{label}</LabelComponent>
      <TextareaComponent id={id} />
    </div>
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

const LabelComponent = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const inputStyle = css`
  display: block;
  padding: 16px 10px;
  resize: none;
  border: 1px solid #bbb;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
`;

const InputComponent = styled.input`
  ${inputStyle};
`;


const TextareaComponent = styled.textarea`
  ${inputStyle};
  height: 300px;
`;

export default PostForm;