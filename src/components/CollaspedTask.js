import styled from "styled-components";
import dropdownIcon from "../image/dropdown.png";

const Container = styled.div`
  display: flex;
  width: 100%;
  column-gap: 10px;
`;

const Title = styled.div`
  flex: 1 1 auto;
`;

const ExpandIcon = styled.img`
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  margin-left: auto;
  border-radius: 100%;
  border: 3px solid white;
  background: white;
  &:hover {
    transition: 0.2s;
    scale: 1.1;
    box-shadow: 0px 0px 5px 5px white;
  }
`;

export default function CollaspedTask({ taskName, handleExpandClick }) {
  return (
    <Container>
      <Title> {taskName} </Title>
      <ExpandIcon src={dropdownIcon} onClick={handleExpandClick} />
    </Container>
  );
}
