import React from "react";
import styled from "styled-components";

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  categories: string[];
  type?: React.HTMLInputTypeAttribute;
}


const SelectField = ({ id, label, categories, ...props }: SelectFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        {...props}
      >
        <option value="">카테고리를 선택해주세요</option>
        {categories?.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </Select>
    </div>

  );
};

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;


const Select = styled.select`
  display: block;
  padding: 16px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
`;

export default SelectField;
