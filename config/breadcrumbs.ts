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
      {
        label: "Roles",
        path: "/roles",
        children: [
          {
            label: "Add Roles",
            path: "/roles/add",
          },
          {
            label: "Edit Roles",
            path: "/roles/edit",
          },
          {
            label: "Edit Permission",
            path: "/roles/permission",
          }
        ]
      },
    ],
  },
];
