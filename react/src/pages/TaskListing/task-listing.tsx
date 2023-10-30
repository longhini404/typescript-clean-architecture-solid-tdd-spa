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
  Input,
} from '@chakra-ui/react'
import { Tasks } from 'domain/models'
import { Button } from 'components/button'
import { useHistory } from 'react-router-dom'
import { dateTimeFormatter } from 'utils/functions'

type TaskListingProps = {
  deleteTask: DeleteTask
  readTasks: ReadTasks
  toast: Toast
}

const TaskListing = ({ readTasks, deleteTask, toast }: TaskListingProps) => {
  const history = useHistory()
  const [getTasks, setTasks] = useState<Tasks>()
  const [searchTitle, setSearchTitle] = useState('')

  const handleEdit = (id: number) => {
    history.push(`/cadastrar-tarefas?id=${id}`)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask.delete(id)
      toast.success({
        message: 'Tarefa deletada com sucesso',
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

  const filteredTasks = getTasks?.tasks.filter(task => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase())
    return titleMatch
  })

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
      <Flex mb="1rem">
        <Input
          type="text"
          value={searchTitle}
          placeholder="Buscar"
          onChange={e => setSearchTitle(e.target.value)}
        />
      </Flex>
      {filteredTasks?.length === 0 ? (
        <Text>Nenhum tarefa cadastrado.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Descrição</Th>
              <Th>Data & Hora</Th>
              <Th>Duração</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTasks?.map(task => (
              <Tr key={task.id}>
                <Td>{task.title}</Td>
                <Td>{task.description}</Td>
                <Td>{dateTimeFormatter(task.dateTime)}</Td>
                <Td>{dateTimeFormatter(task.duration)}</Td>
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
