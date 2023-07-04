import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,

    strong: {
      textTransform: 'capitalize',
    },
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  position: 'relative',
  display: 'inline-block',
  width: '8.13594rem',
  height: '8.13594rem',
  background: 'linear-gradient(rgb(30, 164, 131) 0%, rgb(116, 101, 212) 100%)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  borderRadius: '100%',
  padding: '0.25244rem 0.307rem 0.19138rem 0.307rem',
  margin: '6.5rem 0 3rem',

  img: {
    objectFit: 'cover',
  },

  '&': {
    marginLeft: '-40px',
  },
})

export const DisplayImage = styled('div', {
  position: 'relative',
  left: '26px',
})
