import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SlideIndicator from "./SlideIndicator";
import Storie from "./Storie";
import useEventListener from "../custom-hooks/useEventListener";
import StorieHeader from "./StorieHeader";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(84, 84, 84, 0.7);
  position: absolute;
  z-index: 2;
`;

const ArrowContainer = styled.button`
  position: absolute;
  ${(props) => (props.dir === "left" ? "left: -2.5rem" : "right: -2.5rem")};
  top: calc(50% - 0.75rem);
  background-color: #dedede;
  color: rgba(84, 84, 84, 0.7);
  border-radius: 50%;
  padding: 0.375rem;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: -2.5rem;
  color: #dedede;
  font-size: 2rem;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

function Arrow({ dir, onClick }) {
  return (
    <ArrowContainer onClick={onClick} dir={dir}>
      <i className="material-icons">
        navigate_{dir === "left" ? "before" : "next"}
      </i>
    </ArrowContainer>
  );
}

export default function StorieSlider({ closeFn, selectedUser }) {
  let duration = 5;
  const [slides, setSlides] = useState([
    {
      slideIndex: 1,
      status: 0,
      progress: 0,
      type: "img",
      src: "./stories/1.jpg",
      preview: "./stories/previews/1.svg",
    },
    {
      slideIndex: 2,
      status: 0,
      progress: 0,
      type: "img",
      src: "./stories/2.jpg",
      preview: "./stories/previews/2.svg",
    },
    {
      slideIndex: 3,
      status: 0,
      progress: 0,
      type: "img",
      src: "./stories/3.jpg",
      preview: "./stories/previews/3.svg",
    },
    {
      slideIndex: 4,
      status: 0,
      progress: 0,
      type: "img",
      src: "./stories/4.jpg",
      preview: "./stories/previews/4.svg",
    },
  ]);
  const storieRef = useRef();
  let activeSlide = useRef(0);
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);
  useEventListener("mousedown", mouseHandler, storieRef.current);
  useEventListener("mouseup", mouseHandler);

  function mouseHandler() {
    setPause(!pause);
  }
  function nextSlide() {
    if (activeSlide.current < slides.length - 1) {
      let updatedSlides = [...slides];
      let currSlide = {
        ...updatedSlides[activeSlide.current],
        status: 2,
        progress: 100,
      };
      let nextSlide = {
        ...updatedSlides[activeSlide.current + 1],
        status: 1,
        progress: 0,
      };
      updatedSlides[activeSlide.current] = currSlide;
      updatedSlides[activeSlide.current + 1] = nextSlide;
      activeSlide.current++;
      setSlides(updatedSlides);
      setCounter(1);
    } else return;
  }
  function prevSlide() {
    if (activeSlide.current > 0) {
      let updatedSlides = [...slides];
      let currSlide = {
        ...updatedSlides[activeSlide.current],
        status: 0,
        progress: 0,
      };
      let prevSlide = {
        ...updatedSlides[activeSlide.current - 1],
        status: 1,
        progress: 0,
      };
      updatedSlides[activeSlide.current] = currSlide;
      updatedSlides[activeSlide.current - 1] = prevSlide;
      activeSlide.current--;
      setSlides(updatedSlides);
      setCounter(1);
    } else return;
  }

  useEffect(() => {
    if (!pause) {
      if (counter < 101) {
        var tm = setTimeout(() => {
          let updatedSlides = [...slides];
          let slide = {
            ...updatedSlides[activeSlide.current],
            progress: updatedSlides[activeSlide.current].progress + 1,
          };
          if (counter === 1) slide.status = 1;
          updatedSlides[activeSlide.current] = slide;
          setSlides(updatedSlides);
          setCounter(counter + 1);
        }, 50);
      } else {
        let updatedSlides = [...slides];
        let slide = { ...updatedSlides[activeSlide.current], status: 2 };
        updatedSlides[activeSlide.current] = slide;
        setSlides(updatedSlides);
        if (activeSlide.current < slides.length - 1) {
          activeSlide.current++;
          setCounter(1);
        } else closeFn();
      }
    }
    return () => clearTimeout(tm);
  }, [counter, pause]);
  return (
    <Wrapper>
      <Storie
        storie={slides[activeSlide.current]}
        ref={storieRef}
        activeSlide={activeSlide}
      >
        <StorieHeader user={selectedUser} />
        <CloseButton onClick={closeFn} className="material-icons">
          close
        </CloseButton>
        <Arrow dir="left" onClick={prevSlide} />
        <Arrow dir="right" onClick={nextSlide} />
        <SlideIndicator slides={slides}></SlideIndicator>
      </Storie>
    </Wrapper>
  );
}
