import React, { Component } from "react";
import axios from "axios";
import Input from "../components/SearchBar/Input";
import { Div } from "./Styles";

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
        this.setState({
          error: true,
        });
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
    const city = this.state.city;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`;

    axios
      .get(url)
      .then((result) => {
        this.setState({
          cityCode: result.data.id,
        });

        this.requestBeneficiaries();
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });

    // Change to 0 the number of beneficiaries
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

  render() {
    return (
      <Div>
        <Input changed={(e) => this.changed(e)} search={this.searchCityCode} />
        <h1 style={{ textAlign: "center" }}>{this.state.beneficiaries}</h1>
      </Div>
    );
  }
}

export default App;
