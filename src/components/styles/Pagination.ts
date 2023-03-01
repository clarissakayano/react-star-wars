import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  color: black;
  font: normal normal bold 22px/27px Lato;

  li {
    list-style: none;

    a {
      display: inline-block;
      border: solid 1px #ccc;
      background-color: #f4e426;
      padding: 10px 20px;
      border-radius: 3px;
      margin: 0 5px;
      color: black;
      text-decoration: none;
    }

    &.selected a {
      background-color: white;
      color: black;
      border: none;

      &:hover {
        color: red;
      }
    }
  }
`;
