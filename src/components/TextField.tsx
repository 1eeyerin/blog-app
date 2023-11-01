import styled from "styled-components";
import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
}

const TextField = ({ label, id, type = "text", ...props }: TextFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} {...props} />
    </div>
  );
};


const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: block;
  padding: 16px 10px;
  resize: none;
  border: 1px solid #bbb;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
`;

export default TextField;