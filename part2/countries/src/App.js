import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = ({data}) => {
  return (
    <div>
      <h1>{data[0].name.common}</h1>
      capital {data[0].capital}<br />
      population {data[0].population}
      <h2>languages</h2>
      {/* get array of languages keys then make a list of all its values*/}
      {Object.keys(data[0].languages).map(key => <li key={key}>{data[0].languages[key]}</li>)}
      <br />
      <img src={data[0].flags.png} />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect( () => {
    axios
    .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // get elements whose .name.common match some of the input 
        const matches = response.data.filter(elem => {
          if(elem.name.common.includes(country))
            return true
        })
        if(matches.length > 10)
          setCountries("Too many matches, please specify another filter")
        else if(matches.length === 1)
          setCountries(<Country data={matches}/>)
        else
          setCountries(matches.map(c => <li key={c.name.common}>{c.name.common}</li>))
      })
  // When values in this item change, this hook will run
  }, [country])

  //if user types in the input
  const writingCountry = (event) => {
    setCountry(event.target.value)
  }
  return (
    <div>
      find countries <input onChange={writingCountry}/>
      <br/>
      {countries}
    </div>
  )
}

export default App;
