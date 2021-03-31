import { useState, useRef, useEffect } from "react";

export default function useProgress(
  currentIndex,
  duration = 4000,
  endCallBack,
  isPaused
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

    if (!isPaused)
      animationId.current = requestAnimationFrame(incrementProgress);

    return () => {
      cancelAnimationFrame(animationId.current);
    };
  }, [isPaused, duration, currentIndex]);

  /*useEffect(() => { This generates a bug, the bars blink at 100% for a moment and then fall to 0% on currentindex change
    setProgress(0);
  }, [currentIndex]);*/

  return progress;
}
