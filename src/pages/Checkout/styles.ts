import styled from 'styled-components';

export const BgColor = styled.div`
  background-color: #282a36;

  span,
  label {
    font-family: 'adobe-clean', sans-serif;
    font-weight: 700;
  }

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
    font-family: normal normal bold 15px/30px Lato;
    border-radius: 5px;
  }
  input {
    background-color: #333333;
    margin-top: 6px;
    margin-bottom: 6px;
    border: none;
    color: white;
    ::shadow {
      color: #282a36;
    }
  }
`;

interface IButtonCredit {
  active: string;
}

export const ButtonCredit = styled.button<IButtonCredit>`
  background: ${({ active }) => (active === 'credit' ? '#F4E426' : '#cccccc')}
    0% 0% no-repeat padding-box;
  padding: 10px;
  width: 100%;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
`;

interface IButtonBank {
  active: string;
}

export const ButtonBank = styled.button<IButtonBank>`
  background: ${({ active }) => (active === 'bank' ? '#F4E426' : '#cccccc')} 0%
    0% no-repeat padding-box;
  padding: 10px;
  width: 100%;
  font-weight: 500;
  border: none;
  color: #000;
  border-radius: 5px;
  opacity: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
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
  padding: 15px;

  input {
    background-color: #333333;
    border-radius: 5px;
  }
`;

export const Title = styled.h2`
  color: white;
`;

export const Subtitle = styled.h3`
  color: #f4e426;
  text-align: left;
  font-family: normal normal bold 22px/27px Helvetica Neue;
  font-size: 22px;
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

export const TextSub = styled.h3`
  font-size: 14px;
  font-family: 'adobe-clean', sans-serif;
  color: #707070;
  padding-top: 15px;
`;

export const BtnBg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  font-weight: 500;
  background-color: #f4e426;
  border-radius: 5px;
  opacity: 1;
  color: #000;
  border: none;
  &:hover {
    background-color: #f4ce26;
  }
  /* unvisited link */
  a:link {
    color: black;
    text-decoration: none;
  }

  /* visited link */
  a:visited {
    color: black;
  }
`;

export const Error = styled.p`
  color: white;
`;
