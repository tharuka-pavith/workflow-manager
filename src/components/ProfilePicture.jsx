import React, { useState } from 'react';

// MUI components
import { Avatar, Button } from '@mui/material';


/**ProfilePicture component */
const ProfilePicture = ({ src, onChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div>
      <Avatar sx={{width: "200px", height: "200px"}} src={src} />
      <input
        accept="image/*"
        id="profile-picture-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="profile-picture-upload">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};

export default ProfilePicture;
