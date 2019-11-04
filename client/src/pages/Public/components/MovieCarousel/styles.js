export default theme => ({
  container: {
    display: 'flex',
    alignItems: 'baseline'
  },
  h2: {
    fontSize: '2rem',
    color: theme.palette.common.white,
    margin: theme.spacing(3),
    textTransform: 'capitalize'
  },
  button: {},
  carousel: {
    width: '85%',
    height: '100%',
    margin: 'auto'
  },
  arrow: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 60,
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,.5)',
    color: theme.palette.common.white,
    zIndex: 1,
    '&.prevArrow': {
      left: 0,
      justifyContent: 'flex-start',
      background:
        ' linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,37,0) 100%)',
      opacity: ({ currentSlide }) => (currentSlide ? 1 : 0)
    },
    '&.nextArrow': {
      right: 0,
      justifyContent: 'flex-end',
      background:
        ' linear-gradient(90deg, rgba(0,0,37,0) 0%, rgba(0,0,0,1) 100%)',
      opacity: ({ currentSlide, slideCount }) =>
        currentSlide === slideCount ? 0 : 1
    }
  },

  slider: { '& .slick-slide': { padding: theme.spacing(1) } }
});
