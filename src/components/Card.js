import React from 'react';

//O React é baseado em componentes, então é bem interessante, vc criar componentes de coisas que podem ser reutilizadas no seu código. com/
//Assim voce comprova conhecimento em 'Propriedades', que é uma base no React, além de deixar o codigo final bem separado, menor e de facil entendimento.

//No caso, tlvz tenha ficado um pouco confuso, mas eu usei o mesmo 'card', porque eles tem uma base de cabeçalho e corpo e mudei só o conteudo do 'card-body'
//Para isso, eu usei um ternario, se o tipo for igual a 'listCountriesCard', mostre o card de 'Paises de origem', caso contrario o de 'Nome'. represemtado por: ' valor1 === valor2 ? (faça_isso) : (faça isso) '
const Card = ({ title, nameCountry, probability, PressButon, flagCountry, typeCard, listNameContries, dataCountry, funcao }) => {
  return (
    <div className='main m-4'>
      <div className="card shadow-lg bg-card">
        <h5 className="card-header text-center bg-header">{title}</h5>

        {
          typeCard === 'listCountriesCard' ? (
            <div className="card-body countries gap-5 d-flex">
              <span className='text-center d-block'>
                {listNameContries.map((country, key) => (
                  <p className='d-flex text-uppercase' key={key}>{country}</p>
                ))}
              </span>
              <span className='text-center d-block'>
                {dataCountry.map(country => (
                  <p className="card-text mx-auto">{(country.probability.toFixed(2) * 100).toFixed(0)}% </p>
                ))}
              </span>
            </div>
          ) : (
            <div className="card-body p-4">
              <h5 className="card-title">Maior probablidade de origem: <p className='text-center mt-2 mb-0 text-uppercase text-success'>{nameCountry}</p></h5>
              <div className='mb-4 d-flex justify-content-center'>
                <img src={`${flagCountry}`} width="35" alt="flag" />
              </div>
              <p className="card-text text-center ">A probabilidade é de <span className='fw-bold'>{probability}% </span></p>
              <div className=' d-flex justify-content-center'>
                <button className="btn-fancy" data-bs-toggle="tooltip" data-bs-placement="top" title="3 países mais prováveis"
                  onClick={PressButon}><span>Outros países de origem</span></button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Card;
