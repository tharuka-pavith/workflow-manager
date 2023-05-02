import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Select Workflow" placeholder="Add Assignees" />
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