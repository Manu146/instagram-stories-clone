import React, { useState } from "react";
import "./App.css";
import StoriesList from "./components/StoriesList";
import StorieSlider from "./components/StorieSlider";
import { MainContainer } from "./components/layout/Container";

function App() {
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
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div className="App">
      {open && (
        <StorieSlider closeFn={() => setOpen(false)} selectedUser={user} />
      )}
      <MainContainer>
        <StoriesList
          users={users}
          setUser={setUser}
          openFn={() => setOpen(true)}
        ></StoriesList>
        <h2>To watch stories, click in one profile pic!</h2>
      </MainContainer>
    </div>
  );
}

export default App;
