const moduleConfig = {
  menu: {
    MENU_ID_USER: "USERS_PAGE",
  },
  path: {
    USERS: "/users",
    UNAUTHORIZED: "/misc/403",
    LOGIN: "/auth/login",
  },
  confirmation: {
    DELETE: "Are you sure you want to delete this data?",
    SAVE: "Are you sure you want to save this data?",
    LOGOUT: "Are you sure you want to logout?"
  },
  toast: {
    SUCCESS_LOGIN: "Login Successfully",
    SUCCESS_DELETE: "Data Deleted Successfully",
    SUCCESS_SAVE: "Data Saved Successfully",
    SUCCESS_LOGOUT: "You have been loged out!"
  }
};

export default moduleConfig;
