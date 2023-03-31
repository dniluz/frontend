import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { AuthContext } from "../../contexts/AuthContext";
import jwt_decode from 'jwt-decode';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LinkTab(props) {
  return (
    <Tab
      sx={{ color: '#9CA9B3', fontWeight: '300', '&.Mui-selected': { color: '#768d5c', borderBottom: '2px solid #9CA9B3' } }}
      component="div"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}} className="-mt-20">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AdminPanel = ({
  className,
  children,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const { user } = useContext(AuthContext);
  const userDecoded = user ? jwt_decode(user.accessToken) : null;
  
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [uuid, setUuid] = React.useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openBan, setOpenBan] = React.useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenBan = () => setOpenBan(true);
  const handleCloseBan = () => setOpenBan(false);

  const outerClasses = classNames(
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteUser = React.useCallback(
    (uuid) => () => {
      setUuid(uuid);
      handleOpenDelete();
    },
    [],
  );

  const editUser = React.useCallback(
    (uuid) => () => {
      //
    },
    [],
  );

  const banUser = React.useCallback(
    (uuid) => () => {
      setUuid(uuid);
      handleOpenBan();
    },
    [],
  );

  async function actualDeleteUser() {
    await axios.delete(process.env.REACT_APP_API_URL + 'user/' + uuid);
    if (openDelete) {
      handleCloseDelete();
    }
    const res = await axios.get(process.env.REACT_APP_API_URL + 'users');
    setUsers(res.data.data);
  }

  async function actualBanUser() {
    await axios.patch(process.env.REACT_APP_API_URL + 'user/' + uuid + '/changeBan');
    if (openBan) {
      handleCloseBan();
    }
  }

  useEffect(() => {
    if (userDecoded !== null) {
      if ( userDecoded.role !== 'admin' || userDecoded.role !== 'owner') {
        //window.location.href = '/';
        console.log('You are not admin!');
      }
    } else {
     // window.location.href = '/';
    }

    console.log(userDecoded);

    const fetchUsers = async () => {
      const res = await axios.get(process.env.REACT_APP_API_URL + 'users');
      setUsers(res.data.data);
    };
    fetchUsers();
  }, []);

  const columns = React.useMemo(
    () => [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'uuid', headerName: 'User UID', width: 335 },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'verification', headerName: 'V.L.', width: 30 },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteOutlineTwoToneIcon />}
          label="Delete User"
          onClick={deleteUser(params.row.uuid)}
        />,
        <GridActionsCellItem
          icon={<CreateTwoToneIcon />}
          label="Edit User"
          onClick={editUser(params.row.uuid)}
        />,
        <GridActionsCellItem
          icon={<BlockTwoToneIcon />}
          label="Ban User"
          onClick={banUser(params.row.uuid)}
        />,
      ],
    },
  ],
  [deleteUser, editUser, banUser]
  );

  const rows = users.map((user) => {
    return {
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      role: user.role,
      verification: user.verification_level,
    };
  });

  return (
    <div>
      {userDecoded !== null ? (
        <div>
          {userDecoded.role === 'admin' || userDecoded.role === 'owner' ? (
          <section
            {...props}
            className={outerClasses}
          >
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='center-content'
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete this user?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This action cannot be reversed.
              </Typography>
              <div className='mt-3'>
                <Button variant="contained" onClick={actualDeleteUser}>Confirm</Button>
              </div>
            </Box>
          </Modal>

          <Modal
            open={openBan}
            onClose={handleCloseBan}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='center-content'
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to ban this user?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This action will block users's access to the exchange functions.
              </Typography>
              <div className='mt-3'>
                <Button variant="contained" onClick={actualBanUser}>Confirm</Button>
              </div>
            </Box>
          </Modal>

            <div className="container">
              <div className={innerClasses}>
                <div className="section-header center-content" style={{marginTop: '-50px'}}>
                    <p className="m-0">This page is highli confidential, any unauthorized access will be reported to the authorities.</p>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                  <Box sx={{ width: '100%' }} style={{marginTop: '-50px'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered>
                      <LinkTab label="User" href="/user-settings" />
                      <LinkTab label="Company" href="/user-security" />
                      <LinkTab label="Security" href="/user-security" />
                    </Tabs>
                  </Box>
                </div>
              </div>
              <TabPanel value={value} index={0} style={{marginTop: '-400px'}}>
                { users.length > 0 ? (
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
                ) : null }
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h1>2</h1>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <h1>3</h1>
              </TabPanel>
            </div>
          </section>
          ) : null }
        </div>
      ) : null }
    </div>
  );
}

AdminPanel.propTypes = propTypes;
AdminPanel.defaultProps = defaultProps;

export default AdminPanel;