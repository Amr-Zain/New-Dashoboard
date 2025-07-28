"use client";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "@tanstack/react-router";

type Props = {
  to: string; 
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
