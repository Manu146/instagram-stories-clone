import { useReducer } from "react";

const initialState = {
  currentIndex: 0,
  isPaused: false,
  isLoading: true,
};

const reducerWrapper = (nOfStories) => {
  return (state, action) => {
    switch (action.type) {
      case "NEXT_STORY":
        if (state.currentIndex + 1 < nOfStories)
          return {
            ...state,
            isLoading: true,
            currentIndex: state.currentIndex + 1,
          };
        else return { ...state, isLoading: true, currentIndex: 0 };

      case "PREV_STORY":
        if (state.currentIndex - 1 >= 0)
          return {
            ...state,
            isLoading: true,
            currentIndex: state.currentIndex - 1,
          };
        else return state;

      case "TOGGLE_PAUSE":
        return { ...state, isPaused: !state.isPaused };

      case "TOGGLE_LOADING":
        return { ...state, isLoading: action.payload };

      default:
        throw new Error("Action type not defined.");
    }
  };
};

export default function useStory(nOfStories) {
  const [state, dispatch] = useReducer(
    reducerWrapper(nOfStories),
    initialState
  );

  return [state, dispatch];
}
