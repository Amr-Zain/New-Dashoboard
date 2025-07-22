"use client";
import React, { PropsWithChildren } from "react";
import { Link, useLocation } from "@tanstack/react-router"; // Changed imports

type Props = {
  to: string; // Changed href to to for consistency with TanStack Router's Link
  className?: any;
  onClick?: () => void;
};

const AppLink = ({ to, className = "", children, onClick }: PropsWithChildren<Props>) => {
  const location = useLocation();

  const normalizedPathname = location.pathname.replace(/^\/en/, '');
  const isActive = normalizedPathname === to || `/${normalizedPathname}` === to;


  return (
    <Link
      to={to}
      className={`${className} ${isActive ? "active-link" : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default AppLink;
