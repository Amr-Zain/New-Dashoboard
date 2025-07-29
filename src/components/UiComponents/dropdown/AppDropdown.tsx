import React from 'react';
import { Dropdown, DropdownProps } from 'antd';

import "@/styles/components/dropdown.scss"

interface AppDropdownProps extends DropdownProps {
  children: React.ReactElement; 
}

const AppDropdown: React.FC<AppDropdownProps> = ({ children, ...rest }) => {
  return (
    <Dropdown {...rest}>
      {children}
    </Dropdown>
  );
};

export default AppDropdown;