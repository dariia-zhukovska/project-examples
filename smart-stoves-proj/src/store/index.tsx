import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersAuth/api";
import { profileApi } from "./profileInfo/api";
import { communitiesApi } from "./communities/api";
import { testApi } from "./usersAuth/testApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [communitiesApi.reducerPath]: communitiesApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      usersApi.middleware,
      profileApi.middleware,
      communitiesApi.middleware,
      testApi.middleware
    );
  },
});
