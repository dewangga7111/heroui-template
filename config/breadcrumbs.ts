export const breadcrumbsItems = [
  {
    label: "Home",
    path: "/",
  },
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
    label: "Settings",
    children: [
      {
        label: "Blog",
        path: "/blog",
        children: [
          {
            label: "Blog 2",
            path: "/blog/blog-2",
          },
        ]
      },
      {
        label: "Security",
        path: "/settings/security",
      },
      {
        label: "Notifications",
        path: "/settings/notifications",
      },
    ],
  },
  {
    label: "Logout",
    path: "/logout",
  },
];
