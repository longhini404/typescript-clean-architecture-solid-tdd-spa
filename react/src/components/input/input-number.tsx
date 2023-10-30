import React, { forwardRef } from 'react'
import { Box } from '@chakra-ui/react'
import { FormFactory } from 'components/form'
import { Input, InputError } from 'components/input'

type InputProps = {
  name: string
  minValue?: number
  maxValue?: number
  error?: string
}

const InputNumberElement = forwardRef<HTMLInputElement, InputProps>(
  ({ name, error, minValue, maxValue, ...props }, ref) => {
    return (
      <>
        <Input
          id={name}
          ref={ref}
          name={name}
          type="Number"
          min={minValue || 1}
          max={maxValue || 999999999}
          {...props}
        />
        {error ? <InputError>{error}</InputError> : <Box h="1.625rem" />}
      </>
    )
  }
)

InputNumberElement.displayName = 'InputNumberElement'

const InputNumber = FormFactory(InputNumberElement, 'InputNumber')

export default InputNumber
