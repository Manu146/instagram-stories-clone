import React from "react";
import styled from "styled-components";
import { ReactComponent as SendIcon } from "../svgs/send.svg";

const Text = styled.input`
  border-radius: 2rem;
  border: 1px solid #dedede;
  background-color: transparent;
  width: 85%;
  padding: 0.75rem 1rem;
  color: #bbbbbb;
  justify-self: flex-start;
  &:focus {
    border-color: white;
    outline: none;
  }
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SendButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin-left: 1rem;
  & svg {
    fill: #dedede;
  }
`;

export default function ReplyForm({ handleOnFocus }) {
  return (
    <StyledForm>
      <Text
        placeholder="Reply story.."
        onFocus={handleOnFocus}
        onBlur={handleOnFocus}
      />
      <SendButton>
        <SendIcon />
      </SendButton>
    </StyledForm>
  );
}
