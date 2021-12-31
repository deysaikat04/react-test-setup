import React from "react";
import { Provider } from "react-redux";
import { mount, shallow, configure } from "enzyme";
import Home from "../components/Home";
import { v4 as uuidv4 } from "uuid";
import InputField from "../components/InputField";
import Card from "../components/Card";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actionCreators from "../actions/action-creators";
import * as redux from "react-redux";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

const testStoreVal = {
  id: "",
  ipName: "",
  ipId: "",
  ipClass: "",
  ipSize: "",
  ipType: "",
  ipPlaceholder: "",
  ipLabel: "",
  error: "",
};

const storeVal = {
  attributes: testStoreVal,
};
describe("Home", () => {
  let postAttributeSpy, useDispatchSpy, mockDispatchFn;
  beforeEach(() => {
    jest.resetModules();
    useDispatchSpy = jest.spyOn(redux, "useDispatch");
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    postAttributeSpy = jest.spyOn(actionCreators, "postAttribute");
  });
  afterEach(() => {
    useDispatchSpy.mockClear();
    postAttributeSpy.mockClear();
  });

  const mockStoreVal = mockStore(storeVal);

  const props = { handleOnChange: jest.fn().mockResolvedValueOnce(true) };

  const rendererCreateComp = () =>
    renderer.create(
      <Provider store={mockStoreVal}>
        <Home {...props}></Home>
      </Provider>
    );
  const createComponent = () =>
    mount(
      <Provider store={mockStoreVal}>
        <Home {...props} />
      </Provider>
    );

  it("Home Snapshot", () => {
    const component = rendererCreateComp();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("check if container exists", () => {
    const component = createComponent();
    // console.log(component.debug());
    expect(component.find(".container")).toHaveLength(1);
  });
  it("check if Label text exists", () => {
    const component = createComponent();
    expect(component.find(".col-form-label").at(0).text()).toEqual("Label");
  });
  it("check if form text exists", () => {
    const data = {
      id: uuidv4(),
      ipLabel: "Age",
      ipName: "age",
      ipId: "age",
      ipClass: "age",
      ipSize: 10,
      ipType: "number",
      ipPlaceholder: "Enter your age...",
    };
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const component = createComponent();
    component.instance().setForm(data)
    expect(component.find(".btn").length).toBe(1);
    component.find(".form").simulate("submit", fakeEvent);
    // expect(component.find(Notification).length).toBe(1);

    // component.find(".btn").simulate("click");
    expect(postAttributeSpy).toHaveBeenCalledTimes(1);
    // expect(postAttributeSpy).toHaveBeenCalledWith(data);
    // expect(component.find('.btn')).toHaveLength(10);
  });
});
