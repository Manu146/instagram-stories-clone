import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  z-index: 3;
`;

const UserImg = styled.img`
  border-radius: 50%;
  border: 1px solid #dedede;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  background-color: #dedede;
`;

const UserName = styled.span`
  color: inherit;
`;

export default function StoryHeader({ user }) {
  return (
    <Wrapper>
      <UserImg src={user.userImg} alt="a"></UserImg>
      <UserName>{user.username}</UserName>
    </Wrapper>
  );
}
