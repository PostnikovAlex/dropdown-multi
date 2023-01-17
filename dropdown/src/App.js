import { useState } from 'react';

import styles from './App.module.scss';
import Dropdown from './components/ui/dropdown/Dropdown.tsx';
import { DROPDOWN_LIST } from './consts/consts.ts';

function App() {
  const [selectedOption, setSelectedOptions] = useState([]);
  return (
    <div className={styles.App}>
      <Dropdown
        isMultiSelect={true}
        label="Язык"
        withFlags={true}
        options={DROPDOWN_LIST}
        setOptions={options => setSelectedOptions(options)}
      />
    </div>
  );
}

export default App;
