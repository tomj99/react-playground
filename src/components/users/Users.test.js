import React from "react";
import Users from "./Users";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new EnzymeAdapter() });
let loading = false;
const users = [];
//shallow grabs only the top level element
const setup = () => shallow(<Users loading={loading} users={users} />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[test-comp='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const usersComp = findByTestAttr(wrapper, "component-users");
});

test("spinner renders without error", () => {
  loading = true;
  const wrapper = setup();
  const spinnerComp = findByTestAttr(wrapper, "component-spinner");
  expect(spinnerComp.length).toBe(1);
});
