import React from 'react'

const NewPerson = (props) => {

  const addPerson = (event) => {
    event.preventDefault()
    props.onSubmit(event)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        nimi: <input value={props.newName} onChange={props.onNameChange} />
      </div>
      <div>
        numero: <input value={props.newNumber} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default NewPerson