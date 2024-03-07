import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchBanks, deleteBank } from "../../services/fetchBanks";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "../../components/StyledComponents/Tabla";
import PaginacionTabla from "../../components/StyledComponents/PaginacionTabla.jsx";
import SearchContainer from "../../components/StyledComponents/SearchContainer.jsx";
import Spinner from "../../components/StyledComponents/Spinner";
import DeleteConfirmationAlert from "../../components/StyledComponents/DeleteConfirmationAlert.jsx";
import EditButton from "../../components/StyledComponents/EditButton.jsx";
import { useNavigate } from "react-router-dom";

const ContainerListaFormulario = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .contenedor-lista-formulario {
    width: 60%;
  }
`;

const ListaFormulario = () => {
  const navigate = useNavigate();
  const [searchUid, setSearchUid] = useState("");
  const [banks, setBanks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const banksData = await fetchBanks(currentPage, pageSize, searchUid);
        setBanks(banksData);
        setPageCount(banksData.pageCount);
      } catch (error) {
        console.error("Failed to load banks data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanks();
  }, [currentPage, pageSize, searchUid]);

  const handleDeleteBank = async (uid) => {
    try {
      await deleteBank(uid);
      setBanks((prevBanks) => {
        return {
          ...prevBanks,
          data: prevBanks.data.filter((bank) => bank.uid !== uid),
        };
      });
      console.log("Banco eliminado con éxito.");
    } catch (error) {
      console.error("Error eliminando el banco:", error);
    }
  };

  const handleEditBank = (uid) => {
    const bankToEdit = banks.data.find((bank) => bank.uid === uid);
    if (!bankToEdit) {
      console.log("Banco no encontrado");
      return;
    }

    navigate("/Formulario", { state: bankToEdit });
  };

  return (
    <ContainerListaFormulario>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SearchContainer
            searchUid={searchUid}
            setSearchUid={setSearchUid}
            setCurrentPage={setCurrentPage}
          />
          <div className="contenedor-lista-formulario">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>UID</TableHeader>
                  <TableHeader>Número de Cuenta</TableHeader>
                  <TableHeader>Nombre del Banco</TableHeader>
                  <TableHeader>IBAN</TableHeader>
                  <TableHeader>Numero de enrutamiento</TableHeader>
                  <TableHeader>Swift_bic</TableHeader>
                  <TableHeader>Fecha de creación</TableHeader>
                  <TableHeader>Acción</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {banks.data?.map((bank, index) => (
                  <TableRow key={index}>
                    <TableCell>{bank.uid}</TableCell>
                    <TableCell>{bank.account_number}</TableCell>
                    <TableCell>{bank.bank_name}</TableCell>
                    <TableCell>{bank.iban}</TableCell>
                    <TableCell>{bank.routing_number}</TableCell>
                    <TableCell>{bank.swift_bic}</TableCell>
                    <TableCell>{bank.created}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <DeleteConfirmationAlert
                          uid={bank.uid}
                          onDeleteConfirmed={handleDeleteBank}
                        />
                        <EditButton
                          uid={bank.uid}
                          onEditClicked={handleEditBank}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <PaginacionTabla
              currentPage={currentPage}
              totalPages={pageCount}
              onChangePage={setCurrentPage}
            />
          </div>
        </>
      )}
    </ContainerListaFormulario>
  );
};

export default ListaFormulario;
