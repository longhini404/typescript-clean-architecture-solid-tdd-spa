import React, { memo, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text } from 'components/text'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { CreateTask, ReadTasks, UpdateTask } from 'domain/interfaces/tasks'
import { Toast } from 'domain/interfaces/toast'
import { Task } from 'domain/models'
import { Link, useHistory } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  dateTime: yup.string().required('Required'),
  duration: yup.string().required('Required'),
})

type TaskRegistrationProps = {
  createTask: CreateTask
  readTasks: ReadTasks
  updateTask: UpdateTask
  toast: Toast
  id?: number
}

const TaskRegistration = ({
  createTask,
  readTasks,
  updateTask,
  toast,
  id,
}: TaskRegistrationProps) => {
  const history = useHistory()
  const [getTask, setTask] = useState<Task>()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Task>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  if (id) {
    const fetchTask = async (idTask: number) => {
      try {
        const task = await readTasks.read(idTask)
        setTask(task as Task)
      } catch (error) {
        toast.error({
          message: 'Erro ao buscar tarefa.',
        })
      }
    }

    if (getTask) {
      setValue('title', getTask.title)
      setValue('description', getTask.description)
      setValue('dateTime', getTask.dateTime)
      setValue('duration', getTask.duration)
    }

    useEffect(() => {
      fetchTask(id)
    }, [])
  }

  const onSubmit: SubmitHandler<Task> = async task => {
    try {
      if (id) {
        await updateTask.update(id, task)
        toast.success({
          message: 'Tarefa atualizado com sucesso',
          duration: 5000,
        })
      } else {
        await createTask.create(task)
        toast.success({
          message: 'Tarefa cadastrado com sucesso',
          duration: 5000,
        })
      }
      history.push('/listar-tarefas')
    } catch (error: any) {
      toast.error({
        message: 'Erro ao cadastrar o tarefa.',
        duration: 5000,
      })
    }
  }

  return (
    <Flex
      pt="4rem"
      as="form"
      direction="column"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="task-registration-form"
    >
      <Flex direction="column" align="center">
        <Flex
          mb="24"
          w="80vw"
          boxShadow="base"
          borderRadius={5}
          bgColor="gray.700"
          direction="column"
        >
          <Text gRole="title" ml="1rem" my="1rem">
            Cadastrar Tarefa
          </Text>
          <Flex align="flex-start" direction="column" p="1rem">
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Título"
                  data-testid="title-input"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Descrição"
                  data-testid="description-input"
                  error={errors.description?.message}
                  {...register('description')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Data e Hora"
                  data-testid="dateTime-input"
                  error={errors.dateTime?.message}
                  {...register('dateTime')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Duração"
                  data-testid="duration-input"
                  error={errors.duration?.message}
                  {...register('duration')}
                />
              </Flex>
            </Flex>
            <Flex
              w="100%"
              mb="1rem"
              alignItems="center"
              justify="space-between"
              data-testid="buttons-flexbox"
            >
              <Link to="/listar-tarefas">
                <Button
                  h="3.25rem"
                  backgroundColor="gray.600"
                  _hover={{
                    filter: 'brightness(1.1)',
                    transition: '0.2s',
                  }}
                  color="white"
                >
                  Voltar
                </Button>
              </Link>
              <Button
                h="3.25rem"
                type="submit"
                color="white"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                backgroundColor="gray.600"
                data-testid="submit-button"
                _hover={{
                  filter: 'brightness(1.1)',
                  transition: '0.2s',
                }}
              >
                Cadastrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(TaskRegistration)
