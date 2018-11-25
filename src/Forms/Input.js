import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styleSheet from "./Input.css";
import LegendAndLabel from "./LegendAndLabel";
import ErrorMessaging from "./ErrorMessaging";

class Input extends PureComponent {
  /**
   * This is used to prevent invalid inputs if the prop is set. If the input is valid
   * the event is forwarded to the onChange callback.
   */
  handleChange = event => {
    const { shouldPreventInvalid, validation, onChange } = this.props;
    let canProceeded = true;
    if (shouldPreventInvalid && validation) {
      canProceeded = validation(event.target.value);
    }
    if (onChange && canProceeded) {
      onChange(event.target.value);
    }
  };

  /**
   * This is used to forwarded the value to the onBlur callback.
   */
  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value);
    }
  };

  render() {
    const { name, type, isRequired, value, isMissing, hasError } = this.props;

    const classList = cx(styleSheet.input, {
      [styleSheet.error]: isMissing || hasError
    });

    return (
      <fieldset className={this.props.className}>
        <LegendAndLabel {...this.props} />
        <input
          className={classList}
          name={name}
          onBlur={this.handleBlur}
          type={type}
          required={isRequired}
          onChange={this.handleChange}
          value={value}
        />
        <ErrorMessaging {...this.props} />
      </fieldset>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string, //the class to add to the wrapper
  errorMessage: PropTypes.string, //Text to show if there is a validation error
  hasError: PropTypes.bool, //is there a validation error
  isMissing: PropTypes.bool, //is the value missing
  isRequired: PropTypes.bool, //should this input be filled in?
  label: PropTypes.string, //the label text to show
  legend: PropTypes.string, //the legend text to show
  missingMessage: PropTypes.string, //Text to show if there is no value andthe urser tries to submit
  name: PropTypes.string.isRequired, //the name of the element. Used to send data to the server
  onBlur: PropTypes.func, //called when the user leaves the input
  onChange: PropTypes.func, //called when the value changes
  shouldPreventInvalid: PropTypes.bool, // stop the input of invalid characters
  type: PropTypes.string, //type of input default text
  validation: PropTypes.func, //a function to call to see if this field is valid
  value: PropTypes.string //the value to show
};

Input.defaultProps = {
  isRequired: false,
  type: "text"
};

export default Input;
