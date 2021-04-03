import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
//import

/*const NoAnimation = css`
  background: linear-gradient(
    36deg,
    rgba(254, 218, 119, 1) 5%,
    rgba(245, 133, 41, 1) 32%,
    rgba(221, 42, 123, 1) 62%,
    rgba(129, 52, 175, 1) 100%
  );
  animation: none;
`;*/

const strokeDraw = keyframes`
  from {
    stroke: #8a3ab9;
    stroke-dasharray: 1;
  }
  to {
    stroke: #cd486b;
    transform: rotate(180deg);
    stroke-dasharray: 8;
  }
`;

const handleAnimated = (animated) => (animated ? strokeDraw : "none");

const Wrapper = styled.button`
  position: relative;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  //background: rgb(254, 218, 119);
  & svg {
    fill: none;
    stroke: #8a3ab9;
    stroke-linecap: round;
    stroke-width: 3;
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    animation: ${({ animated }) => handleAnimated(animated)} 2s ease-out
      infinite alternate;
  }
  padding: 0.125rem;
`;

const UserImg = styled.img`
  width: 3rem;
  height: auto;
  border-radius: 50%;
  position: absolute;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Name = styled.span`
  font-size: 0.75rem;
`;

export default function UserStories({ user, setUser, animated }) {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Wrapper
        onClick={() => {
          setUser();
          setClicked(!clicked);
        }}
        animated={clicked && animated}
      >
        <UserImg src={user.userImg} alt="" />
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          style={{ enableBackground: "new -580 439 577.9 194" }}
        >
          <circle cx="32" cy="32" r="30" />
        </svg>
      </Wrapper>
      <Name>{user.username}</Name>
    </>
  );
}
