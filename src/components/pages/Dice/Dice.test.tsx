import { Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { store } from 'store'

import { Dice } from './Dice'
const history = createMemoryHistory()

describe('Dice', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('Diceのスナップショット', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Dice />
        </Router>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
