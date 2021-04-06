import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

export default function useSwipeMobile(elementRef, callbacks) {
  const [xStart, setXStart] = useState();
  const [xEnd, setXEnd] = useState();
  const [touchEnded, setEnded] = useState(false);
  function getTouches(e) {
    return e.touches || e.originalEvent.touches;
  }

  function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0];
    console.log(firstTouch);
    setXStart(firstTouch.clientX);
  }

  function handleTouchMove(e) {
    const lastTouch = getTouches(e)[0];
    console.log(lastTouch);
    setXEnd(lastTouch.clientX);
  }

  function handleTouchEnd() {
    setEnded(true);
  }

  useEventListener("touchstart", handleTouchStart, elementRef.current);
  useEventListener("touchmove", handleTouchMove, elementRef.current);
  useEventListener("touchend", handleTouchEnd, elementRef.current);

  useEffect(() => {
    console.log(elementRef);
    if (touchEnded) {
      if (!xStart || !xEnd) return;

      let dx = xEnd - xStart;
      let sign = Math.sign(dx);

      if (sign === 1) callbacks[0](); //Swipe right
      if (sign === -1) callbacks[1](); //Swipe left
      setXStart(null);
      setXEnd(null);
      setEnded(false);
    }
  }, [xStart, xEnd, touchEnded]);
}
