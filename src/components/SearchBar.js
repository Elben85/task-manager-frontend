import styled from "styled-components";
import searchIcon from "../image/search.png";
import { SearchMethod, Categories } from "./enum";

const Container = styled.div`
  display: flex;
  padding: 0px 30px 0px 10px;
  margin-bottom: 20px;
  column-gap: 20px;
  width: 95%;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  padding: 2px;
  background: white;
  border: 2px solid blue;
`;

const Select = styled.select`
  font-size: 18px;
  padding: 5px;
  width: 120px;
`;

const Input = styled.input`
  transition: 0.2s;
  font-size: 18px;
  padding: 5px;
  width: 200px;
  &: focus {
    transition: 0.2s;
    flex: 1 0 auto;
    outline: none;
  }
`;

export default function SearchBar({
  searchMethod,
  setSearchMethod,
  setSearchInput
}) {
  function handleMethodChange(event) {
    setSearchMethod(event.target.value);
    setSearchInput("");
  }

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  return (
    <>
      <Container>
        <Icon src={searchIcon} />
        <Select onChange={handleMethodChange}>
          <option value={SearchMethod.ByTitle}> By Title </option>
          <option value={SearchMethod.ByTags}> By Tags </option>
        </Select>

        {searchMethod === SearchMethod.ByTitle ? (
          <Input
            type="text"
            onChange={handleInputChange}
            placeholder="Search..."
          />
        ) : (
          <Select name="tags" onChange={handleInputChange}>
            <option value=""> Any </option>
            <option value={Categories.General}> General </option>
            <option value={Categories.Health}> Health </option>
            <option value={Categories.Career}> Career </option>
            <option value={Categories.Relationship}> Relationship </option>
            <option value={Categories.Learning}> Learning </option>
            <option value={Categories.Enjoyment}> Enjoyment </option>
            <option value={Categories.Others}> Others </option>
          </Select>
        )}
      </Container>
    </>
  );
}
