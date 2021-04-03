import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import StoriesList from "./components/StoriesList";
import SliderWrapper from "./components/SliderWrapper";
import StoriesProvider from "./contexts/StoriesContext";
import {
  MainContainer,
  LeftContainer,
  RightContainer,
} from "./components/layout/Containers";
import { DefaultBox } from "./components/layout/DefaultBox";

const InfoBox = styled(DefaultBox)`
  margin-top: 1rem;
`;

const GitBox = styled(DefaultBox)`
  margin-top: 1rem;
  margin-left: 0;
  text-align: center;
  @media (min-width: 960px) {
    margin-left: 1rem;
  }
`;

const GitLogo = styled.img`
  width: 120px;
  height: 120px;
`;

const GitLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
`;

function App() {
  return (
    <div className="App">
      <StoriesProvider>
        <SliderWrapper />
        <MainContainer>
          <LeftContainer>
            <StoriesList />
            <InfoBox>
              <h2>To watch stories, click on a profile pic!</h2>
              <h3>On-story interface:</h3>
              <ul>
                <li>Next and prev button to navigate through user stories.</li>
                <li>
                  Pause the story by mantaining mouse button down. Un-pause
                  story by realeasing mouse button.
                </li>
                <li>Header showing username and user profile pic.</li>
              </ul>
            </InfoBox>
          </LeftContainer>
          <RightContainer>
            <GitBox>
              <GitLink
                href="https://github.com/Manu146/instagram-stories-clone"
                target="_blank"
              >
                <GitLogo src="./github-logo.png" alt="github logo" />
                <span>Link to github repo</span>
                <p>
                  Made with <i class="material-icons heart">favorite</i> by
                  Manu146
                </p>
              </GitLink>
            </GitBox>
          </RightContainer>
        </MainContainer>
      </StoriesProvider>
    </div>
  );
}

export default App;
