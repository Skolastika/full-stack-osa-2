import React from 'react'
import Filter from './components/Filter.js'
import NewPerson from './components/NewPerson.js'
import Notification from './components/Notification.js'
import personService from './services/persons.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons: persons })
      })
  }

  // Add a person or change an existing number
  addPerson = (event) => {
    event.preventDefault()

    const person = this.state.persons
      .find(person => person.name === this.state.newName)
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    // No one found by this name, create a new entry
    if (person === undefined) {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            message: `Lisättiin ${newPerson.name}.`
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
    }
    // Person already exists, confirm number change
    else {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changedPerson = {...person, number: this.state.newNumber}
        const persons = this.state.persons.filter(p => p.id !== person.id)
        personService
          .update(person.id, changedPerson)
          .then(changedPerson => {
            this.setState({
              persons: persons.concat(changedPerson),
              newName: '',
              newNumber: '',
              message: `Päivitettiin henkilön ${changedPerson.name} numero.`
            })
            setTimeout(() => {
              this.setState({
                message: null
              })
            }, 5000)
          })
          .catch(error => {
            personService
            .create(personObject)
            .then(newChangedPerson => {
              this.setState({
                persons: persons.concat(newChangedPerson),
                newName: '',
                newNumber: ''
              })
            })
          })
      }
    }
  }

  removePerson = (id) => {
    return () => {
      const name = this.state.persons.find(person => person.id === id).name
      if (window.confirm(`Poistetaanko ${name}?`)) {
        personService
          .remove(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id),
              message: `Poistettiin ${name}.`
            })
            setTimeout(() => {
              this.setState({
                message: null
              })
            }, 5000)
          })
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.message} />
        <Filter filter={this.state.filter} onChange={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <NewPerson onSubmit={this.addPerson} 
                   newName={this.state.newName} 
                   newNumber={this.state.newNumber} 
                   onNameChange={this.handleNameChange} 
                   onNumberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons
              .filter(
                person => person.name
                  .toLowerCase()
                  .includes(this.state.filter.toLowerCase())
              )
              .map(person => 
                <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td><button onClick={this.removePerson(person.id)}>poista</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App