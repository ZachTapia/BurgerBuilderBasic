import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        Axios.get('https://react-my-burger-52ff4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => { this.setState({ error: true }); });
    };

    // Update purchasable if we have at least 1 ingredient
    updatePurchasable = ingredients => {
        // Use Object.key() to get array of names of ingredients ['salad', 'bacon', 'cheese', 'meat']
        // Then use map() to transform that array into their respective amounts [0, 0, 0, 0]
        // Then use reduce() to iterate over the array and sum
        // prettier-ignore
        const sum = Object.keys(ingredients)
            .map(ingredientName => {
                return ingredients[ ingredientName ];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({ purchasable: sum > 0 });
        console.log(sum);
    };

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[ type ];
        const updatedCount = oldCount + 1;

        // State should be updated in an immutable way, so we create a new variable
        // rather than editing the old one, we use spread operator to make a copy
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // Update the count of the correct ingredient type
        updatedIngredients[ type ] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[ type ];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchasable(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[ type ];

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
        updatedIngredients[ type ] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[ type ];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchasable(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Zach Tapia',
                address: {
                    street: "Red Coach Lane",
                    zipCode: '90604',
                    country: 'US'
                },
                email: 'zachtapia@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        // Make copy of ingredient state, for immutability
        const disabledInfo = {
            ...this.state.ingredients
        };

        // Check every ingredient, if an ingredient is 0 then mark it true
        // { salad: true, meat: false ...}
        for (let key in disabledInfo) {
            disabledInfo[ key ] = disabledInfo[ key ] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
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

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
        }

        // Spinner if loading
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, Axios);
