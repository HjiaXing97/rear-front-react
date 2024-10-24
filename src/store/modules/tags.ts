import { createSlice } from "@reduxjs/toolkit";

interface TagsState {
  tag: {
    name: string;
    key: string;
    isActive: boolean;
  }[];
}

const initialState: TagsState = {
  tag: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag(state, { payload }) {
      state.tag.push(payload);
    },
    removeTag(state, { payload }) {
      state.tag = state.tag.filter((tag) => tag.name !== payload);
    },
  },
});
export const { addTag, removeTag } = tagsSlice.actions;

export default tagsSlice.reducer;
