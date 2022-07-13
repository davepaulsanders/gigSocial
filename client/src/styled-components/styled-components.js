import styled, { keyframes } from "styled-components";

const materialize = keyframes`
 0% { opacity: 0; transform: scale(60%); }
 100% { opacity: 1; transform: scale(100%); }
`;
export const FORM = styled.form`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem 1rem 1rem;
  animation-name: ${materialize};
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
`;
export const INPUT = styled.input`
  background-color: transparent;
  border: 2px solid #000;
  padding: 0.5rem 0;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const BUTTON = styled.button`
  color: #000;
  width: 27rem;
  margin-top: 0.75rem;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 400;
  padding: 0.65rem 2.5rem;
  background-color: transparent;
  border: 2px solid black;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap;
`;
