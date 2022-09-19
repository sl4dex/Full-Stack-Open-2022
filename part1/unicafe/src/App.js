import { useState } from 'react'

const Statistics = (props) => {
  // destructuring 
  const [good, neutral, bad] = props.feedback
  const all = good+neutral+bad
  return(
    <>
      <h1>statistics</h1>
      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad} <br/>
        all {all} <br/>
        average {(good-bad)/all} <br/>
        positive {(good/all) * 100 + " %"}
      </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics feedback={[good, neutral, bad]}/>
    </div>
  )
}

export default App