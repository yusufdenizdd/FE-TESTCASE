import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faX, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.cardBody};
  border-color: ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
`;

const StyledHeader = styled(Card.Header)`
  background-color: ${({ theme }) => theme.cardHeader};
  color: ${({ theme }) => theme.text};
`;
export default function CardItem({
  text,
  isVisible,
  onToggle,
  onDelete,
}: {
  text: string;
  isVisible: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
}) {
  return (
    <StyledCard style={isVisible ? { width: "100%", height: "100%" } : {}}>
      <StyledHeader>
        <FontAwesomeIcon
          icon={isVisible ? faEye : faEyeSlash}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          style={{ cursor: "pointer", float: "right" }}
        />
        <FontAwesomeIcon
          icon={faX}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          style={{ cursor: "pointer", float: "left" }}
        />
      </StyledHeader>{" "}
      {isVisible && (
        <Card.Body style={{ overflowY: "auto" }}>
          <Card.Title>{text}</Card.Title>
        </Card.Body>
      )}
    </StyledCard>
  );
}
