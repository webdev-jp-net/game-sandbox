import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBoard } from './ProgressBoard'

export default {
  title: 'parts/ProgressBoard',
  component: ProgressBoard,
} as Meta

export const Basic: StoryObj<typeof ProgressBoard> = {
  args: {
    fieldStep: 10,
    currentStep: 0,
    fieldEvent: new Set([0, 1, 2, 3, 5, 6, 7, 8]),
  },
}
