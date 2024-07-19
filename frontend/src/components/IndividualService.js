import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceMembers, updateService, deleteMember, addMember, deleteService } from './api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavigationBar from './NavigationBar';

const IndividualService = () => {
  const { eduPK } = useParams();
  const navigate = useNavigate();
  console.log('eduparams: ', eduPK);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [eduDetails, setEduDetails] = useState({
    eduName: '',
    eduDay: '',
    eduStart: '',
    eduEnd: ''
  });
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    console.log('Received eduPK:', eduPK);
    getServiceMembers(eduPK)
      .then((response) => {
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
        setMembers([]);
      });
  }, [eduPK]);

  const handleUpdateService = () => {
    const { eduName, eduDay, eduStart, eduEnd } = eduDetails;
    updateService(eduPK, eduName, eduDay, eduStart, eduEnd)
      .then((response) => {
        console.log('Service updated:', response);
      })
      .catch((error) => {
        console.error('Error updating service:', error);
      });
  };

  const handleDeleteMembers = () => {
    selectedMembers.forEach((memberId) => {
      deleteMember(eduPK, memberId)
        .then((response) => {
          console.log('Member deleted:', response);
          setMembers(members.filter((member) => member.userPK !== memberId));
        })
        .catch((error) => {
          console.error('Error deleting member:', error);
        });
    });
    setSelectedMembers([]);
  };

  const handleAddMember = () => {
    addMember(eduPK, newMemberId)
      .then((response) => {
        console.log('Member added:', response);
        setMembers([...members, { userPK: newMemberId, username: newMemberId }]);
        setNewMemberId('');
      })
      .catch((error) => {
        console.error('Error adding member:', error);
      });
  };

  const handleDeleteService = () => {
    deleteService(eduPK)
      .then((response) => {
        console.log('Service deleted:', response);
        navigate('/service');
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
      });
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEduDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavigationBar />
      <Box sx={{ flexGrow: 1, p: 3, width: '50%', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          수업 정보
        </Typography>
        <TextField
          label="수업명"
          name="eduName"
          value={eduDetails.eduName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 요일"
          name="eduDay"
          value={eduDetails.eduDay}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 시작 시간"
          name="eduStart"
          value={eduDetails.eduStart}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 종료 시간"
          name="eduEnd"
          value={eduDetails.eduEnd}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" onClick={handleUpdateService} sx={{ mr: 2 }}>
            Update
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteService}>
            Delete Service
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          수업 수강생 목록
        </Typography>
        <List>
          {members.map((member, index) => (
            <ListItem key={index} secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleCheckboxChange(member.userPK)}
                checked={selectedMembers.includes(member.userPK)}
              />
            }>
              <ListItemText primary={member.username} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <TextField
            label="Add Member ID"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            margin="normal"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={handleAddMember} sx={{ ml: 2 }}>
              Add
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteMembers} sx={{ ml: 2 }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default IndividualService;
