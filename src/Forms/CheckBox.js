import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styleSheet from "./CheckBox.css";
import LegendAndLabel from "./LegendAndLabel";
import ErrorMessaging from "./ErrorMessaging";

class CheckBox extends PureComponent {
  /**
   * This is used to pass the value of "checked" for the target into
   * the callback.
   */
  handleChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked ? event.target.checked : "");
    }
  };

  /**
   * This is used to forward the value to the onBlur callback.
   */
  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.checked ? event.target.checked : "");
    }
  };

  render() {
    const { name, isRequired, value, isMissing, checked } = this.props;

    const classList = cx(styleSheet.checkbox, {
      [styleSheet.error]: isMissing
    });

    return (
      <fieldset className={this.props.className}>
        <LegendAndLabel legend={this.props.legend} />
        <input
          type="checkbox"
          className={classList}
          name={name}
          onBlur={this.handleBlur}
          required={isRequired}
          onChange={this.handleChange}
          checked={checked}
          value={value}
        />
        <label className={styleSheet.checkboxLabel}>{this.props.label}</label>
        <ErrorMessaging {...this.props} />
      </fieldset>
    );
  }
}

CheckBox.propTypes = {
  className: PropTypes.string, //the class to add to the wrapper
  isMissing: PropTypes.bool, //is the value missing
  isRequired: PropTypes.bool, //should this checkbox be filled in?
  label: PropTypes.string, //the label text to show
  legend: PropTypes.string, //the legend text to show
  missingMessage: PropTypes.string, //Text to show if there is no value andthe urser tries to submit
  name: PropTypes.string.isRequired, //the name of the element. Used to send data to the server
  onBlur: PropTypes.func, //called when the user leaves the checkbox
  onChange: PropTypes.func, //called when the value changes
  checked: PropTypes.bool, //the is the box checked
  value: PropTypes.string
};

CheckBox.defaultProps = {
  isRequired: false,
  checked: false,
  value: "on",
  missingMessage: "This field is required."
};

export default CheckBox;
