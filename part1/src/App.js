const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.part} {props.ex}</p>
}

const Content = (props) => {
  console.log(props)
  return(
    <>
      <Part part={props.parts[0].name} ex={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} ex={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} ex={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.map(elem => total += elem.exercises)
  return <p>Number of exercises {total}</p>
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
    <Header course={course}/>
    <Content parts={parts}/>

    <Total parts={parts}/>
    </div>
  )
}

export default App
