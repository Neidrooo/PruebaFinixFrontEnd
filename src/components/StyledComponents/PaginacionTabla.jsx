import styled from "styled-components";

const Paginacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FlechaPaginacion = styled.button`
  border: none;
  background-color: #4d88ff;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 20px;
  border-radius: 5px;
  font-size: 1rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #4d88ff;
  }
`;

const InfoPaginacion = styled.span`
  color: #4d88ff;
  font-size: 1rem;
`;

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  return (
    <Paginacion>
      <FlechaPaginacion
        onClick={() => onChangePage(1)}
        disabled={currentPage <= 1}
      >
        {"<<"}
      </FlechaPaginacion>
      <FlechaPaginacion
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {"<"}
      </FlechaPaginacion>
      <InfoPaginacion>
        Página {currentPage} de {totalPages}
      </InfoPaginacion>
      <FlechaPaginacion
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {">"}
      </FlechaPaginacion>
      <FlechaPaginacion
        onClick={() => onChangePage(totalPages)}
        disabled={currentPage >= totalPages}
      >
        {">>"}
      </FlechaPaginacion>
    </Paginacion>
  );
};

export default Pagination;
