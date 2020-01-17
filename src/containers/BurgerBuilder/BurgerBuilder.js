import React, { Component } from 'react';

import Auxiliary from '../../hoc/Aux';

class BurgerBuilder extends Component {
  render() {
    return (
      <Auxiliary>
        <div>Burger</div>
        <div>Controls</div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;