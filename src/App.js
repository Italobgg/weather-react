import { useState } from 'react';

function App() { 
    const [city, setCity] = useState("");
    const [weatherForecast, setWeatherForecast] = useState(null)
    const handleChange = (e) => {
      setCity(e.target.value)
    }
    const handleSearch = () => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=6061646d973d4eff9b6201745220302&q=${city}&lang=pt`)
      .then((response) => {
        if(response.status === 200){
          return response.json()
        }
      })
      .then((data) => {
        setWeatherForecast(data)
      });
    };
  
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand text-white" href="/">
            Como esta o clima ?
        </a>
      </nav>

      <main className="container"> 
        <div className="jumbotron " >
          <h1 className="row md-6">
            Verifique agora a previsão do tempo da sua cidade
          </h1>
          
          <p className="lead row md-6">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
          </p>
          <div className="row mb-4">
            <div className="row mb-6">
              <input 
              onChange={handleChange}
              className="form-control" 
              value={city}></input>
            </div>
          </div>
        </div>

        <button onClick={handleSearch} className="row mb-4 btn btn-primary btn-lg">
          Pesquisar
        </button>

        {
          weatherForecast ? (
            <div>
            <div className="mt -4 d-flex align-items-center font">
              <div>
                <img src={weatherForecast.current.condition.icon}/>
              </div>
              <div>
                <h3>hoje o dia esta de: {weatherForecast.current.condition.text}</h3>
                <p>
                  <b>Região: </b>{weatherForecast.location.region}
                </p>
                <p>
                  <b>Cidade: </b> {weatherForecast.location.name}
                </p>
                <p>
                  <b>Temp: </b> {weatherForecast.current.temp_c}°C
                </p>
              </div>
            </div>
          </div>
          ) : null
        }
      </main>
    </div>
  );
}


export default App;
