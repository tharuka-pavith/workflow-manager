import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const {selectedValues, onChange} = props;

  const db = getFirestore();

  const [usersData, setUsersData] = useState([]);

  const handleValueChange = (event, values) => {
    onChange(values);
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
  
        const usersDataArray = [];
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const { user_id, fName, lName } = userData;
  
          // Create a map object with user_id as the key and full name as the value
          const userMap = {
            user_id,
            fullName: `${fName} ${lName}`
          };
  
          usersDataArray.push(userMap);
        });
  
        setUsersData(usersDataArray);
      } catch (error) {
        console.log('Error fetching users data:', error);
      }
    };
  
    fetchUsersData();
  }, []);
  

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={usersData}
      disableCloseOnSelect

      onChange={handleValueChange}
      getOptionLabel={(option) => option.fullName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.fullName}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Select Workflow" placeholder="Add Assignees" helperText="Select assignees"/>
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'Mr. Perera', year: 1994 },
  { title: 'Dr. Nimal', year: 1972 },
  { title: 'Dept. Head DEIE', year: 1974 },
  { title: 'Dept. Head CEE', year: 2008 },
  { title: 'Dept. Head DMME', year: 1957 },
  { title: "Dr. Kasun", year: 1993 },
  { title: 'Ms. Kamala', year: 1994 },
  {
    title: 'DR. Sarath',
    year: 2003,
  },
  { title: 'Assistant Registrar', year: 1966 },
  { title: 'Dean', year: 1999 },
  {
    title: 'Vice Chancellor',
    year: 2001,
  },
 
  
];