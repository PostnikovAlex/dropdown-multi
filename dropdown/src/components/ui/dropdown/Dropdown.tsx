import React, { FC, MouseEventHandler, ReactElement, useEffect, useState } from 'react';

import { FLAGS } from '../../../consts/consts';
import { getFlag } from '../../../utils/utils';
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
  withFlags: boolean;
  isMultiSelect: boolean;
}
const Dropdown: FC<Iprops> = ({ label, options, setOptions, withFlags, isMultiSelect = false }): any => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectsToShow, setSelectsToShow] = useState(options);
  const [selected, setSelected] = useState<Array<IOption> | IOption>([]);
  const handleOpen: MouseEventHandler = () => setOpen(!isOpen);
  const handleSearch = (searchString: string) => {
    let filteredToShow = selectsToShow.filter(select => {
      return select.label.includes(searchString);
    });
    const resultArr = filteredToShow.length ? filteredToShow : selectsToShow;
    if (!searchString) {
      setSelectsToShow(options);
    } else {
      setSelectsToShow(resultArr);
    }
  };
  const hadleSelect = (item: IOption) => {
    if (Array.isArray(selected)) {
      if (!selected.some(selectedOption => selectedOption.id === item.id)) {
        if (!isMultiSelect) {
          setSelected(item);
        } else if (isMultiSelect) {
          setSelected([...selected, item]);
        }
      } else {
        // Что нужно доделать:
        // 2) поиск
        // 3) добавление выбранных инпутов
        const copy = selected.filter(copyItem => copyItem.id !== item.id);
        setSelected([...copy]);
      }
    }
  };

  const isSelected = (selectedId: number): any => {
    if (Array.isArray(selected)) {
      const found = selected.filter(option => option.id === selectedId);
      return found.length > 0 && true;
    }
  };
  const handleRemoveSelected = (e: React.MouseEvent, item: IOption) => {
    e.stopPropagation();
    if (Array.isArray(selected)) {
      const copy = selected.filter(copyItem => copyItem.id !== item.id);
      setSelected([...copy]);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchBar} onClick={handleOpen}>
          <div className={styles.label}>
            <span className={styles.label_text}>{label}</span>
          </div>
          <div className={styles.select}>
            {Array.isArray(selected) &&
              selected.map(select => (
                <div className={styles.inputItem}>
                  {select.label}
                  <span className={styles.inputItem__close} onClick={e => handleRemoveSelected(e, select)}></span>
                </div>
              ))}
          </div>
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdown__search}>
              <div className={styles.icon}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.50006 0C8.53765 0 11.0001 2.46256 11.0001 5.50029C11.0001 6.74868 10.5842 7.89993 9.88346 8.82304L13.7791 12.7233C14.0718 13.0164 14.0715 13.4913 13.7785 13.784C13.4854 14.0767 13.0105 14.0764 12.7178 13.7834L8.82266 9.88388C7.89959 10.5847 6.74839 11.0006 5.50006 11.0006C2.46246 11.0006 0 8.53802 0 5.50029C0 2.46256 2.46246 0 5.50006 0ZM5.50006 1.5C3.2909 1.5 1.5 3.29098 1.5 5.50029C1.5 7.70961 3.2909 9.50058 5.50006 9.50058C7.70921 9.50058 9.50011 7.70961 9.50011 5.50029C9.50011 3.29098 7.70921 1.5 5.50006 1.5Z"
                    fill="#C1C1C1"
                  />
                </svg>
              </div>
              <input type="text" onChange={evt => handleSearch(evt.target.value) as any} placeholder="Поиск"></input>
            </div>
            <div className={styles.dropContainer}>
              {selectsToShow.map(select => (
                <div
                  key={select.id}
                  className={styles.item}
                  onClick={() => hadleSelect(select) as MouseEventHandler<HTMLDivElement> | undefined}
                >
                  <div className={styles.option}>
                    {getFlag(select.value) && withFlags ? <img src={getFlag(select.value)} className={styles.img} alt="flag" /> : null}
                    <div>{select.label}</div>
                  </div>
                  {isMultiSelect && (
                    <div className={[styles.checkbox, isSelected(select.id) ? styles.checkbox__active : ''].join(' ')}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Dropdown;
