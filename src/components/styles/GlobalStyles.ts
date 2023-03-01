import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
html, body #root {
    min-height: 100vh;
}


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

//bootstrap overrides
.card {
    background-color: black;
}

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
export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
