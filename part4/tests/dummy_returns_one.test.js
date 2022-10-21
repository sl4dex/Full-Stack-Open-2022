// Jest espera por defecto que los nombres de los archivos de
// prueba contengan .test.

const listHelper = require('../utils/list_helper')

const myList = [{
  'title': 'IA y como no te va a dejar sin trabajo',
  'author': 'sl4dex',
  'url': 'https://abc',
  'likes': 0
},
{
  'title': 'C Compilation',
  'author': 'Salvador D',
  'url': 'https://www.linkedin.com/pulse/c-compilation-salvador-d-/',
  'likes': 3
},
{
  'title': 'Recursion',
  'author': 'Salvador D',
  'url': 'https://www.linkedin.com/pulse/recursion-salvador-diaz/',
  'likes': 5
},
{
  'title': 'What happens when you type google.com in your browser and press Enter',
  'author': 'Salvador D',
  'url': 'https://www.linkedin.com/pulse/what-happens-when-you-type-googlecom-your-browser-press-salvador-diaz/',
  'likes': 2
},
{
  'title': 'lol',
  'author': 'unnamed',
  'url': 'https://abc',
  'likes': 0
}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// usamos describe cuando queremos agrupar varios test
describe('total likes', () => {
  test('list of blogs', () => {
    const result = listHelper.getTotalLikes(myList)
    expect(result).toBe(10)
  })
  test('single blog', () => {
    expect(myList[0].likes).toBe(0)
  })
  test('empty list', () => {
    const list2 = []
    expect(list2.length).toBe(0)
  })
})

describe('most liked blog', () => {
  test('list of blogs', () => {
    const result = listHelper.getFavBlog(myList)
    expect(result).toEqual(5)
  })
})

test('author with most blogs', () => {
  const result = listHelper.moreBlogs(myList)
  expect(result.blogs).toEqual(3)
})

test('author with most likes', () => {
  const result = listHelper.mostLikes(myList)
  expect(result.likes).toEqual(10)
})