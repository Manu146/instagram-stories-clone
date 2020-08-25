import React from "react";
import styled from "styled-components";
import useProgressiveImg from "../custom-hooks/useProgressiveImg";

const StyledImg = styled.img`
  filter: ${(props) => (props.blur ? "blur(0.5rem)" : "none")};
  transition: ${(props) => (props.blur ? "none" : "filter 0.3s ease-out")};
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100%;
`;

export default function ProgressiveImg({ story, callback }) {
  const { preview, src } = story;
  const [srcAct, { blur }] = useProgressiveImg(preview, src, callback);
  return <StyledImg src={srcAct} blur={blur} />;
}
