import React, { Component } from "react";
import axios from "axios";
import Input from "../components/SearchBar/Input";
import { Div, Error, DivResult } from "./Styles";
import Result from "../components/ResultBox/ResultBox";
import Load from "../components/Loading/Loading";

// File added in gitignore
import headers from "../api/api";

// https://servicodados.ibge.gov.br/api/v1/localidades/municipios/{NomeCidade}
// http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-municipio?mesAno={202006}&codigoIbge={3132206}&pagina=1

//Documentação
//http://www.portaltransparencia.gov.br/swagger-ui.html#!/Aux237lio32emergencial/auxilioEmergencialPorMunicipioUsingGET

//São Paulo === sao-paulo

class App extends Component {
  state = {
    city: null,
    benefited: 0,
    reais: 0,
    cityCode: null,
    error: false,
    errorInRequest: 0,
  };

  searchBenefitedByMonth = (setMonth, cityCode) => {
    const url = `https://cors-anywhere.herokuapp.com/http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-municipio?mesAno=${setMonth}&codigoIbge=${cityCode}&pagina=1`;

    axios
      .get(url, { headers })
      .then((res) => {
        let benefitedInThatMonth = res.data[0].quantidadeBeneficiados;
        let benefited = this.state.benefited + benefitedInThatMonth;

        let reaisInThatMonth = res.data[0].valor;
        let reais = this.state.reais + reaisInThatMonth;

        console.log("Reais", res.data[0].valor);
        console.log("Beneficiados", res.data[0].quantidadeBeneficiados);

        this.setState({
          benefited,
          reais,
        });
      })
      .catch((err) => {
        // Não existem dados dos meses 06 e 07
        // Logo, 2 erros de tipo não encontrado podem ser ignorados
        let errorRequest = this.state.errorInRequest;

        this.setState({
          errorInRequest: errorRequest + 1,
        });

        if (errorRequest > 2) {
          this.setState({
            error: true,
          });
        }
      });
  };

  requestBenefited = () => {
    const months = ["202004", "202005", "202006", "202007"];
    const cityCode = this.state.cityCode;

    for (var i = 0; i < months.length; i++) {
      this.searchBenefitedByMonth(months[i], cityCode);
    }
  };

  searchCityCode = () => {
    let city = this.state.city;

    if (city !== null) {
      city = this.clearString(city);
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`;

      axios
        .get(url)
        .then((result) => {
          // Se não retornar um array vazio, fazer request
          if (result.data.length !== 0) {
            if (this.state.error) {
              this.setState({ error: false });
            }

            this.setState({
              cityCode: result.data.id,
              errorInRequest: 0,
            });

            this.requestBenefited();
          } else {
            this.setState({
              error: true,
            });
          }
        })
        .catch((error) => {
          this.setState({
            error: true,
          });
        });

      // Reset pra não acumular
      this.setState({
        benefited: 0,
        reais: 0,
      });
    }
  };

  changed = (e) => {
    const city = e.target.value;

    this.setState({
      city,
    });
  };

  clearString = (text) => {
    const invalidChars = "áàãâéèêëìíîïóõòôùúûü";
    const validChars = "aaaaeeeeiiiioooouuuu";

    var replacedString = text.toLowerCase().replace(/ /g, "-");

    for (var i = 0; i < invalidChars.length; i++) {
      replacedString = replacedString.replace(invalidChars[i], validChars[i]);
    }

    return replacedString;
  };

  loading = null;

  render() {
    return (
      <Div>
        {this.state.error ? <Error>Cidade não encontrada</Error> : null}

        <Input changed={(e) => this.changed(e)} search={this.searchCityCode} />

        <Load
          show={this.state.benefited === 0 && this.state.cityCode !== null}
        />

        <DivResult show={this.state.benefited > 0}>
          <Result
            icon="fas fa-users"
            title="Total de beneficiados:"
            data={this.state.benefited}
          />

          <Result
            icon="fas fa-coins"
            title="Reais distribuídos:"
            data={this.state.reais.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          />

          <Result
            icon="fas fa-venus"
            title="Chefes de família:"
            data={(this.state.reais - this.state.benefited * 600) / 600}
          />
        </DivResult>
      </Div>
    );
  }
}

export default App;
