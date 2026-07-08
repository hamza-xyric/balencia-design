import type { ComponentType } from 'react'
import { S09CiaChat } from './S09CiaChat'
import { S75DirectChat } from './S75DirectChat'

export const ciaScreens = {
  '09': S09CiaChat,
  '75': S75DirectChat,
} satisfies Record<string, ComponentType>
