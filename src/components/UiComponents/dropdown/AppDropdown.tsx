import React from 'react';
import { Dropdown, DropdownProps } from 'antd';

import "@/styles/components/dropdown.scss"

interface AppDropdownProps extends DropdownProps {
  children: React.ReactNode;
}

const AppDropdown: React.FC<AppDropdownProps> = ({ children, ...rest }) => {
  return (
    <Dropdown {...rest}>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement)
        : <span>{children}</span>}
    </Dropdown>
  );
};

export default AppDropdown;
