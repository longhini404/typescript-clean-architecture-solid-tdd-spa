import React, { memo } from 'react'
import { Button as ChackraButton, ButtonProps } from '@chakra-ui/react'

const Button = ({ children, ...rest }: ButtonProps) => (
  <ChackraButton {...rest}>{children}</ChackraButton>
)

export default memo(Button)
