import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBoard } from './ProgressBoard'

export default {
  title: 'parts/ProgressBoard',
  component: ProgressBoard,
} as Meta

export const Basic: StoryObj<typeof ProgressBoard> = {
  args: {
    course: [
      {
        event: null,
      },
      {
        event: {
          checkIn: false,
        },
      },
      {
        event: {
          checkIn: true,
        },
      },
      {
        event: null,
      },
      {
        event: {
          checkIn: false,
        },
      },
      {
        event: {
          checkIn: true,
        },
      },
      {
        event: {
          checkIn: true,
        },
      },
      {
        event: {
          checkIn: true,
        },
      },
      {
        event: null,
      },
      {
        event: {
          checkIn: false,
        },
      },
      {
        event: {
          checkIn: false,
        },
      },
      {
        event: null,
      },
    ],
    fieldStep: 10,
    currentStep: 0,
  },
}
