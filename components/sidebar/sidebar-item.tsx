"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { isMenuActive } from "./utils";

export default function SidebarMenuItem({
  item,
  pathname,
  theme,
  open,
  openMenus,
  toggleMenu,
  mounted,
  onClose,
}: any) {
  const router = useRouter();
  const isOpen = openMenus[item.key] || false;
  const isActive = isMenuActive(item, pathname);
  const split = pathname.split('/')
  const firstPath = '/' + split[1]

  if (item.children) {
    return (
      <div key={item.key}>
        {/* Parent */}
        <div className="flex items-center">
          {isActive && open ? (
            <div className="h-[30px] w-[5px] bg-primary-300 ml-2 mr-1 rounded-lg"></div>
          ) : (
            <div className="h-[30px] w-[5px] ml-2 mr-1"></div>
          )}
          <button
            type="button"
            onClick={() => toggleMenu(item.key)}
            className={`flex items-center cursor-pointer p-3 my-1 mr-2 rounded-lg text-sm w-[100%] border-none
              ${mounted && theme === "light"
                ? isActive ? "bg-primary-100 text-primary-700 font-semibold hover:bg-primary-50" : "bg-transparent hover:bg-primary-50 hover:text-primary-700"
                : isActive ? "bg-primary-700 text-primary-100 font-semibold hover:bg-primary-700" : "bg-transparent hover:bg-primary-700 hover:text-primary-50"}`}
          >
            <div className={`${open && "mr-1"}`}>{item.icon}</div>
            {open && (
              <div className="flex justify-between w-full items-center">
                {item.label}
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"
                    }`}
                />
              </div>
            )}
          </button>
        </div>

        {/* Children with animation */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen && open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="transition-all duration-300 ease-in-out ml-8">
            {item.children.map((child: any) => (
              <button
                type="button"
                key={child.key}
                onClick={() => {
                  onClose?.()
                  router.push(child.path!)
                }}
                className="w-full text-left bg-transparent border-none"
              >
                <div
                  className={`flex py-2 px-3 my-1 items-center rounded-md cursor-pointer text-[13px] mr-2
                    ${mounted && theme === "light"
                      ? child.path === firstPath ? "text-primary-700 font-semibold hover:text-primary-700" : "hover:text-primary-700"
                      : child.path === firstPath ? "text-primary-100 font-semibold hover:text-primary-100" : "hover:text-primary-50"}`}
                >
                  {child.label}
                </div>
              </button>
            )
            )}
          </div>
        </div>
      </div>
    );
  }

  // Normal item
  return (
    <button
      type="button"
      key={item.key}
      onClick={() => {
        onClose?.()
        router.push(item.path!)
      }}
      className="flex items-center w-full bg-transparent border-none"
    >
      {item.path === firstPath && open ? (
        <div className="h-[30px] w-[5px] bg-primary-300 ml-2 mr-1 rounded-lg"></div>
      ) : (
        <div className="h-[30px] w-[5px] ml-2 mr-1"></div>
      )}
      <div
        className={`flex p-3 my-1 items-center mr-2 w-[100%] rounded-lg cursor-pointer text-sm
          ${mounted && theme === "light"
            ? firstPath === item.path ? "bg-primary-100 text-primary-700 font-semibold hover:bg-primary-50" : "hover:bg-primary-50 hover:text-primary-700"
            : firstPath === item.path ? "bg-primary-700 text-primary-100 font-semibold" : "hover:bg-primary-700 hover:text-primary-50"}`}
      >
        <div className={`${open && "mr-1"}`}>{item.icon}</div>
        {open && item.label}
      </div>
    </button>
  );
}
