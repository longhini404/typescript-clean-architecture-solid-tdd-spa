import React, { ReactNode } from 'react'
import {
  Text as ChackraText,
  TextProps as ChackraTextProps,
} from '@chakra-ui/react'

type Role = 'title' | 'normal' | 'dark'

type TextProps = ChackraTextProps & {
  gRole?: Role
  children: ReactNode
}

type RoleProps = {
  color: string
  fontSize?: string
  fontWeight?: string
}

type RolePredefinedProps = {
  [key in Role]: RoleProps
}

const rolePredefinedProps: RolePredefinedProps = {
  title: {
    color: 'gray.50',
    fontSize: 'xl',
  },
  normal: {
    color: 'gray.200',
  },
  dark: {
    color: 'gray.400',
  },
}

const Text = ({ gRole, children, ...props }: TextProps) => {
  const roleProps = gRole ? rolePredefinedProps[gRole] : {}
  return (
    <ChackraText {...roleProps} {...props}>
      {children}
    </ChackraText>
  )
}

export default Text
