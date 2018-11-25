import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styleSheet from "./ErrorMessaging.css";

class ErrorMessaging extends PureComponent {
  render() {
    const { isMissing, hasError, errorMessage, missingMessage } = this.props;
    return (
      <React.Fragment>
        {hasError && errorMessage && (
          <div className={styleSheet.errorMessage}>{errorMessage}</div>
        )}
        {isMissing && missingMessage && (
          <div className={styleSheet.errorMessage}>{missingMessage}</div>
        )}
      </React.Fragment>
    );
  }
}

ErrorMessaging.propTypes = {
  errorMessage: PropTypes.string, //Text to show if there is a validation error
  hasError: PropTypes.bool, //is there a validation error
  isMissing: PropTypes.bool, //is the value missing
  missingMessage: PropTypes.string //Text to show if there is no value andthe urser tries to submit
};
export default ErrorMessaging;
