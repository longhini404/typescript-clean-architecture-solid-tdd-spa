import React from 'react'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Link, Spacer } from '@chakra-ui/react'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { getLoadingInfo } from 'core/store/modules/auth/selector'
import { Authentication as AuthenticationModel } from 'domain/models'
import { Authentication } from 'domain/interfaces/authentication'
import { Link as ReactLink } from 'react-router-dom'

const schema = yup.object().shape({
  login: yup.string().required('Required'),
  password: yup.string().required('Required'),
})

type LoginProps = {
  authentication: Authentication
}

const Login = ({ authentication }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationModel>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })
  const { isLoading } = useSelector(getLoadingInfo)

  const onSubmit: SubmitHandler<AuthenticationModel> = async ({
    login,
    password,
  }) => {
    authentication.auth({ login, password })
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
      w={{ base: '30rem' }}
      justifyContent="center"
    >
      <Flex
        as="form"
        maxW="28rem"
        direction="column"
        alignItems="center"
        w={{ base: '100%' }}
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          mt="2rem"
          type="email"
          placeholder="E-mail"
          data-testid="login-input"
          error={errors.login?.message}
          {...register('login')}
        />
        <Spacer my="1rem" />
        <Input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          error={errors.password?.message}
          {...register('password')}
        />
        <Flex display="column" w="100%">
          <Button
            my="2rem"
            h="3.375rem"
            type="submit"
            color="white"
            w={{ base: '100%' }}
            disabled={isLoading}
            isLoading={isLoading}
            data-testid="submit-button"
            backgroundColor="gray.500"
            _hover={{
              filter: 'brightness(1.1)',
              transition: '0.2s',
            }}
          >
            Login
          </Button>
          <Link
            to="/sign-up"
            color="white"
            as={ReactLink}
            fontWeight="500"
            _hover={{
              filter: 'brightness(1.1)',
              transition: '0.2s',
            }}
          >
            <Flex direction="row">Sign up</Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
