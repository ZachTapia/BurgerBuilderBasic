import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    // Update purchasable if we have at least 1 ingredient
    updatePurchasable = ingredients => {
        // Use Object.key() to get array of names of ingredients ['salad', 'bacon', 'cheese', 'meat']
        // Then use map() to transform that array into their respective amounts [0, 0, 0, 0]
        // Then use reduce() to iterate over the array and sum
        // prettier-ignore
        const sum = Object.keys(ingredients)
            .map(ingredientName => {
                return ingredients[ingredientName];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({ purchasable: sum > 0 });
        console.log(sum);
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
        this.updatePurchasable(updatedIngredients);
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
        this.updatePurchasable(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
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
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
