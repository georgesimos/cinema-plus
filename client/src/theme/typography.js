import palette from './palette';

export default {
    useNextVariants: true,
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    h1: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '2rem',
        letterSpacing: '-0.24px',
        lineHeight: '2.5rem'
    },
    h2: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '1.875rem',
        letterSpacing: '-0.24px',
        lineHeight: '2rem'
    },
    h3: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '1.5rem',
        letterSpacing: '-0.06px',
        lineHeight: '1.8rem'
    },
    h4: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '1.25rem',
        letterSpacing: '-0.06px',
        lineHeight: '1.5rem'
    },
    h5: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '1rem',
        letterSpacing: '-0.05px',
        lineHeight: '1.125rem'
    },
    h6: {
        color: palette.text.primary,
        fontWeight: '500',
        fontSize: '0.875rem',
        letterSpacing: '-0.05px',
        lineHeight: '1.125rem'
    },
    subtitle1: {
        color: palette.text.primary,
        fontSize: '1rem',
        letterSpacing: '-0.05px',
        lineHeight: '1.5rem'
    },
    subtitle2: {
        color: palette.text.primary,
        fontSize: '0.875rem',
        letterSpacing: 0,
        lineHeight: '1rem'
    },
    body1: {
        color: palette.text.primary,
        fontSize: '0.875rem',
        letterSpacing: '-0.05px',
        lineHeight: '1.25rem'
    },
    body2: {
        color: palette.text.primary,
        fontSize: '0.75rem',
        letterSpacing: '-0.04px',
        lineHeight: '0.875rem'
    },
    button: {
        color: palette.text.primary,
        fontSize: '0.875rem'
    },
    caption: {
        color: palette.text.secondary,
        fontSize: '0.75rem',
        letterSpacing: '0.3px',
        lineHeight: '1rem'
    },
    overline: {
        color: palette.text.primary,
        fontSize: '0.75rem'
    }
};
