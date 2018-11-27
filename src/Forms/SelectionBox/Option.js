import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import LegendAndLabel from "./../LegendAndLabel";
import ErrorMessaging from "./../ErrorMessaging";

class Option extends PureComponent {
  render() {
    return <option {...this.props}>{this.props.children}</option>;
  }
}

Option.propTypes = {};

Option.defaultProps = {};

export default Option;
