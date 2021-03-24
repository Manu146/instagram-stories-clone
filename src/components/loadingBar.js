import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const BarContainer = styled.div`
  width: 100px;
  height: 8px;
  background-color: gray;
`;

const Bar = styled.div`
  height: 100%;
  width: ${({ progress }) => progress + "%"};
  background-color: white;
  transition: width 1s linear;
`;

export default function LoadingBar({ isLoading, isPaused, active, seen }) {
  const [progress, setProgress] = useState(seen ? 100 : 0);
  const tmout = useRef();
  useEffect(() => {
    if (active) {
      if (isLoading) return;
      if (isPaused) {
        if (tmout.current !== null) return clearTimeout(tmout.current);
        else return;
      }
      if (progress + 20 <= 100) {
        tmout.current = setTimeout(() => {
          setProgress(progress + 20);
        }, 1000);
      }
      return () => {
        clearTimeout(tmout);
      };
    }
  }, [progress, isLoading, isPaused, active]);
  return (
    <BarContainer>
      <Bar progress={progress} />
    </BarContainer>
  );
}
