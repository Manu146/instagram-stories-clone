import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import UserStories from "./UserStories";
import { DefaultBox } from "./layout/DefaultBox";
import useStoriesCntx from "../custom-hooks/useStoriesCntx";

const users = [
  { id: 1, username: "adntorres", userImg: "https://bigheads.io/svg?seed=1" },
  { id: 2, username: "jrondon", userImg: "https://bigheads.io/svg?seed=2" },
  { id: 3, username: "jkg_pe", userImg: "https://bigheads.io/svg?seed=3" },
  { id: 4, username: "a.mana", userImg: "https://bigheads.io/svg?seed=4" },
  { id: 5, username: "asd.store", userImg: "https://bigheads.io/svg?seed=5" },
  { id: 6, username: "jjh_12", userImg: "https://bigheads.io/svg?seed=6" },
  { id: 7, username: "jkg_pe", userImg: "https://bigheads.io/svg?seed=7" },
  { id: 8, username: "uwuin", userImg: "https://bigheads.io/svg?seed=8" },
  { id: 9, username: "mp.12", userImg: "https://bigheads.io/svg?seed=9" },
  {
    id: 10,
    username: "elmascapo",
    userImg: "https://bigheads.io/svg?seed=10",
  },
  {
    id: 11,
    username: "andres.2",
    userImg: "https://bigheads.io/svg?seed=11",
  },
  { id: 12, username: "juan_a", userImg: "https://bigheads.io/svg?seed=12" },
];

const Wrapper = styled(DefaultBox)`
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
  color: rgb(220, 220, 220);
  max-width: 24px;
  max-height: 24px;
  top: calc(50% - 0.625rem);
  ${(props) => (props.content === "left" ? "left: 0.5rem" : "right: 0.5rem")};
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

export default function StoriesList() {
  const sliderRef = useRef();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const { setUser, isFetching } = useStoriesCntx();
  useEffect(() => {
    setPages(Math.ceil((users.length * 76) / sliderRef.current.offsetWidth));
  }, []);
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
              setUser={() => setUser(user)}
              user={user}
              animated={isFetching}
            ></UserStories>
          </UserItem>
        ))}
      </UserList>
    </Wrapper>
  );
}
