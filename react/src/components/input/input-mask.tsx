/* eslint-disable react/no-children-prop */
/* eslint-disable no-param-reassign */
import React, { forwardRef, useCallback } from 'react'
import {
  InputLeftElement,
  InputRightElement,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { FormFactory, FormFactoryProps } from 'components/form'
import { Input } from 'components/input'
import { phoneFormatter } from 'utils/functions'

type InputCurrencyProps = Omit<ChakraInputProps, 'type'> & {
  mask: string
  prefix?: React.ReactNode
  sufix?: React.ReactNode
  error?: string
}

function formatter(value: string) {
  return {
    phone: phoneFormatter(value),
  }
}

function maxLength() {
  return {
    phone: 15,
  }
}

const InputElement = forwardRef<
  HTMLInputElement,
  FormFactoryProps<InputCurrencyProps>
>(({ mask, prefix, sufix, error, ...props }, ref) => {
  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if ((maxLength() as any)[mask]) {
        event.currentTarget.maxLength = (maxLength() as any)[mask]
      }
      const { value } = event.currentTarget
      event.currentTarget.value = (formatter(value) as any)[mask]
    },
    []
  )

  return (
    <>
      {prefix && (
        <InputLeftElement
          pointerEvents="none"
          children={prefix}
          fontSize="1.2em"
          color="gray.50"
          mt="0.2rem"
        />
      )}
      <Input ref={ref} error={error} onKeyUp={handleKeyUp} {...props} />
      {sufix && (
        <InputRightElement
          pointerEvents="none"
          fontSize="1.2em"
          children={sufix}
          color="gray.50"
          mt="0.2rem"
        />
      )}
    </>
  )
})

InputElement.displayName = 'InputMask'

const InputMask = FormFactory(InputElement, 'InputMask')

export default InputMask
