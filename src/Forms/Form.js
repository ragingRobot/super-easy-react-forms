import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import TextArea from "./TextArea";
import CheckBox from "./CheckBox";
import Select from "./Select";

class Form extends Component {
  /**
   * A list of all of the controlled component types that the form should look for and
   * store in the state
   */
  static CONTROLLED_COMPONENTS = [Input, TextArea, CheckBox, Select];

  /**
   * Here we are looking at all of the children passed into the form and adding their
   * values to the state if they are instances of the controlled component types.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    let initialState = {
      errors: [],
      missing: []
    };

    //look through all of the components recursivly and merge those values into the
    //state so we can keep track of them.
    initialState = Object.assign(
      initialState,
      this.checkChildrenForInitialValues(this.props.children)
    );

    //set the state
    this.state = initialState;
  }

  /**
   * looks through the children passed to it finding the components
   * that should be controlled and adding their values to the state.
   * @param children - the children to look through
   */
  checkChildrenForInitialValues(children) {
    let initialValues = {};
    //look through all of the form inputs and add their values to the initial state
    this.getControlledChildren(children).forEach(child => {
      //since checkboxes and radios work differently from all other components
      //we need to check weather they are checked or not and set the value based on that.
      if (typeof child.props.checked !== "undefined") {
        initialValues[child.props.name] = child.props.checked
          ? child.props.value
          : "";
      } else {
        //if its just a normal input set the value
        initialValues[child.props.name] = child.props.value
          ? child.props.value
          : "";
      }
    });
    return initialValues;
  }

  /**
   * got through all of the children and pull out any controlled componets.
   * Recursive to handle nested elements.
   * @param {*} children
   */
  getControlledChildren(children) {
    children = React.Children.toArray(children);
    let controlled = [];
    children.forEach(child => {
      if (Form.CONTROLLED_COMPONENTS.indexOf(child.type) > -1) {
        controlled.push(child);
      } else if (child.props && child.props.children) {
        controlled = controlled.concat(
          this.getControlledChildren(child.props.children)
        );
      }
    });
    return controlled;
  }

  /**
   * Looks at the state to see if there are any errors or missing values
   *
   */
  isValid = () => {
    const { errors, missing } = this.state;
    const children = this.getControlledChildren(this.props.children);

    children.forEach(child => {
      const values = this.getElementErrors(
        child.props,
        this.state[child.props.name]
      );
      if (values.missing) {
        missing.push(child.props.name);
      }

      if (values.error) {
        errors.push(child.props.name);
      }
    });

    //mark the errors in the state
    this.setState({
      errors: errors,
      missing: missing
    });

    return errors.length === 0 && missing.length === 0;
  };

  /**
   * looks at a single element and tells if its value is valid
   * If you make changes here be sure to run the tests!!
   * @param {*} element - the element to check
   */
  getElementErrors = (options, value) => {
    const error = !this.passesValidation(options, value);
    const missing = this.isMissing(options, value);

    return {
      missing: !!missing,
      error: error,
      valid: !missing && !error
    };
  };

  /**
   * If the field is not required vaild is true. if it is required check if its set
   * @param {*} options - the pros for the input name, isRequired, validation
   * @param {*} value
   */
  isMissing(options, value) {
    return options.isRequired && !value;
  }

  /**
   * If the field has extra validation check it. here is what we check:
   * validation isnt needed || value doesnt exist || validation is needed, the value is there, and it passes
   * @param {*} options - the pros for the input name, isRequired, validation
   * @param {*} value
   */
  passesValidation(options, value) {
    return (
      !options.validation || !value || (value && options.validation(value))
    );
  }

  /**
   * Validate and submit the form
   */
  handleFormSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    if (!this.isValid()) {
      return;
    }

    //send the state to the callback
    if (this.props.onSubmit) {
      //removethe error and missing states
      const { errors, missing, ...formResults } = this.state;
      this.props.onSubmit(formResults);
    }
  };

  /**
   * Updates the state when one of the inputs changes its value. The element name
   * is used to keep track of what input the value is for. we are also doing validation of
   * individule elements here when they update
   * @param {*} elementName - the name of the input
   * @param {*} event - the onChange event data
   */
  handleElementUpdate(options, value) {
    const { name } = options;
    let { errors, missing } = this.state;

    const errorValues = this.getElementErrors(options, value);

    //the state has an error but it has been removed
    if (errors.indexOf(name) > -1 && !errorValues.error) {
      errors = errors.filter(error => error !== name);
    }

    //there is no error in state but one needs to be added
    if (errors.indexOf(name) === -1 && errorValues.error) {
      errors.push(name);
    }

    //the state says the value is missing but a value is present
    if (missing.indexOf(name) > -1 && !errorValues.missing) {
      missing = missing.filter(error => error !== name);
    }

    //the state doesnt know the value is missing but it is
    if (missing.indexOf(name) === -1 && errorValues.missing) {
      missing.push(name);
    }

    this.setState({
      [name]: value,
      errors: errors,
      missing: missing
    });
  }

  /**
   * This method looks through all of the children it is passed. If it finds
   * a component that should be controlled it passes it extra props to detect
   * input and show errors. This method is recursive so that form components
   * that are nested will still work.
   * @param children - the children to look through
   */
  getChildrenWithAddedProps(children) {
    const { errors, missing } = this.state;

    return React.Children.toArray(children).map(element => {
      if (Form.CONTROLLED_COMPONENTS.indexOf(element.type) > -1) {
        //assemble the props needed for the component
        const props = {
          onChange: this.handleElementUpdate.bind(this, element.props),
          onBlur: this.handleElementUpdate.bind(this, element.props),
          hasError: errors.indexOf(element.props.name) > -1,
          isMissing: missing.indexOf(element.props.name) > -1
        };

        //since checkboxes and radios work differently from all othe components
        //we need to check weather they are checked or not and set the value based on that.
        if (typeof element.props.checked !== "undefined") {
          props.checked = !!this.state[element.props.name];
          props.value = element.props.value;
        } else {
          //if its just a normal input set the value
          props.value = this.state[element.props.name];
        }
        return (
          <React.Fragment key={"form-" + element.props.name}>
            {React.cloneElement(element, props)}
          </React.Fragment>
        );
      } else if (element.props && element.props.children) {
        //if this isnt a controlled input but it has children its probably
        //a container of some kind so look through its children too.
        return React.cloneElement(
          element,
          Object.assign({}, element.props, {
            children: this.getChildrenWithAddedProps(element.props.children)
          })
        );
      } else {
        return element;
      }
    });
  }

  render() {
    const { errors, missing } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        {this.getChildrenWithAddedProps(this.props.children)}
        <button
          disabled={errors.length !== 0 || missing.length !== 0}
          type="primary"
          onClick={this.handleFormSubmit}
        >
          {this.props.submitText}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  submitText: PropTypes.string, // the text for the submit button
  onSubmit: PropTypes.func // acallback for when a vaild form is submitted
};

Form.defaultProps = {
  submitText: "Submit"
};

export default Form;
