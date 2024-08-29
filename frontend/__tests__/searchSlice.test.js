// searchSlice.test.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer, {
  setQuery,
  clearSearch,
  fetchSearchResults,
} from "./searchSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("searchSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { search: searchReducer } });
  });

  it("should handle setQuery action", () => {
    store.dispatch(setQuery("test query"));
    const state = store.getState().search;
    expect(state.query).toBe("test query");
  });

  it("should handle clearSearch action", () => {
    store.dispatch(clearSearch());
    const state = store.getState().search;
    expect(state.query).toBe("");
    expect(state.results).toEqual([]);
  });

  it("should handle fetchSearchResults thunk", async () => {
    mock
      .onGet("/api/search?q=test")
      .reply(200, { data: [{ id: 1, title: "Test Product" }] });

    await store.dispatch(fetchSearchResults("test"));

    const state = store.getState().search;
    expect(state.results).toEqual([{ id: 1, title: "Test Product" }]);
    expect(state.loading).toBe(false);
  });

  it("should handle fetchSearchResults thunk error", async () => {
    mock.onGet("/api/search?q=test").reply(500);

    await store.dispatch(fetchSearchResults("test"));

    const state = store.getState().search;
    expect(state.error).toBeDefined();
    expect(state.loading).toBe(false);
  });
});
