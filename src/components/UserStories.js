import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgb(254, 218, 119);
  background: linear-gradient(
    36deg,
    rgba(254, 218, 119, 1) 5%,
    rgba(245, 133, 41, 1) 32%,
    rgba(221, 42, 123, 1) 62%,
    rgba(129, 52, 175, 1) 100%
  );
  padding: 0.125rem;
`;

const UserImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 0.125rem solid #fff;
  background-color: #dedede;
`;

const Name = styled.span`
  font-size: 0.75rem;
`;

export default function UserStories({ user, setUser, openFn }) {
  return (
    <>
      <Wrapper
        onClick={() => {
          setUser(user);
          openFn();
        }}
      >
        <UserImg src={user.userImg} alt="" className="userstories-img" />
      </Wrapper>
      <Name>{user.username}</Name>
    </>
  );
}
