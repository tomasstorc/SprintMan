import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteById = createAsyncThunk(
  "delete/deleteById",
  async (data) => {
    const res = await fetch(`/api/${data.type}/${data.id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    }).then((data) => {
      return data.json();
    });
    return res;
  }
);

export const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    deleteId: null,
    loading: false,
    error: false,
  },
  reducers: {
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteById.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deleteById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteById.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export const { setDeleteId } = deleteSlice.actions;
