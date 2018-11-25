import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";

import Form from "./Form";
import Input from "./Input";
import ValidationTypes from "./ValidationTypes";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Form component validation", () => {
  it("is invalid for missing required fields", () => {
    const wrapper = shallow(
      <Form>
        <Input name="required" isRequired={true} />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: true,
      error: false,
      valid: false
    });
  });

  it("is valid for required fields that are filled in", () => {
    const wrapper = shallow(
      <Form>
        <Input name="required" isRequired value="test" />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: false,
      error: false,
      valid: true
    });
  });

  it("is invalid for input that doesnt match the rules", () => {
    const wrapper = shallow(
      <Form>
        <Input name="validation" validation={ValidationTypes.TEXT} value="31" />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: false,
      error: true,
      valid: false
    });
  });

  it("is valid for input that are not required and are blank but have validation", () => {
    const wrapper = shallow(
      <Form>
        <Input name="validation" validation={ValidationTypes.TEXT} />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: false,
      error: false,
      valid: true
    });
  });

  it("is invalid for missing required fields with validation", () => {
    const wrapper = shallow(
      <Form>
        <Input name="required" validation={ValidationTypes.TEXT} isRequired />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: true,
      error: false,
      valid: false
    });
  });

  it("is invalid for filled equired fields with incorrect values", () => {
    const wrapper = shallow(
      <Form>
        <Input
          name="required"
          validation={ValidationTypes.TEXT}
          value="31"
          isRequired
        />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: false,
      error: true,
      valid: false
    });
  });

  it("is valid for filled required fields with correct values", () => {
    const wrapper = shallow(
      <Form>
        <Input
          name="required"
          validation={ValidationTypes.TEXT}
          value="test"
          isRequired
        />
      </Form>
    );
    const input = wrapper.find("Input");

    expect(
      wrapper.instance().getElementErrors(input.props(), input.props().value)
    ).toEqual({
      missing: false,
      error: false,
      valid: true
    });
  });
});
