import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users-slice";
import rolesReducer from "./slices/roles-slice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;