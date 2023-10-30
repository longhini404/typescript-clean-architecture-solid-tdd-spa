import React, { forwardRef, useState } from 'react'
import {
  InputProps as ChackraInputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { ViewIcon } from 'assets/icons/viewicon'
import { ViewOffIcon } from 'assets/icons/viewofficon'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { FormFactory } from 'components/form'

type InputProps = Omit<ChackraInputProps, 'type'> & {
  name: string
  error?: string
}

const InputElement = forwardRef<HTMLInputElement, InputProps>(
  ({ name, error, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
      <>
        <Input
          name={name}
          id={name}
          error={error}
          ref={ref}
          type={show ? 'text' : 'password'}
          {...props}
        />
        <InputRightElement
          h="3.375rem"
          b="0"
          alignItems="flex-start"
          zIndex="0"
        >
          <Button
            variant="auxiliary.transparent"
            border="0"
            h="full"
            alignItems="center"
            onClick={handleClick}
          >
            {show ? (
              <ViewIcon data-testid="view-on" />
            ) : (
              <ViewOffIcon data-testid="view-off" />
            )}
          </Button>
        </InputRightElement>
      </>
    )
  }
)

InputElement.displayName = 'InputElement'

const InputPassword = FormFactory(InputElement, 'InputPassword')

export default InputPassword
