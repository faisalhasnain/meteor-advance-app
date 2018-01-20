import React from 'react';
import ReactDOM from 'react-dom';

export const showConfirm = props => new Promise((resolve) => {
  ReactDOM.render(
    <Confirm resolve={resolve} {...props} />,
    document.getElementById(props.containerId)
  );
});

export default class Confirm extends React.Component {
  handleResponse(ans) {
    ReactDOM.unmountComponentAtNode(document.getElementById(this.props.containerId));
    this.props.resolve(ans);
  }
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box has-text-centered">
            <h3 className="subtitle is-5">{this.props.title}</h3>
            <p>
              {this.props.message}
            </p>
            <div className="space-block" />
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button type="button" className="button is-primary" onClick={() => this.handleResponse(true)}>
                  <span className="icon">
                    <i className="fa fa-check" />
                  </span>
                  <span>Yes</span>
                </button>
              </div>
              <div className="control">
                <button type="button" className="button" onClick={() => this.handleResponse(false)}>
                  <span className="icon">
                    <i className="fa fa-close" />
                  </span>
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
