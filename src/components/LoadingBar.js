import styled from "styled-components";

const handleProgress = (activeState, progress) => {
  switch (activeState) {
    case 1:
      return progress;

    case 2:
      return 100;

    case 0:
      return 0;

    default:
      return 0;
  }
};

export const LoadBar = styled.div.attrs(({ progress, activeState }) => ({
  style: {
    width: handleProgress(activeState, progress) + "%",
  },
}))`
  height: 2px;
  background-color: white;
  max-width: 100%;
`;

export const LoadBarWrapper = styled.div`
  flex: ${({ width }) => width};
  background: rgba(255, 255, 255, 0.35);
`;
