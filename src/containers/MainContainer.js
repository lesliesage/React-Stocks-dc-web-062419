import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    data: [],
    filterOption: "",
    sortOption: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(data => this.setState({ data: data }, this.addPortfolioFlag));
  }

  addPortfolioFlag = () => {
    const edited = this.state.data.map(stock => {
      return { ...stock, inPortfolio: false };
    });
    this.setState({ data: edited }, this.setStocks);
  };

  handleClick = clickedStock => {
    this.setState({
      data: this.state.data.map(stock =>
        stock === clickedStock
          ? { ...stock, inPortfolio: !clickedStock.inPortfolio }
          : stock
      )
    });
  };

  onSortChange = event => {
    this.setState({ sortOption: event.target.value }, this.setStocks);
  };

  onFilterChange = event => {
    this.setState({ filterOption: event.target.value }, this.setStocks);
  };

  render() {
    return (
      <div>
        <SearchBar
          filterOption={this.state.filterOption}
          sortOption={this.state.sortOption}
          onSortChange={this.onSortChange}
          onFilterChange={this.onFilterChange}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              data={this.state.data}
              handleClick={this.handleClick}
              filterOption={this.state.filterOption}
              sortOption={this.state.sortOption}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              data={this.state.data}
              handleClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
