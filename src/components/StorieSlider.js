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
      src: "./instagram-stories-clone/stories/1.jpg",
      preview:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABIACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP5nT4i0+0a0bSfiLDOINL0+4uWtNB1ITyX0t1nUbS3Fx4Ts8XlvZSFJtSnumS+jibT3upLRlr5WOXY2rCarZG1Kc58sauLoTirwapzqOGa1E4Kfx0o07Uo3nS9o3yl1KtCEV/tlN2hSir06i5uWWsU5YWGtrtTbbqK0anuq6uS+M9DaSRk8U+K3Vndlb/hHGg3KWJDeRb+JFghyMHyoFWGPOyIBAoo/1cqrT+z8JpppUoTXylVwvtJLtKp77Ws/ebJeNpXdqrtfS7lF/OManLF+UfdWy0LXhnw5rep+bN4Nuru51LRdIl+x6fpaWdtdXlkbbzbwW+naOGv7gQ6jPFGHlsb2PUY7lrq9nsnSO2u/tJ1JU7e0q0Yc8owpNx5G5y52ocspvncopWSfNLlk1FXsvzeviHFQWPq0acKmJXtp4mk5xpVPaqnSftsbjI04yqxVTkhBRdNxdOnSrRU3C7/wty/tP9FS8u1S2/0dFvfCPh2a8VYf3ardzTTNLLdAKBPJKxkeXezksSaV6y09tDTT+BT/APkWbLh3Fz9/62ve973HJw97X3XHDRi46+64xirWsktDPtbS0NvLm1tzt0C8dcwxna6WOvyo65XhkkVZFYcq4DghgDXh4qc44iKjKUV9boaKTS1nh09E7aptPum1seXgqtScKnPUnP8A4UKkPenKXuc+GXLq37tpSXLtaTVtWRvbwB3AhhADsABGgAAJwANvSu6bfNLV/E+vmz5t4jEXf7+tu/8Al7Pv/iP/2Q==",
    },
    {
      slideIndex: 2,
      status: 0,
      progress: 0,
      type: "img",
      src: "./instagram-stories-clone/stories/2.jpg",
      preview:
        "data:image/jpeg;base64,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",
    },
    {
      slideIndex: 3,
      status: 0,
      progress: 0,
      type: "img",
      src: "./instagram-stories-clone/stories/3.jpg",
      preview:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABIACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP4sdK8G65rGlXesWkCLaWrBIvtBlhk1Fhu89dNzCYrv7HtH2wiVRb74/MI3Cv011IKbp8yc1HmcU1zKLaSk1e6Tb0dj8wUW05KzSlyvVfFZStbe/K1J9k03ur8rViPU7L4qa3a+EtN8KzS3l7Z6HbXVrolrcXjyafYx32sT6vf+XA4Z4UvJLqZZobOS1DSxQTtIxedH5qeFp06+JrqEFPEui5zUYqcvZU1TipSUeaSjGK5byduaSSR21sVCrhcHQ9hCFTCRqxVaOjqe1rVKsqkkkk6so1IUJTlzS9jhsPCLUYuJ5ZXScQUAFAH/2Q==",
    },
    {
      slideIndex: 4,
      status: 0,
      progress: 0,
      type: "img",
      src: "./instagram-stories-clone/stories/4.jpg",
      preview:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABIACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP5dP2jf2TPEfwvN0ms6Q2nSxS3lu0JG4xT2TKk8DuF2tNGXUOiEmNsxyIpwx/u7xG8KaeVYB43DxpVaUqcaiVFqfLTmrxqSWjjGUXzRdrSjtFqzP4O8MPGCGe1qFCdScalR7VfdcrTlTm0k3ypTjOLTfM2r6fCfnVN4WZZpV8pflkcdR2Yj+8P5V/KlTKqcak4vmTjOSa5drSasf1ZTz6LpwfPvCO6f8q/uv8z+gr9ub9sjwn8YxrurXekWZ8QeILG4nuJdIjtNL0601e7niL3VxFDCDrLx2MdzGNkekqt9cR3f7+OF45/7s8RswyfC5VQwmBxko0cswzy/C+3xlXMKuKwEo06s3CE60aeDmq9GnTp+1eNqLC+2pJ0niITo/wAHeDvB2YYKVbFY5zxeOzXERzDE06GBoZVhcDj4VKlGlGq1SxGIzGP1GvWqVVQlldH+0JYOq3iaWDlTxX4RXOs2jXNwyKoVp5WUE5IUyMQCe5A79+tfxrWx2Hdaq0429rUts/tPrfU/tKjltZUaSldyVKmpPRXaik3bpd9Dt/HFzcPFIHnmYAuAGldgBlhgAsRjHavsOLK9eVOalWqySk7KVSbS99LZvtp6aHy3C9GjGtDlpUo+7F+7TiteWLvot76nzlLJJ5svzv8A6x/4m/vH3r8VnKXPPV/FLq+7P2KEVyR0Xwx6Lsj/AP/Z",
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
        active={activeSlide}
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
