import React from "react";
import { shallow, mount } from "enzyme";
import ValidationTypes from "./ValidationTypes";

describe("Validation Types", () => {
  it("number validation fails when letters are passed", () => {
    expect(ValidationTypes.NUMBER("test")).toEqual(false);
  });

  it("number validation fails when mixed content is passed", () => {
    expect(ValidationTypes.NUMBER("test123")).toEqual(false);
  });

  it("number validation passes when numbers are passed", () => {
    expect(ValidationTypes.NUMBER("31")).toEqual(true);
  });

  it("text validation fails when numbers are passed", () => {
    expect(ValidationTypes.TEXT("31")).toEqual(false);
  });

  it("text validation fails when mixed content is passed", () => {
    expect(ValidationTypes.TEXT("test31")).toEqual(false);
  });

  it("text validation passes when text are passed", () => {
    expect(ValidationTypes.TEXT("test")).toEqual(true);
  });
});
