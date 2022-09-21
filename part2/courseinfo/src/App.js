const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({parts}) => {
  return (
    <>
      {/* Each child in a list should have a unique "key" prop. (in this case each Part) */}
      {parts.map(part => <Part key={part.id} part={part}/>)}

      {/* In this case acc will start at 0 and current will be parts[0].exercises, 
          sum them together and then carry the accumulated value to the next elements */}
      <b> total of {parts.reduce( (acc, current) => {
        return acc + current.exercises
        }, 0
      )} exercises </b>
    </>
  )
}

const Course = ({course}) => {
  return(
    <>
      <h1>{course.name}</h1>
      <Content parts={course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App