import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  margin-left: auto; 
  margin-right: auto;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: 20px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
  text-align: center;
  color: #333;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    text-align: center;
  }
`;
export const TableHead = styled.thead`
  background-color: white; 
  color: rgba(25, 25, 25, 1);
`;

export const TableHeader = styled.th`
  border-bottom: 1px solid rgba(204, 204, 204, 1);
  text-align: center;
  padding-bottom: 20px;
  color: rgba(25, 25, 25, 1);
  font-size: 16px;
  font-weight: 600;
  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const Footer = styled.tfoot`
  width: 100%;
`;