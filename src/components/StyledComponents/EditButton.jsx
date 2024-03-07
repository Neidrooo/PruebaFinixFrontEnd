import styled from "styled-components";
import iconoEditar from "../../assets/img/iconoEditar.svg";

const IconoEditar = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${iconoEditar});
  background-size: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditButton = ({ uid, onEditClicked }) => {
  return <IconoEditar onClick={() => onEditClicked(uid)} />;
};

export default EditButton;
