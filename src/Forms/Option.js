import React, { PureComponent } from "react";

class Option extends PureComponent {
  render() {
    return <option {...this.props}>{this.props.children}</option>;
  }
}

Option.propTypes = {};

Option.defaultProps = {};

export default Option;
