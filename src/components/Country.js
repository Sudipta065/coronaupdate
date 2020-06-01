import React from 'react';

class Country extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CountryData: [],
      valueOf: null,
      recoveredP: null,
      confirmedP: null,
      deathsP: null
    };
  }

  componentDidMount() {
    fetch('https://covid19.mathdro.id/api/countries')
      .then((result) => result.json())
      .then((dataOfCountry) => {
        this.setState({ CountryData: dataOfCountry.countries });
      });
  }

  handleChange = (event) => {
    this.fetchCountryData(event.target.value);
  };

  fetchCountryData = async (cName) => {
    const respon = await fetch(
      `https://covid19.mathdro.id/api/countries/${cName}`
    ).then((res) => res.json());

    console.log(respon);
    this.setState({
      recoveredP: respon.recovered.value,
      confirmedP: respon.confirmed.value,
      deathsP: respon.deaths.value
    });
    //this.setState({recovered: respon.confirmed.value})
  };

  render() {
    const { CountryData, recoveredP, confirmedP, deathsP } = this.state;

    return (
      <div className='country-data'>
        <div className='select-div'>
          <div className='concon'>Please Select A Country</div>
          <select
            className='selectoption'
            value={this.state.value}
            onChange={this.handleChange}
          >
            {CountryData.map((country) => {
              return (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='country-value'>
          <div className='country-card'>
            <p>Confirmed </p> <p>{confirmedP} </p>
          </div>
          <div className='country-card'>
            <p>Recovered </p> <p>{recoveredP} </p>
          </div>
          <div className='country-card'>
            <p>Death </p>
            <p>{deathsP} </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Country;
