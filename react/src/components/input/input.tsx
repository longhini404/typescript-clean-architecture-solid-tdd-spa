import React, { forwardRef } from 'react'
import {
  Input as ChackraInput,
  InputProps as ChackraInputProps,
  Box,
} from '@chakra-ui/react'
import { FormFactory } from 'components/form'
import { InputError } from 'components/input'

type InputProps = ChackraInputProps & {
  name: string
  error?: string
}

const InputElement = forwardRef<HTMLInputElement, InputProps>(
  ({ name, error, ...props }, ref) => {
    return (
      <>
        <ChackraInput
          id={name}
          ref={ref}
          {...props}
          name={name}
          bg="gray.800"
          color="gray.50"
          _focus={{
            border: '0.125rem solid white',
          }}
          _hover={{
            borderColor: 'white',
          }}
        />
        {error ? <InputError>{error}</InputError> : <Box h="1.625rem" />}
      </>
    )
  }
)

InputElement.displayName = 'InputElement'

const Input = FormFactory(InputElement, 'Input')

export default Input
