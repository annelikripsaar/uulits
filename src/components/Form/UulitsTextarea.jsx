import styled from "@emotion/styled"

export const UulitsTextarea = styled.textarea`
  font-family: inherit;
  font-size: 12px;

  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  width: 100%;
  height: 32px;
  text-align: center;
  padding-top: 12px;

  &:focus {
    outline: none;
    border-bottom: 2px solid black;
  }
`
