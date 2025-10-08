// src/redux/slices/users-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { TableFilter, TablePaging } from "@/types/table";

interface UsersState {
  data: User[];
  params: TableFilter;
  paging: TablePaging;
  loading: boolean;
  error: string;
  selectedUserId: number | null;
}

const initialState: UsersState = {
  data: [],
  params: {},
  paging: {
    page: 1,
    totalPage: 1,
    totalRows: 0,
    limit: 10,
  },
  loading: false,
  error: '',
  selectedUserId: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (
      state,
      action: PayloadAction<{
        data?: User[],
        params?: TableFilter,
        paging?: TablePaging;
      }>
    ) => {
      if (action.payload.data !== undefined) {
        state.data = action.payload.data
      };
      if (action.payload.params !== undefined) state.params = action.payload.params;
      if (action.payload.paging !== undefined) state.paging = action.payload.paging;
      state.loading = false;
      state.error = '';
    },
    selectUser: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
    clearUsers: (state) => {
      state.data = [];
    },
    errorUsers: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPagination: (
      state,
      action: PayloadAction<TablePaging>
    ) => {
      if (action.payload.page !== undefined) state.paging.page = action.payload.page;
      if (action.payload.totalPage !== undefined) state.paging.totalPage = action.payload.totalPage;
      if (action.payload.totalRows !== undefined) state.paging.totalRows = action.payload.totalRows;
    },
  },
});

export const { setLoading, setUsers, selectUser, clearUsers, errorUsers, setPagination } = usersSlice.actions;
export default usersSlice.reducer;