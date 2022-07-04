import React from "react";
import { BsSearch, BsHeart } from 'react-icons/bs'
import api from './services/api';
import "./style.css";

import Card from './components/Card';

export default function App() {

  //OBS: Na linha 92 do seu codigo faltando um 'ClassName'

  //Na declaração dos estados, não é uma boa pratica criar um estado para cada valor, que vc vai receber, o correto seria ter um só com o 'data'
  //Isso porque o cada estado faz uma nova renderização da pagina toda vez que ele é alterado, ai no caso ficaria com varias renderizações, so na abertura da pagina. 
  //Do jeit que eu fiz, criando um estado chamado 'Country', é uma solucação alternativa, mas ela não é a melhor, normalmente fazemos tudo direto no 'data' mesmo, mas desse jeito, tenho crtz que vao considerar uma boa solução
  // Ja que no seu caso, tinham algumas regrinhas de negocio, que faziam vc buscar do Json um comparativo, para entao dar o nome do pais. 

  // encapsulamento de variáveis
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();

  const [data, setData] = React.useState({});
  const [countryData, setCountryData] = React.useState({})

  const [countries, setCountries] = React.useState([]);
  const [nameCountries, setNameCountries] = React.useState([]);
  const [valid, setValid] = React.useState({});

  React.useEffect(() => {
    fetch('./countries.json', {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json())
      .then(res => setCountries(res))
  }, []);
  //Nesse useEffect, não se esqueça de adicionar as [], se não ele vai fazer as chamadas da api eternamente,
  //porque o useEffetc, precisa ser de declarado, 'quando vc quer que ocorra a chamada', 
  //No caso, dessa forma, deixando vazio vc diz que ele deve ser iniciado, sempre que for carregada a pagina (1 unica vez). 

  // função para buscar o nome
  async function handleSearch() {
    if (input === '') {
      alert('Informe um nome');
      return;
    }
    try {
      const responseApi = await api.get(`?name=${input}`);
      setData(responseApi.data)
      // variáveis dos países com maior probabilidade
      const nameCountryApi = responseApi.data.country[0].country_id;

      for (let country of countries.countries) {
        if (nameCountryApi === country.code) {
          setCountryData({
            nameOfCountry: country.name,
            probability: responseApi.data.country[0].probability.toFixed(2) * 100,
            flag: `https://countryflagsapi.com/png/${nameCountryApi.toLowerCase()}`
          })

        }
      }
      setInput('');
    } catch (err) {
      console.log('err', err)
      setInput('');
    }
    setValid(0);
  }

  // função que lista os três países com maior probabilidade
  async function listCountries() {
    setValid(data);
    const vetorCountries = [];
    for (let country of data.country) {
      let nameOfCountry = country.country_id
      for (let country of countries.countries) {
        if (nameOfCountry === country.code) {
          vetorCountries.push(country.name);
          setNameCountries(vetorCountries);
        }
      }
    }
    inputElement.current.focus(); // mantém o foco no input
  }

  return (
    <div className="area-search">
      <h1 className="title mt-5 mb-3">Origin of Name</h1>
      <div className="input-group containerInput">
        <input ref={inputElement} type="text" className="form-control" placeholder="Digite seu nome" value={input} onChange={({ target }) => setInput(target.value)} />
        <button type="button" className="bg-color buttonSearch" data-bs-toggle="tooltip" data-bs-placement="top" title="Pesquisar" onClick={handleSearch}>
          <BsSearch size={25} color="FFF" />
        </button>
      </div>
      <p className="footer text-muted small">Created with <BsHeart /> by Cléo Silva</p>

      <div className="card-group">
        {console.log('FINAL', countryData)}
        {Object.keys(data).length > 0 && ( // Verifica se há dados para serem mostrados
          <Card
            title={`Nome: ${data.name}`}
            nameCountry={countryData.nameOfCountry}
            probability={countryData.probability.toFixed(0)}
            flagCountry={countryData.flag}
            PressButon={listCountries}
          />
        )}
        {Object.keys(valid).length > 0 && (
          <Card
            typeCard='listCountriesCard'
            title='PAÍSES DE ORIGEM:'
            listNameContries={nameCountries}
            dataCountry={data.country}
          />
        )}
      </div>
    </div>
  );
}

