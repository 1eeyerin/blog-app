import styled from 'styled-components';
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 16px 100px;
  max-width: 850px;
  margin: 0 auto;
`;

export default Wrapper;
