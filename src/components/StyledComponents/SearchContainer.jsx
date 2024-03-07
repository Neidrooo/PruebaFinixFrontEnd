import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 40px;
  flex-direction: row;
  width: 60%;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4d88ff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #3366ff;
  }
`;

const Search = ({ searchUid, setSearchUid, setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Buscar por UID..."
          value={searchUid}
          onChange={(e) => setSearchUid(e.target.value)}
        />
        <Button onClick={() => navigate("/Formulario")}>Agregar</Button>
      </SearchContainer>
    </>
  );
};
export default Search;
