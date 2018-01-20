import React from 'react';
import InsertTransaction from './InsertTransaction.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    if (props.routeName === 'insertTransaction') {
      this.state = {
        page: {
          title: 'Add Transaction',
          icon: 'fa fa-plus'
        }
      };
    }
  }
  render() {
    return <InsertTransaction {...this.props} {...this.state} />;
  }
}
