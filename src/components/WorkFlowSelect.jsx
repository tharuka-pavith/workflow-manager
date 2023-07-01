import * as React from 'react';

// React hooks
import { useEffect, useState } from 'react';

// MUI components
import {Autocomplete, TextField, Checkbox} from '@mui/material';

//MUI icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Firebase components
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**WorkflowSelect component */
export default function WorkflowSelect(props) {
  const {selectedValues, onChange} = props;

  console.log(selectedValues); // not necessary (Todo: remove)

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
  }, [db]);
  

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
