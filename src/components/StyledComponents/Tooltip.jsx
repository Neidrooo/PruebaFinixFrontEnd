import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  display: inline-block;
`;

const TooltipText = styled.span.attrs((props) => ({
  style: {
    visibility: props.isVisible ? "visible" : "hidden",
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  /* Estilos del tooltip */

  max-width: 160px;
  background-color: #212121;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;

  position: fixed;
  z-index: 1000;
  transform: translateX(-12%) translateY(-100%);

  &::after {
    content: "";
    position: absolute;
    left: 30px;
    top: 100%;
    transform: translateX(-10px) translateY(0);
    border-width: 5px;
    border-style: solid;
    border-color: #212121 transparent transparent transparent;
  }

  /* Transiciones para el efecto de aparición */
  transition: opacity 0.3s, visibility 0.3s;
`;

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setTooltipCoords({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <TooltipContainer
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipText
        isVisible={isVisible}
        x={tooltipCoords.x}
        y={tooltipCoords.y - 10}
      >
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
