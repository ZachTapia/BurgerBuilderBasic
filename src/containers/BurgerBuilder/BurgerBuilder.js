import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    // State should be updated in an immutable way, so we create a new variable
    // rather than editing the old one, we use spread operator to make a copy
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Update the count of the correct ingredient type
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    // Check to make sure we don't end up with negative quantities of ingredients
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    // State should be updated in an immutable way, so we create a new variable
    // rather than editing the old one, we use spread operator to make a copy
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Update the count of the correct ingredient type
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;

    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
  };

  render() {
    // Make copy of ingredient state, for immutability
    const disabledInfo = {
      ...this.state.ingredients
    };

    // Check every ingredient, if an ingredient is 0 then mark it true
    // { salad: true, meat: false ...}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
