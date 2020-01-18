import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientName => {
      // ingredientName: String (salad, bacon)
      // Create an array filled with undefined, but with correct amounts,
      // then run map on it, then flatten that 2d-array by using reduce to end up with
      // a single array of objects
      return [...Array(props.ingredients[ingredientName])].map((blank, index) => {
        return <BurgerIngredient key={ingredientName + index} type={ingredientName} />;
      });
    })
    .reduce((array, element) => {
      return array.concat(element);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
