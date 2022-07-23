import styled, { keyframes } from "styled-components";

const materializeScale = keyframes`
0% { opacity: 0; transform: scale(90%); }
100% { opacity: 1; transform: scale(100%); }
`;
const materialize = keyframes`
0% { opacity: 0; }
100% { opacity: 1; }
`;
export const APPEARDIV = styled.div`
  animation-name: ${materialize};
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: backwards;
`;
export const FORM = styled.form`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem 1rem 1rem;
  animation-name: ${materializeScale};
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  max-height: 30rem;
  overflow-y: auto;
  z-index: 1;
  
`;
export const INPUT = styled.input`
  font-size: 1.15rem;
  background-color: transparent;
  border: 2px solid #000;
  padding: 0.5rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const BUTTON = styled.button`
  color: #000;
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

export const SONG_CONTAINER = styled.div`
  width: 100%;
  background-color: #303030;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  overflow: hidden;
`;
