// src/components/Dropdown/DropdownItem.tsx

import React from 'react';
import styles from './Dropdown.module.css';

interface DropdownItemProps {
  option: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={`${styles.dropdownItem} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(option)}
    >
      {option}
    </div>
  );
};

export default DropdownItem;
