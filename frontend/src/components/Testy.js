import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberDetails } from './api'; // API 호출 함수
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Testy = () => {
  const { userPK } = useParams();
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    getMemberDetails(userPK)
      .then((response) => {
        const { data } = response;
        setMemberDetails(data.meminfo);
      })
      .catch((error) => {
        console.error('Error fetching member details:', error);
      });
  }, [userPK]);

  if (!memberDetails) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3, width: '50%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Member Details
      </Typography>
      <Typography variant="h6">Username: {memberDetails.username}</Typography>
      <Typography variant="h6">Nickname: {memberDetails.userNickname}</Typography>
      <Typography variant="h6">Address: {memberDetails.userAddress}</Typography>
      <Typography variant="h6">Phone Number: {memberDetails.userPhoneNumber}</Typography>
    </Box>
  );
};

export default Testy;
