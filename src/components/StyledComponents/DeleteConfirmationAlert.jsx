import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import iconoBorrar from "../../assets/img/iconoBorrar.svg";
const IconoEliminar = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${iconoBorrar});
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
const MySwal = withReactContent(Swal);

const DeleteConfirmationAlert = ({ uid, onDeleteConfirmed }) => {
  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteConfirmed(uid);
      }
    });
  };

  return <IconoEliminar onClick={showConfirmationAlert} />;
};

export default DeleteConfirmationAlert;
