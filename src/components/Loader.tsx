import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <Wrap>
      <Circle>
        <div />
        <div />
        <div />
        <div />
      </Circle>
    </Wrap>
  );
};

const ani1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ani2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ani3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #dedede;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 8px;
      animation: ${ani1} 0.6s infinite;
    }

    &:nth-child(2) {
      left: 8px;
      animation: ${ani2} 0.6s infinite;
    }

    &:nth-child(3) {
      left: 32px;
      animation: ${ani2} 0.6s infinite;
    }

    &:nth-child(4) {
      left: 56px;
      animation: ${ani3} 0.6s infinite;
    }
  }
`;


export default Loader;
