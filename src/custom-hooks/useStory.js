import React, { useEffect, useReducer, useState, useRef } from "react";

const initialState = {
  currentStory: 0, // index of current story beign show
  isPaused: false,
  isLoading: true,
};

const defaultStoryDuration = 5000;

const calcTimeDiff = (frstTime, scndTime) =>
  scndTime === null ? 0 : scndTime - frstTime;

export default function useStory(nOfStories) {
  //const [storyState, dispatch] = useReducer(storyReduce, initialState);
  const startedAt = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [currentStory, setCurrentStory] = useState(0);
  const lastTimeout = useRef();

  const setNextStory = () => {
    if (currentStory + 1 <= nOfStories - 1) {
      startedAt.current = new Date();
      setLoading(true);
      setCurrentStory((currentStory) => currentStory + 1);
    }
  };

  const setPrevStory = () => {
    if (currentStory - 1 > 0)
      return setCurrentStory((currentStory) => currentStory - 1);
  };

  const pause = () => {
    if (isPaused) {
      setPaused(!isPaused);
      setPausedAt(null);
    } else {
      setPaused(true);
      setPausedAt(new Date());
    }
  };

  useEffect(() => {
    if (!isLoading) startedAt.current = new Date();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (isPaused) {
      if (lastTimeout.current) clearTimeout(lastTimeout.current);
      else return;
    } else {
      lastTimeout.current = setTimeout(() => {
        setNextStory();
      }, defaultStoryDuration - calcTimeDiff(startedAt, pausedAt));
    }
    return () => {
      clearTimeout(lastTimeout.current);
    };
  }, [isPaused, isLoading]);

  return { isLoading, isPaused, pause, setLoading, currentStory };
}
