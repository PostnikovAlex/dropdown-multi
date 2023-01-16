import { FLAGS } from '@consts/consts';
import React, { FC, MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import { VoidFunctionComponent } from 'react';

import styles from './styles.module.scss';

interface IOption {
  id: number;
  value: string;
  label: string;
}

interface Iprops {
  label: string;
  options: Array<IOption>;
  setOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>;
}
const Dropdown: FC<Iprops> = ({ label, options, setOptions }): any => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [optionsToShow, setOptionsToShow] = useState(options);
  const [selected, setSelected] = useState([]);
  const handleOpen: MouseEventHandler = () => setOpen(!isOpen);
  const handleSearch = () => {};
  // const hadleSelect = (item: IOption) => {
  //   if (selected.some(selectedOption => selectedOption.id === item.id)) {
  //     setSelected();
  //   }
  // };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchBar} onClick={handleOpen}>
          <div className={styles.label}>
            <span className={styles.label_text}>{label}</span>
          </div>
          <div className={styles.select}> </div>
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdown__search}></div>
            <div className={styles.dropContainer}>
              <div className={styles.item}>
                <div className={styles.item__content}>
                  {optionsToShow.map(option => (
                    <div key={option.id} className={styles.item__content__item}>
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Dropdown;
