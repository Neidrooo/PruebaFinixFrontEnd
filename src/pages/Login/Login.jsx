import styled from "styled-components";
import { Controller, useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledInputForm from "../../components/StyledComponents/InputForm";
import { ButtonForm } from "../../components/StyledComponents/ButtonForm";
import { loginAuth } from "../../services/AuthServices/";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Swal from "sweetalert2";
const ContainerLogin = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .center-items {
    width: 30%;
    margin-top: -128px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 70%;
    }
    .inputs-login {
      width: 100%;
      .boton-submit {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const Login = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("El email es requerido")
      .email("Email invalido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data) => {
    try {
      const result = await loginAuth(data.email, data.password);
      console.log(result);
      updateUser(result);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };
  return (
    <ContainerLogin>
      <div className="center-items">
        <img
          src="https://finix-group.com/wp-content/uploads/2022/02/fg-1.svg"
          alt="Logo finix"
        />
        <h1>Login</h1>
        <div className="inputs-login">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <StyledInputForm
                    label="Correo"
                    placeholder="Ingresar correo"
                    {...field}
                    error={error}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <StyledInputForm
                    label="Contraseña"
                    placeholder="Ingresar contraseña"
                    {...field}
                    type="password"
                    error={error}
                  />
                )}
              />
              <div className="boton-submit">
                <ButtonForm type="submit">Ingresar</ButtonForm>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </ContainerLogin>
  );
};
export default Login;
