import React, { memo } from 'react'
import { Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signOut } from 'core/store/modules/auth/actions'
import { Button } from 'components/button'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleTasksListing = () => {
    history.push('/listar-tarefas')
  }

  const handleTasksRegistration = () => {
    history.push('/cadastrar-tarefas')
  }

  return (
    <Flex
      alignItems="center"
      p="0.625rem 1.25rem"
      borderBottom="0.125rem solid gray.600"
      bgGradient="linear(to-r, gray.800, gray.700, gray.600)"
    >
      <Button
        mx="0.5rem"
        variant="outline"
        colorScheme="white"
        onClick={handleTasksRegistration}
      >
        Cadastrar Tarefa
      </Button>
      <Button
        mx="0.5rem"
        variant="outline"
        colorScheme="white"
        onClick={handleTasksListing}
      >
        Listar Tarefas
      </Button>
      <Button
        onClick={() => dispatch(signOut())}
        colorScheme="white"
        variant="outline"
        ml="auto"
      >
        Sair
      </Button>
    </Flex>
  )
}

export default memo(Header)
