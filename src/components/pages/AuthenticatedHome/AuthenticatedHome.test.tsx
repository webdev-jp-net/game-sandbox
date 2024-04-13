import { Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { store } from 'store'

import { AuthenticatedHome } from './AuthenticatedHome'
const history = createMemoryHistory()

describe('AuthenticatedHome', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('AuthenticatedHomeのスナップショット', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <AuthenticatedHome />
        </Router>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
