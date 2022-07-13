import styled from "styled-components";

export const FORM = styled.form`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem 1rem 1rem;
  width: 85%;
`;
export const INPUT = styled.input`
  width: 90%;
  background-color: transparent;
  border: 2px solid #000;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
`;

export const BUTTON = styled.button`
  color: #000;
  font-size: 1.25rem;
  font-weight: 400;
  padding: 0.65rem 2.5rem;
  background-color: transparent;
  border: 2px solid black;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap;
`;
