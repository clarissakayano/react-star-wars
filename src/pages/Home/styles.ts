import styled from 'styled-components';

export const BgColor = styled.div`
  background-color: #282a36;
  margin-top: -30px;

  .clear {
    background-color: red;
  }

  .button {
    display: flex;
    background-color: #f4e426;
    font-size: 20px;
    border-radius: 5px;
    top: 403px;
    left: 967px;
    width: 230px;
    height: 40px;
    margin-top: 15px;
  }

  .clearbutton {
    display: flex;
    background-color: red;
    color: white;
    font-size: 20px;
    border-radius: 5px;
    top: 403px;
    left: 967px;
    padding: 4px;
    margin-top: 15px;
  }

  .notfound {
    color: white;
    font-size: 20px;
  }
`;

export const BgButton = styled.section`
  display: flex;
  background-color: black;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: -30px;
  z-index: 1;
`;
