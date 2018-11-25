import React, { Component } from "react";

import {
  Form,
  Input,
  ValidationTypes,
  TextArea,
  CheckBox
} from "super-easy-react-forms";

export default class App extends Component {
  state = {
    submitted: false
  };

  handleSubmit = () => {
    this.setState({
      submitted: true
    });
  };

  render() {
    const { submitted } = this.state;
    return (
      <React.Fragment>
        {submitted && <h2>Thanks for Submitting something</h2>}
        {!submitted && (
          <Form onSubmit={this.handleSubmit}>
            <Input
              name="required"
              legend="Legend"
              label="required"
              missingMessage="please enter something"
              isRequired
            />
            <Input
              name="text only"
              label="text only"
              validation={ValidationTypes.TEXT}
              errorMessage="text only!"
            />
            <div className="withCols">
              <Input
                name="number"
                label="numbers only"
                validation={ValidationTypes.NUMBER}
                errorMessage="numbers only!"
              />

              <Input
                name="numberOnly"
                label="prevent invalid entry (numbers only)"
                shouldPreventInvalid={true}
                validation={ValidationTypes.NUMBER}
              />
            </div>

            <p>
              You can place any type of element inside of the form Component and
              it will work just like a normal html form.
            </p>
            <TextArea
              name="textArea"
              label="Test Text Area"
              missingMessage="please enter something"
              isRequired
            />
            <CheckBox
              name="checkbox"
              label="Test Check Box"
              value="test"
              missingMessage="you must select this"
            />
          </Form>
        )}
      </React.Fragment>
    );
  }
}
