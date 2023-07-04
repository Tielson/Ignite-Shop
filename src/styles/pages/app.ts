import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  minHeight: '100vh',

  '.hide': {
    right: '-600px',
    transition: '1s',
    opacity: 0.6,
  },

  '.buttonClose': {
    position: 'relative',
    left: '366px',
    bottom: '30px',
    lineHeight: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',

    svg: {
      height: '1.5rem',
      width: '1.5rem',
      color: '#8D8D99',
    },
  },
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  lineHeight: 0,
})

export const CartItems = styled('header', {
  transition: '1s',
  width: '30rem',
  height: '100%',
  position: 'fixed',
  zIndex: 111,
  background: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',
  right: 0,
  padding: '4.5rem 3rem 3rem ',

  h2: {
    fontSize: '1.25rem',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '160%',
  },
})

export const CartButton = styled('button', {
  display: 'flex',
  height: '3rem',
  width: '3rem',

  padding: '0.75rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',

  borderRadius: ' 0.375rem',
  background: '  $gray800',
  cursor: 'pointer',
  border: 'none',

  svg: {
    color: '$white',
    height: '1.5rem',
    width: '1.5rem',
    position: 'absolute',
  },

  p: {
    position: 'relative',
    borderRadius: '100%',
    background: '$green300',

    width: '1.5rem',
    height: '1.5rem',

    top: '-23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: '-23px',
  },
})

export const ItensContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: ' flex-start',
  marginTop: '2rem',

  height: '30rem',
  overflow: 'auto',
})

export const ProductApp = styled('div', {
  display: 'flex',
  gap: '1.125rem',
  padding: '1rem',
  lineHeight: 0,
  width: '100%',
  justifyContent: 'flex-start',

  '.boxImg': {
    width: '6rem',
    height: '6rem',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
      objectFit: 'cover',
    },
  },

  '.boxData': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    button: {
      cursor: 'pointer',
      background: 'none',
      border: 'none',

      '&:hover': {
        color: '$green500',
      },
    },
  },

  h1: {
    fontSize: '1.125rem',
    fontWeight: '400',
    lineHeight: '160%',
  },

  p: {
    fontSize: '1.125rem',
    fontWeight: '700',
    lineHeight: '160%',
  },

  button: {
    color: '$green300',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '160%',
  },

  '&:hover': {
    lineHeight: 0,
    background: '$gray900',
    padding: '1rem',
    borderRadius: '.5rem',
  },
})

export const ValueQuantity = styled('div', {
  paddingTop: '6rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    h2: {
      fontSize: '1rem;',
      fontWeight: '400',
      lineHeight: '160%',
    },

    p: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '160%',
      color: '$gray300',
    },

    h1: {
      fontSize: '1.125rem',
      fontWeight: '700',
      lineHeight: '160%',
    },
  },
})

export const CheckoutButton = styled('button', {
  marginTop: '1rem',
  display: 'flex',
  width: '24rem',
  padding: '1.25rem 2rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.625rem',
  border: 'none',

  borderRadius: '0.5rem',
  background: '$green300',

  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: '160%',
  color: '$white',
  cursor: 'pointer',

  '&:hover': {
    background: '$green500',
  },
})
