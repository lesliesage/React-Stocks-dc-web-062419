import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  setStocks = () => {
    const filtered = this.props.data.filter(
      stock =>
        stock.type.includes(this.props.filterOption) ||
        this.props.filterOption === "All"
    );
    let sorted;
    if (this.props.sortOption === "Alphabetically") {
      sorted = filtered.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (this.props.sortOption === "Price") {
      sorted = filtered.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else {
      sorted = filtered;
    }
    return sorted;
  };

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.setStocks().map(stock => {
          return (
            <Stock
              stock={stock}
              key={stock.ticker}
              handleClick={this.props.handleClick}
            />
          );
        })}
      </div>
    );
  }
}

export default StockContainer;
