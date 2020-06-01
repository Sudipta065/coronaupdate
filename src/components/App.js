import React from 'react';
import Country from './Country';
import './ddd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('https://covid19.mathdro.id/api/')
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            data: data
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { data, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className='ui active inverted dimmer'>
          <div className='ui text loader'>Please Wait...</div>
        </div>
      );
    } else {
      return (
        <div className='main-container'>
          <h1 className='heading'>Corona Virus Update</h1>
          <div className='data-container'>
            <div className='world-data'>
              <div className='global-card'>
                <p> Confirmed Cases In Total</p>
                <p>{data.confirmed.value}</p>
              </div>
              <div className='global-card'>
                <p> Recovered So Far</p>
                <p>{data.recovered.value}</p>
                <p>
                  (
                  {(
                    (data.recovered.value / data.confirmed.value) *
                    100
                  ).toFixed(2)}
                  %)
                </p>
              </div>
              <div className='global-card'>
                <p>Deaths In Total </p> <p>{data.deaths.value}</p>
                <p>
                  (
                  {((data.deaths.value / data.confirmed.value) * 100).toFixed(
                    2
                  )}
                  %)
                </p>
              </div>
            </div>
            <Country />
          </div>
        </div>
      );
    }
  }
}
export default App;
/*
  componentDidMount = () => {
  
      .then((response) => response.json())
      .then((data) => {
        (data) => {
          this.setState({ isLoaded: true, data: data.confirmed });
          console.log(this.state);
        },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          };
      });
  };

  render = () => {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>{data.confirmed}
        </ul>
      );
  };
}



// Note: it's important to handle errors here
// instead of a catch() block so that we don't swallow

// instead of a catch() block so that we don't swallow
// exceptions from actual bugs in components.
*/
