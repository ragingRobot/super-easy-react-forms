import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styleSheet from "./Select.css";
import LegendAndLabel from "./../LegendAndLabel";
import ErrorMessaging from "./../ErrorMessaging";
import Option from "./Option";

class Select extends PureComponent {
  /**
   * The event is forwarded to the onChange callback.
   */
  handleChange = event => {
    const { onChange } = this.props;
    if (onChange && event.target.value) {
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
      isRequired,
      missingMessage,
      placeholder,
      ...props
    } = this.props;

    //use the handlers here before the ones in the props
    props.onBlur = this.handleBlur;
    props.onChange = this.handleChange;

    if (!props.value && placeholder) {
      props.value = placeholder;
    }

    const wrapperClassList = cx(styleSheet.selectWrapper, className);

    const selectClassList = cx(styleSheet.styledSelect, {
      [styleSheet.error]: isMissing
    });

    return (
      <fieldset className={wrapperClassList}>
        <LegendAndLabel {...this.props} />
        <div className={selectClassList}>
          <select required={isRequired} {...props}>
            {placeholder && <Option disabled>{placeholder}</Option>}
            {this.props.children}
          </select>
        </div>
        <ErrorMessaging {...this.props} />
      </fieldset>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string, //the class to add to the wrapper
  isMissing: PropTypes.bool, //is the value missing
  isRequired: PropTypes.bool, //should this Select be filled in?
  label: PropTypes.string, //the label text to show
  legend: PropTypes.string, //the legend text to show
  missingMessage: PropTypes.string, //Text to show if there is no value andthe urser tries to submit
  name: PropTypes.string.isRequired, //the name of the element. Used to send data to the server
  onBlur: PropTypes.func, //called when the user leaves the Select
  onChange: PropTypes.func, //called when the value changes
  value: PropTypes.string, //the value to show
  placeholder: PropTypes.string //the placeholder text
};

Select.defaultProps = {
  isRequired: false,
  missingMessage: "This field is required."
};

export default Select;
