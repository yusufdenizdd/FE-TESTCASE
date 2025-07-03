import styled from "styled-components";
import { Button } from "react-bootstrap";

const CustomButton = styled(Button).attrs({ type: "submit" })`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-color: ${({ theme }) => theme.buttonBorder};
  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.buttonHover} !important;
    color: ${({ theme }) => theme.buttonText};
    border-color: ${({ theme }) => theme.cardBorder};
  }
`;
export default CustomButton;
