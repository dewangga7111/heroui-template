export const breadcrumbsItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Settings",
    children: [
      {
        label: "Users",
        path: "/users",
        children: [
          {
            label: "Add Users",
            path: "/users/add",
          },
          {
            label: "Edit Users",
            path: "/users/edit",
          }
        ]
      },
    ],
  },
  {
    label: "Logout",
    path: "/logout",
  },
];
