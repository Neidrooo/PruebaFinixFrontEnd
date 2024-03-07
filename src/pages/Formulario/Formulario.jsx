import styled from "styled-components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputForm from "../../components/StyledComponents/InputForm";
import { createBank, updateBankName } from "../../services/fetchBanks";
import {
  ButtonForm,
  ButtonContainer,
} from "../../components/StyledComponents/ButtonForm";

import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
const ContainerFormulario = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  .contenedor-formulario-portada {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    hr {
      width: 100%;
      border: 1px solid rgba(204, 204, 204, 1);
      background: rgba(204, 204, 204, 1);

      margin-top: -88px;
    }
    .contenedor-formulario {
      width: 60%;
      h2 {
        font-size: 30px;
        font-weight: 600;
        color: rgba(25, 25, 25, 1);
      }
      p {
        font-size: 18px;
        font-weight: 400;
        color: rgba(25, 25, 25, 1);
      }
      h3 {
        color: rgba(12, 12, 12, 1);
        font-size: 20px;
      }
      .formulario-parte-1 {
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
      }
      .formulario-parte-2 {
        width: 100%;
        justify-content: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
      }
    }
  }
  @media (max-width: 700px) {
    .contenedor-formulario-portada {
      hr {
        margin-top: -31px;
      }
      .contenedor-formulario {
        width: 85%;
        button {
          width: 80%;
          display: block;
          margin: 0 auto;
          margin-top: 20px;
        }
        p {
          text-align: justify;
        }
        .formulario-parte-1 {
          grid-template-columns: 1fr;
        }
        .formulario-parte-2 {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;
const schema = Yup.object().shape({
  uid: Yup.string().required("El UID es requerido"),
  account_number: Yup.string().required("El número de cuenta es requerido"),
  bank_name: Yup.string().required("El nombre del banco es requerido"),
  iban: Yup.string().required("El IBAN es requerido"),
  routing_number: Yup.string().required(
    "El número de enrutamiento es requerido"
  ),
  swift_bic: Yup.string().required("El SWIFT/BIC es requerido"),
});

const defaultValues = {
  uid: "",
  account_number: "",
  bank_name: "",
  iban: "",
  routing_number: "",
  swift_bic: "",
};

const Formulario = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = !!location.state;
  const methods = useForm({
    defaultValues: isEditing ? location.state : defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = methods;
  const onSubmit = async (data) => {
    if (isEditing) {
      if (data.bank_name === location.state.bank_name) {
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: "No se ha modificado el nombre del banco.",
        });
        return; // Salir de la función onSubmit si no hay cambios
      }
      // Editando banco
      try {
        await updateBankName(data.uid, data.bank_name);
        Swal.fire({
          icon: "success",
          title: "¡Editado exitosamente!",
          text: "El nombre del banco ha sido actualizado exitosamente.",
        }).then((result) => {
          if (result.isConfirmed || result.dismiss) {
            navigate("/");
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al conectar con el servidor, intente más tarde.",
        });
        console.error("Error editando el banco:", error);
      }
    } else {
      try {
        const response = await createBank(data);
        Swal.fire({
          icon: "success",
          title: "¡Creado exitosamente!",
          text: "El banco ha sido creado exitosamente.",
        }).then((result) => {
          if (result.isConfirmed || result.dismiss) {
            reset();
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al conectar con el servidor, intente más tarde.",
        });
        console.error("Error creando el banco:", error);
      }
    }
  };
  useEffect(() => {
    if (!location.state) {
      methods.reset(defaultValues);
    }
  }, [location.state, methods]);
  useEffect(() => {
    if (location.state) {
      Object.keys(location.state).forEach((key) => {
        methods.setValue(key, location.state[key]);
      });
    }
  }, [location.state, methods]);
  const bankNameWatch = watch("bank_name");
  return (
    <ContainerFormulario>
      <div className="contenedor-formulario-portada ">
        <div className="centrar-elementos-portada">
          <h1>
            Crear nuevo <strong>banco</strong>
          </h1>
        </div>
        <div className="contenedor-formulario">
          {isEditing && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Solo puedes editar el nombre del banco.
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="formulario-parte-1">
                <Controller
                  name="uid"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="UID"
                      disabled={isEditing}
                      {...field}
                      error={errors.uid}
                    />
                  )}
                />

                <Controller
                  name="account_number"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Número de Cuenta"
                      {...field}
                      disabled={isEditing}
                      error={errors.account_number}
                    />
                  )}
                />

                <Controller
                  name="bank_name"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Nombre del Banco"
                      {...field}
                      error={errors.bank_name}
                    />
                  )}
                />
                <Controller
                  name="iban"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="IBAN"
                      {...field}
                      disabled={isEditing}
                      error={errors.iban}
                    />
                  )}
                />
              </div>
              <div className="formulario-parte-2">
                <Controller
                  name="routing_number"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Numero de Enrutamiento"
                      {...field}
                      disabled={isEditing}
                      error={errors.routing_number}
                    />
                  )}
                />

                <Controller
                  name="swift_bic"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="SWIFT/BIC"
                      {...field}
                      disabled={isEditing}
                      error={errors.swift_bic}
                    />
                  )}
                />
              </div>
              <ButtonContainer>
                <ButtonForm type="button" onClick={() => navigate("/")}>
                  Volver
                </ButtonForm>
                <ButtonForm type="submit">
                  {isEditing ? "Editar" : "Crear"}
                </ButtonForm>
              </ButtonContainer>
            </form>
          </FormProvider>
        </div>
      </div>
    </ContainerFormulario>
  );
};

export default Formulario;
