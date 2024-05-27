import { render, screen } from '@testing-library/react'
import Home from '../../pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../app/store'

jest.mock('../../utils/dmart-api', () => ({
  fetchProductList: jest.fn(() => ({
    products: [
      {
        _id: '1',
        name: 'Test Product 1',
        slug: 'test_product_1',
        description: 'test product 1',
        price: 10,
        quantity: 1,
      },
      {
        _id: '2',
        name: 'Test Product 2',
        slug: 'test_product_2',
        description: 'test product 2',
        price: 10,
        quantity: 1,
      },
    ],
  })),

  fetchFilteredProducts: jest.fn(() => ({
    products: [
      {
        _id: '1',
        name: 'Test Product 1',
        slug: 'test_product_1',
        description: 'test product 1',
        price: 10,
        quantity: 1,
      },
    ],
  })),
}))

const testIds = {
  homeTitle: 'home-title',
}

describe('Home', () => {
  it('renders products', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    )

    const homeTitle = screen.getByTestId(testIds.homeTitle)
    expect(homeTitle).toHaveTextContent('All Products')
  })
})
