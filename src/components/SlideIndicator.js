import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  padding-top: 0.25rem;
  width: 100%;
  display: flex;
`;

const IndicatorWrapper = styled.div`
  background-color: hsl(0, 0%, 60%);
  height: 0.25rem;
  border-radius: 0.5rem;
  flex: 1;
  margin: 0 0.125rem;
`;

const IndicatorFiller = styled.div`
  background-color: white;
  height: 100%;
  border-radius: 0.5rem;
  width: ${(props) => props.percentage}%;
`;

function Indicator({ progress }) {
  return (
    <IndicatorWrapper>
      <IndicatorFiller percentage={progress}></IndicatorFiller>
    </IndicatorWrapper>
  );
}

export default function SlideIndicator({ slides, progress, activeSlide }) {
  return (
    <Wrapper>
      {slides.map((slide, index) => {
        return index < activeSlide ? (
          <Indicator key={slide.slideIndex} progress={100} />
        ) : index === activeSlide ? (
          <Indicator key={slide.slideIndex} progress={progress} />
        ) : (
          <Indicator key={slide.slideIndex} progress={0} />
        );
      })}
    </Wrapper>
  );
}
