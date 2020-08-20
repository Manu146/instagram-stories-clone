import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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

function Indicator({ slide }) {
  const { progress, status } = slide;
  let percentage = status === 0 ? 0 : status === 1 ? progress : 100;
  return (
    <IndicatorWrapper>
      <IndicatorFiller percentage={percentage}></IndicatorFiller>
    </IndicatorWrapper>
  );
}

export default function SlideIndicator({ slides }) {
  return (
    <Wrapper>
      {slides.map((slide, index) => {
        return <Indicator key={slide.slideIndex} slide={slide}></Indicator>;
      })}
    </Wrapper>
  );
}
