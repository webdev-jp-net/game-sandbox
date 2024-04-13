import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'button/Button',
  component: Button,
} as Meta

export const Basic: StoryObj<typeof Button> = {
  args: {
    children: 'ボタン',
    variant: 'basic',
    onClick: action('click'),
    type: 'button',
    disabled: false,
  },
}
