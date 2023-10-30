import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'domain/interfaces/toast'
import { DeleteTask, ReadTasks } from 'domain/interfaces/tasks'
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Tasks } from 'domain/models'
import { Button } from 'components/button'
import { useHistory } from 'react-router-dom'

type TaskListingProps = {
  deleteTask: DeleteTask
  readTasks: ReadTasks
  toast: Toast
}

const TaskListing = ({ readTasks, deleteTask, toast }: TaskListingProps) => {
  const history = useHistory()
  const [getTasks, setTasks] = useState<Tasks>()

  const handleEdit = (id: number) => {
    history.push(`/cadastrar-tarefas?id=${id}`)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask.delete(id)
      toast.success({
        message: 'Tarefa deletado com sucesso',
        duration: 5000,
      })
      fetchTasks()
    } catch (error) {
      toast.error({
        message: 'Erro ao deletar tarefa.',
        duration: 5000,
      })
    }
  }

  const fetchTasks = async () => {
    try {
      const tasks = await readTasks.read()
      setTasks(tasks as Tasks)
    } catch (error) {
      toast.error({
        message: 'Erro ao listar tarefas.',
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <Box
      w="80%"
      p="2rem"
      m="4rem"
      mx="auto"
      bg="gray.700"
      boxShadow="md"
      borderRadius="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2rem">
        Listar Tarefas
      </Text>
      {getTasks?.tasks.length === 0 ? (
        <Text>Nenhum tarefa cadastrado.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Título</Th>
              <Th>Descrição</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getTasks?.tasks.map(task => (
              <Tr key={task.id}>
                <Td>{task.id}</Td>
                <Td>{task.title}</Td>
                <Td>{task.description}</Td>
                <Td>
                  <Flex flexDirection="column">
                    <Button onClick={() => handleEdit(task.id)} my="0.25rem">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(task.id)} my="0.25rem">
                      Deletar
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

export default memo(TaskListing)
