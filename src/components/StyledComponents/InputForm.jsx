import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  position: absolute;
  top: -7px;
  left: 14px;
  padding: 0 5px;
  background: #fff;
  color: ${(props) => (props.$hasError ? "#ff7f7f" : "##333333")};
  font-size: 12px;

  &::after {
    content: "${(props) => (props.required ? "  *" : "")}";
    color: #f00;
  }
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  height: Hug (56px);
  padding: 16px;
  border: 2px solid ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  border-radius: 8px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  }

  &:focus + ${Label} {
    color: ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  }
`;
const StyledSelect = styled.select`
  width: ${(props) => props.width || "100%"};
  height: 56px;
  padding: 16px;
  border: 2px solid ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  border-radius: 8px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  }

  &:focus + Label {
    color: ${(props) => (props.$hasError ? "#ff7f7f" : "#cccccc")};
  }
`;
const ErrorMessage = styled.p`
  color: #c22e2e;
  font-size: 15px;
  margin-top: 8px;
  margin-left: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 16px 0;
`;

const StyledInputForm = forwardRef(
  ({ error, label, required, as, width, colSpan = 1, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setHasError(!!error);
    }, [error]);
    return (
      <InputWrapper style={{ gridColumn: `span ${colSpan}` }}>
        {as === "select" ? (
          <StyledSelect
            $hasError={hasError}
            ref={ref}
            width={width}
            {...props}
          />
        ) : (
          <StyledInput
            $hasError={hasError}
            ref={ref}
            width={width}
            {...props}
          />
        )}

        <strong>
          <Label $hasError={hasError} required={required}>
            {label}
          </Label>
        </strong>
        {hasError && <ErrorMessage>{error?.message}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

export default StyledInputForm;
