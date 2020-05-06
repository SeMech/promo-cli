/** Sizes are mobile-first */

/** Pixels
 * [S,M): s width
 * [M,L): m width
 * [L,XL): l width
 * [XL,XXL): xl width
 * [XXL,XXML): xxl width
 * [XXML,XXXL): xxml width
 * [XXXL,+∞): xxxl width
 */
const Width = {
    S: 0,
    M: 768,
    L: 1024,
    XL: 1366,
    XXL: 1920,
    XXML: 2000,
    XXXL: 2560,
};

/** Must be between S and M. Minimal supported width */
const MIN_WIDTH = 320; // Pixels

const mediaWidth = Object.assign(
    {},
    ...Object.entries(Width).map(([key, value]) => ({ [key.toLowerCase()]: `@media (min-width: ${value}px)` })),
);

export { Width, MIN_WIDTH };
export default mediaWidth;
