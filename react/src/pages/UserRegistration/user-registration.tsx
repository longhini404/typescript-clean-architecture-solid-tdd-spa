import React, { memo } from 'react'
import { Flex, HStack, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Select } from 'components/select'
import { Button } from 'components/button'
import { Input, InputMask, InputPassword } from 'components/input'
import { UserRegistration as UserRegistrationInterface } from 'domain/interfaces/user'
import { Toast } from 'domain/interfaces/toast'
import { notEmptyCell } from 'utils/functions'
import { User } from 'domain/models'

const schema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup
    .string()
    .required('Please enter an email')
    .email('Please enter a valid email.'),
  cellphone: yup
    .string()
    .required('Please enter a mobile number.')
    .test('phone', 'Please enter a valid number.', value =>
      notEmptyCell(value || '')
    ),
  password: yup.string().required('Please enter a password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

type UserRegistrationProps = {
  userRegistration: UserRegistrationInterface
  toast: Toast
}

type Inputs = User & {
  confirmPassword: string
}

const UserRegistration = ({
  userRegistration,
  toast,
}: UserRegistrationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Inputs>({ mode: 'onSubmit', resolver: yupResolver(schema) })
  const gender = [
    { id: 'M', value: 'Male' },
    { id: 'F', value: 'Female' },
    { id: 'O', value: 'Other' },
  ]

  const onSubmit: SubmitHandler<Inputs> = async user => {
    try {
      await userRegistration.create(user)
      toast.success({ message: 'User registered successfully', duration: 5000 })
    } catch (error: any) {
      toast.error({
        message:
          'An error occurred while registering the user. Please try again.',
        duration: 5000,
      })
    }
  }

  return (
    <Flex
      p="2rem"
      m="4rem"
      bg="gray.600"
      boxShadow="md"
      borderRadius={5}
      direction="column"
      alignItems="center"
      textColor="gray.700"
      justifyContent="center"
    >
      <Flex
        as="form"
        direction="column"
        alignItems="center"
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex align="flex-start" direction="column">
          <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
            <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
              <Input
                placeholder="Name"
                data-testid="name-input"
                error={errors.name?.message}
                {...register('name')}
              />
            </Flex>
            <Flex flex={1} minW="13.75rem">
              <Input
                placeholder="E-mail"
                data-testid="email-input"
                error={errors.email?.message}
                {...register('email')}
              />
            </Flex>
          </Flex>
          <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
            <Flex flex={1} mr={{ base: '0', sm: '0.5rem' }} minW="13.75rem">
              <InputPassword
                placeholder="Password"
                formLabelProps={{ fontSize: 'sm' }}
                data-testid="password-input"
                error={errors.password?.message}
                {...register('password')}
              />
            </Flex>
            <Flex flex={1} mr={{ base: '0', sm: '0.5rem' }} minW="13.75rem">
              <InputPassword
                placeholder="Confirm password"
                formLabelProps={{ fontSize: 'sm' }}
                data-testid="confirm-password-input"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </Flex>
            <Flex flex={1} minW="13.75rem">
              <InputMask
                mask="phone"
                placeholder="Phone"
                data-testid="cellphone-input"
                error={errors.cellphone?.message}
                {...register('cellphone')}
              />
            </Flex>
          </Flex>
          <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
            <HStack spacing={2} w="100%">
              <Select
                options={gender}
                data-testid="gender-select"
                {...register('gender')}
              />
            </HStack>
          </Flex>
          <Flex
            w="100%"
            alignItems="center"
            justify="space-between"
            data-testid="buttons-flexbox"
          >
            <Link
              to="/"
              as={ReactLink}
              fontWeight="500"
              color="gray.500"
              _hover={{
                filter: 'brightness(1.1)',
                transition: '0.2s',
              }}
            >
              <Flex direction="row">Back</Flex>
            </Link>

            <Button
              type="submit"
              isLoading={isSubmitting}
              data-testid="submit-button"
              disabled={!isDirty || isSubmitting}
              backgroundColor="gray.600"
              _hover={{
                filter: 'brightness(1.1)',
                transition: '0.2s',
              }}
              color="white"
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(UserRegistration)
