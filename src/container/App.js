import React, { Component } from "react";
import axios from "axios";
import Input from "../components/SearchBar/Input";
import { Div, Error, DivResult, Img } from "./Styles";
import Result from "../components/ResultBox/ResultBox";
import Load from "../components/Loading/Loading";

// File added in gitignore
import headers from "../api/api";

class App extends Component {
  state = {
    city: null,
    benefited: [0, 0, 0, 0],
    reais: [0, 0, 0, 0],
    cityCode: null,
    error: false,
    errorInRequest: 0,
  };

  searchBenefitedByMonth = (setMonth, cityCode, month) => {
    const url = `https://cors-anywhere.herokuapp.com/http://www.portaltransparencia.gov.br/api-de-dados/auxilio-emergencial-por-municipio?mesAno=${setMonth}&codigoIbge=${cityCode}&pagina=1`;

    axios
      .get(url, { headers })
      .then((res) => {
        let benefitedInThatMonth = res.data[0].quantidadeBeneficiados;
        let benefited = this.state.benefited;
        benefited[month] = benefitedInThatMonth;

        let reaisInThatMonth = res.data[0].valor;
        let reais = this.state.reais;
        reais[month] = reaisInThatMonth;

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
      this.searchBenefitedByMonth(months[i], cityCode, i);
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
        benefited: [0, 0, 0, 0],
        reais: [0, 0, 0, 0],
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
    const invalidChars = "áàãâéèêëìíîïóõòôùúûüç";
    const validChars = "aaaaeeeeiiiioooouuuuc";

    var replacedString = text.toLowerCase().replace(/ /g, "-");

    for (var i = 0; i < invalidChars.length; i++) {
      replacedString = replacedString.replace(invalidChars[i], validChars[i]);
    }

    return replacedString;
  };

  loading = null;

  render() {
    return (
      <Div centralized={this.state.benefited[0] === 0}>
        <Img
          src={require("../assets/undraw-search.svg")}
          alt="Illustration search box"
        />

        {this.state.error ? <Error>Cidade não encontrada</Error> : null}

        <Input changed={(e) => this.changed(e)} search={this.searchCityCode} />

        <Load
          show={
            this.state.benefited[0] === 0 &&
            this.state.cityCode !== null &&
            this.state.error === false
          }
        />

        <DivResult show={this.state.benefited[0] > 0}>
          <Result
            icon="fas fa-users"
            title="Total de beneficiados:"
            abril={this.state.benefited[0]}
            maio={this.state.benefited[1]}
            junho={this.state.benefited[2]}
            julho={this.state.benefited[3]}
          />

          <Result
            icon="fas fa-coins"
            title="Reais distribuídos:"
            abril={this.state.reais[0].toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
            maio={this.state.reais[1].toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
            junho={this.state.reais[2].toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
            julho={this.state.reais[3].toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          />

          <Result
            icon="fas fa-venus"
            title="Chefes de família:"
            abril={(this.state.reais[0] - this.state.benefited[0] * 600) / 600}
            maio={(this.state.reais[1] - this.state.benefited[1] * 600) / 600}
            junho={(this.state.reais[2] - this.state.benefited[2] * 600) / 600}
            julho={(this.state.reais[3] - this.state.benefited[3] * 600) / 600}
          />
        </DivResult>
      </Div>
    );
  }
}

export default App;
