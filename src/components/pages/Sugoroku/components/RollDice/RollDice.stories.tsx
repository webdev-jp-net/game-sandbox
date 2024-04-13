// import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { RollDice } from './RollDice'

export default {
  title: 'parts/RollDice',
  component: RollDice,
} as Meta

export const Basic: StoryObj<typeof RollDice> = {
  args: {
    children: 'children',
  },
}
