import { Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { store } from 'store'

import { Sugoroku } from './Sugoroku'
const history = createMemoryHistory()

describe('Sugoroku', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('Sugorokuのスナップショット', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Sugoroku />
        </Router>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
