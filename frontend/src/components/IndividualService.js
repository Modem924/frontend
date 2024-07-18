import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceMembers } from './api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const IndividualService = () => {
  const { eduPK } = useParams();
  const [members, setMembers] = useState([]); // Initialize as an array

  useEffect(() => {
    console.log('Received eduPK:', eduPK);  // Confirm received eduPK
    getServiceMembers(eduPK)
      .then((response) => {
        // Ensure the response contains the data property and it's an array
        const { data } = response;
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error('Expected an array but received:', response);
          setMembers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching service members:', error);
        setMembers([]); // Set to empty array on error
      });
  }, [eduPK]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        수업 수강생 목록
      </Typography>
      <List>
        {members.map((member, index) => (
          <ListItem key={index}>
            <ListItemText primary={member.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default IndividualService;
