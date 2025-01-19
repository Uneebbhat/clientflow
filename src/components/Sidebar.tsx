"use client";
import Image from "next/image";
import React, { useState } from "react";
import AgencySwitch from "@/components/AgencySwitch";
import {
  Archive,
  Building,
  ClipboardList,
  Fingerprint,
  LayoutDashboard,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: "Manage Agency",
      href: "/manage-agency",
      icon: <Building />,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: <MessageCircle />,
    },
    {
      name: "Bucket",
      href: "/bucket",
      icon: <Archive />,
    },
    {
      name: "Leaves",
      href: "/leaves",
      icon: <LayoutDashboard />,
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: <Fingerprint />,
    },
    {
      name: "Launchpad",
      href: "/launchpad",
      icon: <ClipboardList />,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          h-screen
          overflow-y-auto
          min-w-[250px] lg:min-w-[40px]
          py-[40px] px-[20px]
          border-r-2
          bg-white
          z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-center">
            <Image
              src="/black-logo.png"
              alt="ClientFlow"
              width={230}
              height={100}
              className="w-auto h-auto"
            />
          </div>
          <div>
            <AgencySwitch />
          </div>
          <div>
            <nav className="flex flex-col gap-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`
                    flex items-center gap-[10px]
                    hover:bg-black-900 hover:text-white
                    transition-all rounded-[8px]
                    px-[16px] py-[8px]
                    text-black-500
                    ${
                      pathName === route.href
                        ? "bg-black-500 text-white"
                        : "bg-white"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {route.icon}
                  <span className="whitespace-nowrap">{route.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
