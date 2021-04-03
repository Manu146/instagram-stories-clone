import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  width: 100%;
  padding: 1rem;
  z-index: 5;
`;

const FlexContainer = styled.div`
  display: flex;
  padding: 0 0.25rem;
`;

const UserImg = styled.img`
  border-radius: 50%;
  border: 1px solid #dedede;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  background-color: #dedede;
`;

const UserName = styled.span`
  color: inherit;
`;

const UserInfoWrapper = styled.div`
  display: flex;
`;

export default function StoryHeader({ user, children }) {
  return (
    <Wrapper>
      {children}
      <FlexContainer>
        <UserInfoWrapper>
          <UserImg src={user.userImg} alt="a"></UserImg>
          <UserName>{user.username}</UserName>
        </UserInfoWrapper>
      </FlexContainer>
    </Wrapper>
  );
}
