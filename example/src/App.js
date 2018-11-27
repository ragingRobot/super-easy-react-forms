import React, { Component } from "react";

import {
  Form,
  Input,
  ValidationTypes,
  TextArea,
  CheckBox,
  Select,
  Option
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
              name="firstName"
              legend="Send us all of your info"
              label="First Name"
              placeholder="First Name"
              validation={ValidationTypes.TEXT}
              errorMessage="Your name can't have numbers in it."
              missingMessage="Please enter your first name"
              isRequired
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              validation={ValidationTypes.TEXT}
              errorMessage="Your name can't have numbers in it."
              missingMessage="Please enter your last name"
              isRequired
            />
            <div className="withCols">
              <Input
                name="city"
                label="City"
                placeholder="City"
                validation={ValidationTypes.TEXT}
                errorMessage="That's not a city name."
              />

              <Select name="state" label="State" placeholder="State">
                <Option value="1">Test 1</Option>
                <Option value="2">Test 2</Option>
                <Option value="3">Test 3</Option>
                <Option value="4">Test 4</Option>
              </Select>

              <Input
                name="zip"
                label="Zip Code"
                placeholder="Zip Code"
                shouldPreventInvalid={true}
                validation={ValidationTypes.NUMBER}
              />
            </div>

            <p>
              If you would like to send us a message, please add it here. This
              is optional and your information will still be sent if you don't
              add a message.
            </p>
            <TextArea
              name="message"
              label="Message (Optional)"
              placeholder="Message (Optional)"
            />
            <CheckBox
              name="checkbox"
              label="Accept terms of use"
              value="terms"
              isRequired
            />
          </Form>
        )}
      </React.Fragment>
    );
  }
}
