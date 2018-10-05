import React from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt={country.demonym} width="300" />
    </div>
  )
}

export default Country