import styled from 'styled-components';

export const BgColor = styled.div`
  background-color: #282a36;

  .button {
    background-color: #f4e426;
    font-size: 20px;
  }
  .yellowbutton {
    background-color: #f4e426;
    font: normal normal bold 15px/30px Lato;
    border-radius: 5px;
  }
  .whitebutton {
    font: normal normal bold 15px/30px Lato;
    border-radius: 5px;
  }

  .paybutton {
    background-color: #f4e426;
    font: normal normal bold 15px/30px Lato;
    border-radius: 5px;
  }
  input {
    background-color: #333333;
  }
`;
export const FormCheck = styled.div`
  padding: 15px;

  input {
    background-color: #333333;
    border-radius: 5px;
  }
`;
interface IButtonCredit {
  active: string;
}

export const ButtonCredit = styled.button<IButtonCredit>`
  width: 100%;
  height: 40px;
  background: ${({ active }) =>
      active === 'creditCard' ? '#F4E426' : '#cccccc'}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;

interface IButtonTicket {
  active: string;
}

export const ButtonTicket = styled.button<IButtonTicket>`
  width: 100%;
  height: 40px;
  background: ${({ active }) => (active === 'ticket' ? '#F4E426' : '#cccccc')}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;

export const BgButton = styled.section`
  background-color: black;
  left: 139px;
  width: 1088px;
  height: 114px;
  z-index: 1;
`;

export const FormContainer = styled.div`
  background-color: black;
  border-radius: 5px;
  color: white;

  .bgsecundary {
    color: #333333;
  }
  .card-body {
    background-color: black;
  }
`;

export const Title = styled.h1`
  color: white;
`;

export const Subtitle = styled.h3`
  color: #f4e426;
  text-align: left;
  font: normal normal bold 22px/27px Helvetica Neue;
  padding-left: 15px;

  form {
    border: none;
  }
`;

export const FormVehicule = styled.div`
  background-color: black;
  color: white;
`;

export const TextInvalid = styled.h6`
  color: red;
`;

export const TextSub = styled.p`
  margin-top: 15px;
  padding-left: 10px;
  font: normal normal normal 14px/16px Helvetica Neue;
  color: #707070;
`;

export const BtnBg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #f4e426;
  border-radius: 5px;
  opacity: 1;
  color: #000;
  border: none;

  /* unvisited link */
  a:link {
    color: black;
    text-decoration: none;
  }

  /* visited link */
  a:visited {
    color: black;
  }

  /* mouse over link */
  a:hover {
    color: grey;
  }
`;
