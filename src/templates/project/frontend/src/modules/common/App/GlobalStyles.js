import { createGlobalStyle } from 'styled-components';
import Fonts, { Font } from '../../../fonts';

const GlobalStyles = createGlobalStyle`
    ${Fonts}

    body {
        ${Font.FuturaRound};

        margin: 0;
    }
    
    html {
        box-sizing: border-box;
    }
    
    *, *:before, *:after {
        box-sizing: inherit;
    }
`;

export default GlobalStyles;
