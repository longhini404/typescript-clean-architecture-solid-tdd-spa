import React, { memo, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text } from 'components/text'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { CreateTag, ReadTags, UpdateTag } from 'domain/interfaces/tags'
import { Toast } from 'domain/interfaces/toast'
import { Tag } from 'domain/models'
import { Link, useHistory } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Required'),
})

type TagRegistrationProps = {
  createTag: CreateTag
  readTags: ReadTags
  updateTag: UpdateTag
  toast: Toast
  id?: number
}

const TagRegistration = ({
  createTag,
  readTags,
  updateTag,
  toast,
  id,
}: TagRegistrationProps) => {
  const history = useHistory()
  const [getTag, setTag] = useState<Tag>()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Tag>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  if (id) {
    const fetchTag = async (idTag: number) => {
      try {
        const tag = await readTags.read(idTag)
        setTag(tag as Tag)
      } catch (error) {
        toast.error({
          message: 'Erro ao buscar tag.',
        })
      }
    }

    if (getTag) {
      setValue('title', getTag.title)
    }

    useEffect(() => {
      fetchTag(id)
    }, [])
  }

  const onSubmit: SubmitHandler<Tag> = async tag => {
    try {
      if (id) {
        await updateTag.update(id, tag)
        toast.success({
          message: 'Tag atualizada com sucesso',
          duration: 5000,
        })
        history.push('/listar-tags')
      } else {
        await createTag.create(tag)
        toast.success({
          message: 'Tag cadastrada com sucesso',
          duration: 5000,
        })
        history.push('/listar-tags')
      }
    } catch (error: any) {
      toast.error({
        message: 'Erro ao cadastrar a tag.',
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
      data-testid="tag-registration-form"
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
            Cadastrar Tag
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
            </Flex>
            <Flex
              w="100%"
              mb="1rem"
              alignItems="center"
              justify="space-between"
              data-testid="buttons-flexbox"
            >
              <Link to="/listar-tags">
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

export default memo(TagRegistration)
