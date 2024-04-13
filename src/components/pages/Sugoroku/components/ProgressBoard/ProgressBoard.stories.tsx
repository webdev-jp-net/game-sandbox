import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBoard } from './ProgressBoard'

export default {
  title: 'parts/ProgressBoard',
  component: ProgressBoard,
} as Meta

export const Basic: StoryObj<typeof ProgressBoard> = {
  args: {},
}
