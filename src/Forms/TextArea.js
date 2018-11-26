import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styleSheet from "./TextArea.css";
import LegendAndLabel from "./LegendAndLabel";
import ErrorMessaging from "./ErrorMessaging";

class TextArea extends PureComponent {
  /**
   * This is used to prevent invalid inputs if the prop is set. If the input is valid
   * the value is forwarded to the onChange callback.
   */
  handleChange = event => {
    const { shouldPreventInvalid, validation, onChange } = this.props;
    let canProceed = true;
    if (shouldPreventInvalid && validation) {
      canProceed = validation(event.target.value);
    }
    if (onChange && canProceed) {
      onChange(event.target.value);
    }
  };

  /**
   * This is used to forward the value to the onBlur callback.
   */
  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value);
    }
  };

  render() {
    const {
      onBlur,
      onChange,
      isMissing,
      hasError,
      className,
      ...props
    } = this.props;

    //use the handlers here before the ones in the props
    props.onBlur = this.handleBlur;
    props.onChange = this.handleChange;

    const classList = cx(styleSheet.textarea, {
      [styleSheet.error]: isMissing || hasError
    });

    return (
      <fieldset className={className}>
        <LegendAndLabel {...this.props} />
        <textarea className={classList} {...props} />
        <ErrorMessaging {...this.props} />
      </fieldset>
    );
  }
}

TextArea.propTypes = {
  className: PropTypes.string, //the class to add to the wrapper
  errorMessage: PropTypes.string, //Text to show if there is a validation error
  hasError: PropTypes.bool, //is there a validation error
  isMissing: PropTypes.bool, //is the value missing
  isRequired: PropTypes.bool, //should this TextArea be filled in?
  label: PropTypes.string, //the label text to show
  legend: PropTypes.string, //the legend text to show
  missingMessage: PropTypes.string, //Text to show if there is no value andthe urser tries to submit
  name: PropTypes.string.isRequired, //the name of the element. Used to send data to the server
  onBlur: PropTypes.func, //called when the user leaves the TextArea
  onChange: PropTypes.func, //called when the value changes
  shouldPreventInvalid: PropTypes.bool, // stop the input of invalid characters
  validation: PropTypes.func, //a function to call to see if this field is valid
  value: PropTypes.string, //the value to show
  placeholder: PropTypes.string //the placeholder text
};

TextArea.defaultProps = {
  isRequired: false,
  missingMessage: "This field is required."
};

export default TextArea;
