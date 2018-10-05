import React from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'
import Country from './components/Country.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      countriesToShow: []
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }


  filterCountries = (filter) => {
    if (filter.length === 0) {
      return []
    }
    else {
      return (
        this.state.countries
          .filter(country => country.name
            .toLowerCase()
            .includes(filter.toLowerCase()))
      )
    }
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value,
      countriesToShow: this.filterCountries(event.target.value)})
  }

  handleCountryClick = (event) => {
    const country = []
    country.push(this.state.countries.find(country => country.name === event.target.innerHTML))
    this.setState({countriesToShow: country})
  }

  render() {
    const foundMatch = this.state.countriesToShow.length === 1

    return (
      <div>
        <Filter filter={this.state.filter} onChange={this.handleFilterChange} />
        {foundMatch 
          ? (<Country country={this.state.countriesToShow[0]} />)
          : (<Countries 
                countries={this.state.countriesToShow.map(country => country.name)} 
                handleClick={this.handleCountryClick}
              />)}
      </div>
    )
  }

}

export default App;
