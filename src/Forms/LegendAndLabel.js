import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styleSheet from "./LegendAndLabel.css";

class LegendAndLabel extends PureComponent {
  render() {
    const { legend, label } = this.props;
    return (
      <React.Fragment>
        {legend && <legend>{legend}</legend>}
        {label && <label>{label}</label>}
      </React.Fragment>
    );
  }
}

LegendAndLabel.propTypes = {
  isRequired: PropTypes.bool, //is this label for arequiredfield
  label: PropTypes.string, //the label text to show
  legend: PropTypes.string //the legend text to show
};

LegendAndLabel.defaultProps = {
  isRequired: false
};

export default LegendAndLabel;
