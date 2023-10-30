import React, { memo } from 'react'
import { Text } from 'components/text'

type InputErrorProps = {
  children: string | undefined
}

const InputError = ({ children }: InputErrorProps) => (
  <Text fontSize="xs" color="red.400" pl="1" mt="2">
    {children}
  </Text>
)

export default memo(InputError)
