import styled from "styled-components";
import { useState } from "react";
import iconoLogout from "../../assets/img/iconoLogout.svg";
import iconoProfile from "../../assets/img/iconoProfile.svg";
import ModalPerfil from "../StyledComponents/ModalPerfil";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Tooltip from "../StyledComponents/Tooltip";
const ContainerHeader = styled.header`
  width: 100%;
  height: 70px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .contenedor-navegacion {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-right: 24px;
  }
  .center-items {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const IconoSalir = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${iconoLogout});
  background-size: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconoPerfil = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${iconoProfile});
  background-size: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <ContainerHeader>
        <div className="center-items">
          <img
            src="https://finix-group.com/wp-content/uploads/2022/02/fg-1.svg"
            alt="Logo"
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          />
          <div className="contenedor-navegacion">
            <Tooltip text="Cerrar sesión">
              <IconoSalir onClick={handleLogout} />
            </Tooltip>
            <Tooltip text="Ver perfil">
              <IconoPerfil onClick={() => setShowModal(true)} />
            </Tooltip>
          </div>
        </div>
      </ContainerHeader>
      {showModal && (
        <ModalPerfil
          nombre={`${user.firstName} ${user.lastName}`}
          correo={user.email}
          usuario={user.username}
          rol={user.role}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
export default Header;
