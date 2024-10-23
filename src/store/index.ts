import { configureStore } from "@reduxjs/toolkit";

import tagsSlice from "./modules/tags";

const store = configureStore({
  reducer: {
    tagsSlice,
  },
});

export default store;
