import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const CardVehicle = styled(Card)`
  background-color: black;
  color: white;
  table {
    border: none;
  }
  td,
  th {
    border: none;
    font-family: 'adobe-clean', sans-serif;
    font-weight: 100;
  }
  td {
    text-align: end;
    font-family: 'adobe-clean', sans-serif;
    font-weight: 100;
  }
  th {
  }
  Table {
    color: white;
    font-family: 'adobe-clean', sans-serif;
    font-weight: 100;
  }
`;

export const Title = styled.span`
  color: yellow;
  font-size: 20px;
  text-align: start;
  border-style: none;
  font-family: 'adobe-clean', sans-serif;
  font-weight: 700;
  a:link {
    color: red;
    text-decoration: none;
  }

  a:visited {
    color: red;
  }

  a:hover {
    color: green;
  }
`;

export const Text1 = styled.h3`
  font-size: 12px;
  color: #525252;
  text-align: start;
`;
