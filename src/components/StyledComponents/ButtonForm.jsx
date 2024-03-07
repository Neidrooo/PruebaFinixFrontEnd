import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 50%;
  margin: 0 auto;

  @media (max-width: 768px) {
    // Ajusta este valor según tus necesidades
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonForm = styled.button`
  height: 50px;
  width: 150px;
  align-items: center;
  background: #4d88ff;
  border-radius: 50px;
  border: none;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background: #3366ff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background: #3366ff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3366ff;
  }
`;
