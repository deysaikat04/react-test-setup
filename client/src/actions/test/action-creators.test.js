import * as actionCreators from "../action-creators";
import { SET_ATTRIBUTE, UPDATE_ATTRIBUTE, SET_ERROR } from "../action-types";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import axios from "axios";
import sinon from "sinon";
import configureMockStore from "redux-mock-store";

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

describe("action-creators", () => {
  let gettAttributeSpy, useDispatchSpy, mockDispatchFn, getStub, postStub, mockStoreVal;
  beforeEach(() => {
    jest.resetModules();
    mockStoreVal = mockStore(storeVal);
    useDispatchSpy = jest.spyOn(redux, "useDispatch");
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    gettAttributeSpy = jest.spyOn(actionCreators, "gettAttribute");
    getStub = sinon.stub(axios, "get");
    postStub = sinon.stub(axios, "post");
  });
  afterEach(() => {
    useDispatchSpy.mockClear();
    getStub.restore();
    postStub.restore();
    gettAttributeSpy.mockClear();
  });
  it("test I", (done) => {
    let res = {
      id: "74e717f9-8d9c-4ed0-aec2-313e94e49251",
      ipClass: "df",
      ipId: "sdf",
      ipLabel: "sad",
    };
    getStub.onCall(0).resolves({
      data: res,
      status: 200,
    });
    const expectedAction = { type: SET_ATTRIBUTE, payload: res };
    let i = 0;
    mockStoreVal.subscribe(() => {
      console.log(mockStoreVal.getActions()[i]);
      i++;
      done();
    });
  });
});
