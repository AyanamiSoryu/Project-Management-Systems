import AddIcon from '@mui/icons-material/Add';
import { AppBar, Button, Tab, Tabs, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TaskModal from '../../smart-components/TaskModal/Task-modal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpened, setModal] = useState<boolean>(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <>
      <AppBar position='static' sx={{ mb: 2 }}>
        <Toolbar>
          <Tabs
            value={location.pathname.startsWith('/board') ? '/boards' : location.pathname}
            onChange={handleTabChange}
            textColor='inherit'
            indicatorColor='secondary'
            sx={{ flexGrow: 1 }}>
            <Tab label='Все задачи' value='/issues' />
            <Tab label='Проекты' value='/boards' />
          </Tabs>
          <Button color='inherit' variant='outlined' endIcon={<AddIcon />} onClick={() => setModal(true)}>
            Создать задачу
          </Button>
        </Toolbar>
      </AppBar>
      <TaskModal open={isModalOpened} onClose={() => setModal(false)} />
    </>
  );
};

export default Header;
