import styled from "styled-components";
import dropdownIcon from "../image/dropdown.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Divider = styled.div`
  flex: 1 1 auto;
  background: white;
  min-height: 3px;
  min-width: 3px;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 10px;
`;

const Title = styled.div`
  flex: 1 1 auto;
`;

const Description = styled.div`
  flex: 1 1 auto;
`;

const CollapseIcon = styled.img`
  transition: 0.5s;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 3px solid white;
  background: white;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  &:hover {
    transition: 0.2s;
    scale: 1.1;
    box-shadow: 0px 0px 5px 5px white;
  }
`;

export default function ExpandedTask({
  taskName,
  description,
  handleCollapseClick,
}) {
  return (
    <Container>
      <TitleContainer>
        <Title> {taskName} </Title>
        <CollapseIcon src={dropdownIcon} onClick={handleCollapseClick} />
      </TitleContainer>
      <Divider />
      <Description> {description} </Description>
    </Container>
  );
}
