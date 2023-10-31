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
import { dateTimeFormatter } from 'utils/functions'
import { Input } from 'components/input'
import { ReadTags } from 'domain/interfaces/tags'
import { ReactSelect } from 'components/select'

type TaskListingProps = {
  deleteTask: DeleteTask
  readTags: ReadTags
  readTasks: ReadTasks
  toast: Toast
}

const TaskListing = ({
  readTasks,
  readTags,
  deleteTask,
  toast,
}: TaskListingProps) => {
  const history = useHistory()

  const [getTags, setTags] = useState<any>([])
  const [getSelectedTags, setSelectedTags] = useState<any>([])

  const [getTasks, setTasks] = useState<Tasks>()
  const [searchTitle, setSearchTitle] = useState('')

  const handleEdit = (id: number) => {
    history.push(`/cadastrar-tarefa?id=${id}`)
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

  const fetchTags = async () => {
    try {
      const result = await readTags.read()

      if ('tags' in result) {
        const tags = result.tags.map(tag => ({
          label: tag.title,
          value: tag.id,
        }))
        setTags(tags)
      } else {
        toast.error({
          message: 'Erro ao buscar tags.',
        })
      }
    } catch (error) {
      toast.error({
        message: 'Erro ao buscar tags.',
      })
    }
  }

  useEffect(() => {
    fetchTags()
    fetchTasks()
  }, [])

  const filteredTasks = getTasks?.tasks.filter(task => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase())

    const taskTagIds = task.tags?.map(tag => tag.id) || []
    const selectedTagIds = getSelectedTags.map(
      (tag: { value: any }) => tag.value
    )

    const tagMatch = selectedTagIds.every((tagId: any) =>
      taskTagIds.includes(tagId)
    )

    return titleMatch && tagMatch
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
      <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
        <Input
          type="text"
          value={searchTitle}
          placeholder="Buscar"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearchTitle(e.target.value)
          }
        />
      </Flex>
      <Flex w="100%" ms="25%" mb="0.5rem" display="flex">
        <ReactSelect
          isMulti
          options={getTags}
          placeholder="Selecionar tags"
          handleSelection={(selectedValues: any) => {
            setSelectedTags(selectedValues)
          }}
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
              <Th>Tags</Th>
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
                  {task.tags && task.tags?.length > 0
                    ? task.tags.map(tag => tag.title).join(', ')
                    : 'Sem tag'}
                </Td>
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
