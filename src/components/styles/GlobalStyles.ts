import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

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
