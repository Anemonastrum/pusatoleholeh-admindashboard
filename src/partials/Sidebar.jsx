import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  Ticket,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  Box,
  ChevronsRight,
  ChevronDown,
  UserPlus,
  UserCog,
  LogOut,
  Image
} from 'lucide-react';

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="/images/Hydro.svg" alt="" className="h-12 auto" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Admin Dashboard</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("dashboard")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname === "/" || pathname.includes("dashboard") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <LayoutDashboard className={`shrink-0 h-4 w-4 ${pathname === "/" || pathname.includes("dashboard") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Home
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Users Group */}
              <SidebarLinkGroup activecondition={pathname.includes("seller") || pathname.includes("buyer")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("seller") || pathname.includes("buyer") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className={`shrink-0 h-4 w-4 ${pathname.includes("seller") || pathname.includes("buyer") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Users
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <ChevronDown className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/seller"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sellers
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/buyer"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Buyers
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Notification Management */}
              <SidebarLinkGroup activecondition={pathname.includes("notification")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/notification"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("notification") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center">
                          <Bell className={`shrink-0 h-4 w-4 ${pathname.includes("notification") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Notifications
                          </span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* Marketplace Content */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Marketplace Content</span>
            </h3>
            <ul className="mt-3">
              {/* Categories */}
              <SidebarLinkGroup activecondition={pathname.includes("category")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/category"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("category") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center">
                          <Store className={`shrink-0 h-4 w-4 ${pathname.includes("category") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Categories
                          </span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes("banner")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/banner"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("banner") ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center">
                          <Image className={`shrink-0 h-4 w-4 ${pathname.includes("banner") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Banners</span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Vouchers */}
              <SidebarLinkGroup activecondition={pathname.includes("voucher")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/voucher"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("voucher") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center">
                          <Ticket className={`shrink-0 h-4 w-4 ${pathname.includes("voucher") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Vouchers
                          </span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Blog Management */}
              <SidebarLinkGroup activecondition={pathname.includes("blog")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/blog"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("blog") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center">
                          <FileText className={`shrink-0 h-4 w-4 ${pathname.includes("blog") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Blog Posts
                          </span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">MORE</span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}

              {/* Admin Profile */}
              <SidebarLinkGroup activecondition={pathname.includes("profile")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/profile"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("profile") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        <div className="flex items-center">
                          <UserCog className={`shrink-0 h-4 w-4 ${pathname.includes("profile") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Admin Profile
                          </span>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Registration */}
              <SidebarLinkGroup activecondition={pathname.includes("register")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("register") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <UserPlus className={`shrink-0 h-4 w-4 ${pathname.includes("register") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Registration
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <ChevronDown className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/register/admin"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                New Admin
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${open ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Settings className={`shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <ChevronDown className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://status.anemona.site/">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Help */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${open ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <HelpCircle className={`shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Help
                            </span>
                          </div>
                          {/* Icon */}
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <ChevronsRight className={`w-6 h-6 text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
