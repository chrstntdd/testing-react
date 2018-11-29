import React from 'react';
import PropTypes from 'prop-types';

export class SomeUi extends React.Component {
  static propTypes = {
    propFuncReq: PropTypes.func.isRequired,
    propFuncOpt: PropTypes.func,
    propA: PropTypes.shape({
      key1: PropTypes.bool.isRequired,
      key2: PropTypes.oneOf(['variant1', 'variant2', 'variant3']).isRequired
    }).isRequired,
    propB: PropTypes.instanceOf(Map).isRequired,
    propC: PropTypes.bool.isRequired
  };

  static defaultProps = {
    propFuncOpt: () => {}
  };

  state = { inputValue: '', hidden: true };

  componentDidUpdate(prevProps) {
    // if the prop has changed between updates, do side effect-y things
    if (this.props.propC !== prevProps.propC) {
      this.props.propFuncReq();
    }
  }

  componentWillUnmount() {
    // cleanup function
    this.props.propFuncOpt();
  }

  handleInputChange = e => {
    const inputValue = e.target.value;

    this.setState({ inputValue: inputValue.trim() });
  };

  toggleVisibility = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }));
  };

  render() {
    return (
      <div>
        <input
          className="test-input"
          placeholder="Enter some text whydontcha"
          onChange={this.handleInputChange}
        />
        <br />
        {this.state.inputValue && <p>this.state.inputValue</p>}
        <br />
        <button onClick={this.toggleVisibility}>{this.state.hidden ? 'show' : 'hide'}</button>
        <br />
        {!this.state.hidden && <p>hidden content</p>}
      </div>
    );
  }
}

export default SomeUi;
