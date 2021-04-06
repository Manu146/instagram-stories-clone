import { useState, useRef, useEffect } from "react";

export default function useProgress(
  currentIndex,
  duration = 4000,
  endCallBack,
  isPaused,
  isLoading
) {
  const [progress, setProgress] = useState(0);
  const animationId = useRef(null);
  const progressCopy = useRef(0);

  useEffect(() => {
    const incrementProgress = () => {
      setProgress((progress) => {
        progressCopy.current = progress + 100 / ((duration / 1000) * 60);
        return progress + 100 / ((duration / 1000) * 60);
      });
      if (progressCopy.current < 100) {
        animationId.current = requestAnimationFrame(incrementProgress);
      } else {
        setProgress(0);
        endCallBack();
        cancelAnimationFrame(animationId.current);
      }
    };

    if (isPaused || isLoading) {
      cancelAnimationFrame(animationId.current);
    } else {
      animationId.current = requestAnimationFrame(incrementProgress);
    }

    return () => {
      cancelAnimationFrame(animationId.current);
    };
  }, [isPaused, isLoading, duration, currentIndex]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  return progress;
}
