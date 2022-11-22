import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'My new blog',
  author: 'Author 1',
  url: 'httpsss',
  likes: 1,
  user: { username: 'sl4dex' },
}
test('inital state shows only title and author', () => {
  const component = render(<Blog blog={blog} />)
  const initial = component.container.querySelector('.initial')
  expect(initial).toHaveTextContent('My new blog by Author 1')
  component.debug()
})

test('clicking the button calls event handler once', () => {
  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  fireEvent.click(button)
  const more = component.container.querySelector('.more-details')

  expect(more).toHaveTextContent('httpsss likes: 1 likesl4dex')
})

test('clicking like button two times', () => {
  const component = render(<Blog blog={blog} />)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  const more = component.container.querySelector('.more-details')

  expect(more).toHaveTextContent('likes: 3')
})
