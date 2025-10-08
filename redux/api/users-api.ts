// src/redux/api/users-api.ts
import { apiClient } from "./api-client";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setLoading,
  setUsers,
  errorUsers,
} from "@/redux/slices/users-slice";
import { User } from "@/types/user";
import { TableFilter } from "@/types/table";

export const fetchUsers =
  (param: TableFilter) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));

        // ✅ Add skip dynamically (without mutating the original param)
        const response = await apiClient.get("/users", {
          params: { ...param, skip: ((param.page || 1) - 1) * (param.limit || 10) }
        });

        dispatch(setUsers({
          data: response.data?.users,
          params: {
            ...param,
          },
          paging: {
            page: param.page || 1,
            totalPage: Math.ceil(response.data?.total / param.limit || 10),
            totalRows: response.data?.total,
            limit: param.limit
          }
        }));
      } catch (error: any) {
        dispatch(errorUsers(error.response?.data?.message || error.message));
      }
    };



export const createUser =
  (user: Omit<User, "id">) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await apiClient.post("/users", user);
    } catch (error: any) {
      dispatch(errorUsers(error.response?.data?.message || error.message));
    }
  };

export const updateUser =
  (id: number, user: Partial<User>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await apiClient.put(`/users/${id}`, user);
    } catch (error: any) {
      dispatch(errorUsers(error.response?.data?.message || error.message));
    }
  };

export const deleteUser =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      await apiClient.delete(`/users/${id}`);

      const state = getState();
      const lastParams = (state.users as any)?.params || {};

      dispatch(fetchUsers(lastParams));
    } catch (error: any) {
      dispatch(errorUsers(error.response?.data?.message || error.message));
    }
  };
