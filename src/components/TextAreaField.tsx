import styled from "styled-components";
import React from "react";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const TextAreaField = ({ label, id, ...props }: TextAreaFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <TextArea id={id} {...props} />
    </div>
  );
};

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  display: block;
  padding: 16px 10px;
  resize: none;
  border: 1px solid #bbb;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
  height: 300px;
`;

export default TextAreaField;