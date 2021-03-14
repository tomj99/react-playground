import React from "react";
import App from "./App";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new EnzymeAdapter() });

//shallow grabs only the top level element
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[test-comp='${val}']`);

//this is a test that doesn't use the setup and findByTestAttr methods
test("unrefactored renders without error", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[test-comp='component-app']");
  expect(appComponent.length).toBe(1);
});

test("refactored renders withoout error", () => {
  const wrapper = setup();
  const appComp = findByTestAttr(wrapper, "component-app");
  expect(appComp.length).toBe(1);
});

test("renders navbar error", () => {
  const wrapper = setup();
  const navComp = findByTestAttr(wrapper, "component-navbar");
  expect(navComp.length).toBe(1);
});

test("renders users without error", () => {
  const wrapper = setup();
  const usersComp = findByTestAttr(wrapper, "component-users");
  expect(usersComp.length).toBe(1);
});

test("renders alert without error", () => {
  const wrapper = setup();
  const alertComp = findByTestAttr(wrapper, "component-alert");
  expect(alertComp.length).toBe(1);
});

test("renders search without error", () => {
  const wrapper = setup();
  const searchComp = findByTestAttr(wrapper, "component-search");
  expect(searchComp.length).toBe(1);
});
