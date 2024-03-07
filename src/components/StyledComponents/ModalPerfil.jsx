import React from "react";
import styled from "styled-components";
import iconoUser from "../../assets/img/iconoUser.svg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalPerfil = ({ onClose, nombre, correo, usuario, rol }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileImage src={iconoUser} alt="Icono de usuario" />
        <h2>Perfil</h2>
        <p>
          <strong>Nombre:</strong> {nombre}
        </p>
        <p>
          <strong>Correo:</strong> {correo}
        </p>
        <p>
          <strong>Usuario:</strong> {usuario}
        </p>
        <p>
          <strong>Rol:</strong> {rol}
        </p>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalPerfil;
