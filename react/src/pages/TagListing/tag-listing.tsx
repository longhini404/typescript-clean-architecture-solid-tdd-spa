import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'domain/interfaces/toast'
import { DeleteTag, ReadTags } from 'domain/interfaces/tags'
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
import { Tags } from 'domain/models'
import { Button } from 'components/button'
import { useHistory } from 'react-router-dom'
import { Input } from 'components/input'

type TagListingProps = {
  deleteTag: DeleteTag
  readTags: ReadTags
  toast: Toast
}

const TagListing = ({ readTags, deleteTag, toast }: TagListingProps) => {
  const history = useHistory()
  const [getTags, setTags] = useState<Tags>()
  const [searchTitle, setSearchTitle] = useState('')

  const handleEdit = (id: number) => {
    history.push(`/cadastrar-tag?id=${id}`)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTag.delete(id)
      toast.success({
        message: 'Tag deletada com sucesso',
        duration: 5000,
      })
      fetchTags()
    } catch (error) {
      toast.error({
        message: 'Erro ao deletar tag.',
        duration: 5000,
      })
    }
  }

  const fetchTags = async () => {
    try {
      const tags = await readTags.read()
      setTags(tags as Tags)
    } catch (error) {
      toast.error({
        message: 'Erro ao listar tags.',
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const filteredTags = getTags?.tags.filter(tag => {
    const titleMatch = tag.title
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
        Listar Tags
      </Text>
      <Flex mb="1rem">
        <Input
          type="text"
          value={searchTitle}
          placeholder="Buscar"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearchTitle(e.target.value)
          }
        />
      </Flex>
      {filteredTags?.length === 0 ? (
        <Text>Nenhuma tag cadastrada.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTags?.map(tag => (
              <Tr key={tag.id}>
                <Td>{tag.title}</Td>
                <Td>
                  <Flex flexDirection="column">
                    <Button onClick={() => handleEdit(tag.id)} my="0.25rem">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(tag.id)} my="0.25rem">
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

export default memo(TagListing)
