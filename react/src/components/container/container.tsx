import React, { memo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

const Container = ({ children, ...rest }: BoxProps) => (
  <Box
    maxW={{
      base: 'full',
      sm: '42rem',
      md: '60rem',
      lg: '90rem',
      xl: '100rem',
      xxl: '160rem',
    }}
    w="full"
    {...rest}
  >
    {children}
  </Box>
)

export default memo(Container)
