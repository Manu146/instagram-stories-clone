import React, { useEffect, useState, createContext } from "react";

export const StoriesContext = createContext();

const { Provider } = StoriesContext;

const storiesData = [{ user: "aajohn", stories: [] }, {}];

const fetchUserStories = (username) => {
  return new Promise((resolve, reject) => {
    let stories = storiesData.filter((stories) => stories.user === username);
    setTimeout(() => {
      if (stories) resolve(stories[0]);
      else reject("No stories found");
    }, 2000);
  });
};

export default function StoriesProvider({ children }) {
  const [stories, setStories] = useState({});
  const [isFetching, setFetching] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (user !== "") setFetching(true);
    fetchUserStories(user).then((data) =>
      setStories((prevStories) => {
        return { ...prevStories, [user]: data.stories };
      }).then(() => setFetching(false))
    );
  }, [user]);

  return (
    <Provider value={{ stories, isFetching, setUser }}>{children}</Provider>
  );
}
