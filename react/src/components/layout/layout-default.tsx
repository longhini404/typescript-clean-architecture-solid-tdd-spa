import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Container } from 'components/container'

type LayoutDefaultProps = {
  children: JSX.Element | JSX.Element[]
}

const LayoutDefault = ({ children }: LayoutDefaultProps) => (
  <Flex direction="row" justifyContent="center">
    <Flex bg="gray.800" direction="column" alignItems="center">
      <Container>
        <Flex as="main" w="full">
          {children}
        </Flex>
      </Container>
    </Flex>
  </Flex>
)

export default LayoutDefault
