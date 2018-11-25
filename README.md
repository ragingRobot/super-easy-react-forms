# super-easy-react-forms

> Easy to use form components for react

<!--[![NPM](https://img.shields.io/npm/v/super-easy-react-forms.svg)](https://www.npmjs.com/package/super-easy-react-forms)-->

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square")](https://prettier.io/)

## Try it out

[Sample app here](https://ragingrobot.github.io/super-easy-react-forms)

## Install

Not Published yet

<!--
```bash
npm install --save super-easy-react-forms
```
-->

## Usage

Creating a form is simple. Just import the form components you want then put them together. I tried to make the componets work as closely to native HTML forms as I could.

```jsx
import React, { Component } from "react";

import { Form, Input, ValidationTypes } from "super-easy-react-forms";

class Example extends Component {
  render() {
    return (
      <Form>
        <Input name="required" legend="Legend" label="required" isRequired />
        <Input
          name="text only"
          label="text only"
          validation={ValidationTypes.TEXT}
          errorMessage="text only!!"
        />
        <Input
          name="number"
          label="numbers only"
          validation={ValidationTypes.NUMBER}
        />

        <Input
          name="numberOnly"
          label="prevent invalid entry (numbers only)"
          shouldPreventInvalid={true}
          validation={ValidationTypes.NUMBER}
        />
      </Form>
    );
  }
}
```

## Form Component

The Form component is used to wrap all of the other components that make up the form. It handles the state of all child components. All form elements are controlled.

Each Form component has a built in submit button but you can also add other buttons by passing them in as child components.

```jsx
<Form>
  <Input name="name" label="required" isRequired />
  <button>Extra Button</button>
</Form>
```

## Input Component

The Input component works just like a normal HTML input tag but has a few extra options. here are the props you can pass in:

- name - the name of the element. Used to send data to the server. This is a required prop.
- className - the class to add to the wrapper
- errorMessage - text to show if there is a validation error
- isRequired - should this input be filled in?
- label - the label text to show
- legend - the legend text to show
- onBlur - called when the user leaves the input
- onChange - called when the value changes
- shouldPreventInvalid - stop the input of invalid characters
- validation - a function to call to see if this field is valid
- value - the value to show

```jsx
<Input
  name="name"
  className="myClass"
  label="required"
  legend="Legend"
  errorMessage="there was an error"
  value="test"
  isRequired
  shouldPreventInvalid
  validation={value => {
    return value === 5;
  }}
  onBlur={() => {
    //do something
  }}
  onChange={() => {
    //do something
  }}
/>
```

## Validation

I tried to make the validation as flexibile as possible. To add validation to an input just pass a function to the
validation prop. It will be called any time validation is run and passed the value of the input. The function should
return true if the value is valid.

```jsx
<Input
  name="five-example"
  validation={value => {
    return value === 5;
  }}
/>
```

## Validation Types

To makevalidation eveneasier I have included a ValidationTypes object that has some prebuilt validation methods.
Just pick the one you need and pass it in.

so far I have these options:

- ValidationTypes.NUMBER
- ValidationTypes.TEXT

```jsx
<Input name="five-example" validation={ValidationTypes.NUMBER} />
```

## Required Fields

I wanted to be able to show different messaging for missing values than other types of validation so I setup a prop
specifically for required fields. Just add isRequired.

```jsx
<Input name="required-example" isRequired />
```

## License

MIT © [ragingrobot](https://github.com/ragingrobot)
