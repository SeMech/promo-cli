import { css } from 'styled-components';

import futuraRound from './Futura/a_futuraround.ttf';
import futuraRoundBold from './Futura/a_futuraround-bold.ttf';

export const FontWeight = {
    THIN: css`font-weight: 100`,
    LIGHT: css`font-weight: 300`,
    REGULAR: css`font-weight: 400`,
    MEDIUM: css`font-weight: 500`,
    SEMIBOLD: css`font-weight: 600`,
    BOLD: css`font-weight: 700`,
    BLACK: css`font-weight: 900`,
};

const Font = {
    FuturaRound: css`
        font-family: FuturaRound, sans-serif;
    `,
};

const Fonts = css`
    @font-face {
        font-family: FuturaRound;
        src: url('${futuraRound}') format('opentype');
    }
    
    @font-face {
        font-family: FuturaRound;
        ${FontWeight.BOLD};
        src: url('${futuraRoundBold}') format('opentype');
    }
`;

export default Fonts;
export { Font };
