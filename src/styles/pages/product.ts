import { keyframes, styled } from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: 'auto',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,

  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: ' $white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWheight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const LoadingText = styled('div', {
  margin: '0 auto',
  maxWidth: 1180,

  p: {
    fontSize: '10rem',
    color: '$green500',
  },
})

const spinner = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

// Definindo o componente estilizado
export const LoadingSpinner = styled('div', {
  width: '200px',
  height: '200px',
  border: '10px solid #f3f3f3',
  borderTop: '10px solid #383636',
  borderRadius: '50%',
  animation: `${spinner} 1.5s linear infinite`,
})
