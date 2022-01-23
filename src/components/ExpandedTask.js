import styled from "styled-components";
import dropdownIcon from "../image/dropdown.png";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const Divider = styled.div`
  flex: 1 1 auto;
  background: #004eff;
  box-shadow: 0px 0px 1px 0px white;
  min-height: 3px;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
`;

const Title = styled.div`
  flex: 1 1 auto;
  min-height: 56px;
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
    box-shadow: 0px 0px 5px 5px #b026ff;
  }
`;

export default function ExpandedTask({
  taskName,
  description,
  handleCollapseClick
}) {
  return (
    <Container>
      <TaskContainer>
        <Title> {taskName} </Title>
        <Divider />
        <Description> {description} </Description>
      </TaskContainer>
      <CollapseIcon src={dropdownIcon} onClick={handleCollapseClick} />
    </Container>
  );
}
