import React from 'react'

const Countries = (props) => {
  const tooMany = props.countries.length > 10

  return (
    <div>
      {tooMany 
        ? (<p>too many matches, specify another filter</p>)
        : (props.countries.map(country => (
            <p key={country} onClick={props.handleClick}>
              {country}
            </p>))
          )}
    </div>
  )
}

export default Countries