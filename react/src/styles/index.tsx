import 'react-toastify/dist/ReactToastify.css'
import { extendTheme } from '@chakra-ui/react'
import { breakpoints } from './custom'

const globalStyles = {
  body: {
    color: 'gray.400',
    fontFamily: 'Roboto',
    overflowX: 'hidden',
    backgroundColor: 'gray.800',
  },
}

export const theme = extendTheme({
  breakpoints,
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
  styles: { global: globalStyles },
})
