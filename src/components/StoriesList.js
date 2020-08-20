import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import UserStories from "./UserStories";

const Wrapper = styled.div`
  padding: 1rem;
  border: 1px solid hsl(0, 0%, 88%);
  border-radius: 0.25rem;
  background-color: white;
  width: 60%;
  position: relative;
  overflow: hidden;
`;

const UserList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  transition: transform 0.5s ease-out;
  transform: translateX(-${(props) => props.translate}%);
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 0.75rem;
`;

const ArrowContainer = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  padding: 0;
  border: none;
  background-color: white;
  color: rgba(220, 220, 220, 0.7);
  top: calc(50% - 0.625rem);
  ${(props) => (props.content === "left" ? "left: 0" : "right: 0")};
  z-index: 1;
  -webkit-box-shadow: 0px 0px 7px 0px rgba(38, 38, 38, 0.75);
  -moz-box-shadow: 0px 0px 7px 0px rgba(38, 38, 38, 0.75);
  box-shadow: 0px 0px 7px 0px rgba(38, 38, 38, 0.75);
`;

function Arrow({ content, show, handleOnclck }) {
  return (
    <>
      {show && (
        <ArrowContainer onClick={handleOnclck} content={content}>
          <i className="material-icons">
            {content === "left" ? "navigate_before" : "navigate_next"}
          </i>
        </ArrowContainer>
      )}
    </>
  );
}

export default function StoriesList({ users, setUser, openFn }) {
  const sliderRef = useRef();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    setPages(Math.ceil((users.length * 76) / sliderRef.current.offsetWidth));
  }, [users.length]);
  let translate = (page - 1) * 50;
  return (
    <Wrapper>
      <Arrow
        show={page < pages}
        content="right"
        handleOnclck={() => setPage(page + 1)}
      ></Arrow>
      <Arrow
        show={page > 1}
        content="left"
        handleOnclck={() => setPage(page - 1)}
      ></Arrow>
      <UserList ref={sliderRef} translate={translate}>
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserStories
              user={user}
              setUser={setUser}
              openFn={openFn}
            ></UserStories>
          </UserItem>
        ))}
      </UserList>
    </Wrapper>
  );
}
