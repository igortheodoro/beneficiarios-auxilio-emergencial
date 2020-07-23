import React, { Component } from "react";
import axios from "axios";
import Input from "../components/SearchBar/Input";
import { Div, Error, DivResult } from "./Styles";
import Result from "../components/ResultBox/ResultBox";

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
    beneficiaries: 0,
    cityCode: null,
    error: false,
    errorInRequest: 0,
  };

  searchBeneficiariesByMonth = (setMonth, cityCode) => {
    const url = `https://cors-anywhere.herokuapp.com/http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-municipio?mesAno=${setMonth}&codigoIbge=${cityCode}&pagina=1`;

    axios
      .get(url, { headers })
      .then((res) => {
        let beneficiariesInThatMonth = res.data[0].quantidadeBeneficiados;
        let beneficiaries = this.state.beneficiaries + beneficiariesInThatMonth;

        this.setState({
          beneficiaries,
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

  requestBeneficiaries = () => {
    const months = ["202004", "202005", "202006", "202007"];
    const cityCode = this.state.cityCode;

    for (var i = 0; i < months.length; i++) {
      this.searchBeneficiariesByMonth(months[i], cityCode);
    }
  };

  searchCityCode = () => {
    const city = this.clearString(this.state.city);
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

          this.requestBeneficiaries();
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

    // Reset o número de beneficiados pra não acumular
    this.setState({
      beneficiaries: 0,
    });
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

  render() {
    return (
      <Div>
        {this.state.error ? <Error>Cidade não encontrada</Error> : null}

        <Input changed={(e) => this.changed(e)} search={this.searchCityCode} />

        <DivResult show={this.state.beneficiaries > 0}>
          <Result
            icon="fas fa-users"
            title="Total de beneficiados:"
            data={this.state.beneficiaries}
          />
        </DivResult>
      </Div>
    );
  }
}

export default App;
