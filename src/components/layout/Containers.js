import styled from "styled-components";

export const MainContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`;

export const LeftContainer = styled.div`
  width: 100%;
  @media (min-width: 960px) {
    width: 60%;
  }
`;

export const RightContainer = styled.div`
  width: 100%;
  @media (min-width: 960px) {
    width: 40%;
  }
`;
