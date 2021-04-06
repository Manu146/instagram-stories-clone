import React, { useEffect, useState, createContext } from "react";
import storiesData from "../storiesData.json";

export const StoriesContext = createContext();

const { Provider } = StoriesContext;

const fetchUserStories = (username) => {
  return new Promise((resolve, reject) => {
    let stories = storiesData.filter((stories) => stories.user === username);
    setTimeout(() => {
      if (stories) resolve(stories[0]);
      else reject("No stories found");
    }, 2500);
  });
};

export default function StoriesProvider({ children }) {
  const [stories, setStories] = useState({});
  const [isFetching, setFetching] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setFetching(true);
      fetchUserStories(user.username)
        .then((data) =>
          setStories((prevStories) => {
            return { ...prevStories, [user.username]: data.stories };
          })
        )
        .then(() => {
          setFetching(false);
          setOpen(true);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <Provider value={{ stories, isFetching, setUser, user, isOpen, setOpen }}>
      {children}
    </Provider>
  );
}
