// src/components/Dropdown/Dropdown.tsx

import React, { useState } from 'react';
import DropdownItem from './DropdownItem';
import styles from './Dropdown.module.css';

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      {label && <label className={styles.label}>{label}</label>}
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected} <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <DropdownItem
              key={option}
              option={option}
              isSelected={option === selected}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
