import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useUser } from '../../contexts/userContext';
import { useRouter } from '../../contexts/RouterContext';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '@mui/material';
import './Header.css';
import { useTheme } from '../../contexts/themeContext';
export default function Header() {
  const {logout} = useUser();
  const {setHomeRouter,HomeRoutes} = useRouter()
  const {Themes,theme_,dark,light} = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center',flexDirection:'row',justifyContent:'space-between',borderBottom:'solid 2px #f3f3f3',boxShadow:'0px 1px 1px rgba(0,0,0,0.32)',pl:5}}>
      <Box sx={{ display: 'flex', alignItems: 'center',flexDirection:'row'}}>
        <Button variant="standard" startIcon={<AssignmentIcon color={'primary'}/>}
          onClick={()=>setHomeRouter(HomeRoutes.tasks)}
          >
          <Typography color={'primary'}><b>Tasks</b></Typography>
        </Button>
        <div className='nav'>
          <Typography color={'primary'} 
            onClick={()=>setHomeRouter(HomeRoutes.taskAdd)}
          >+ Task</Typography>
        </div>
        <div className='nav'>
          <Typography color={'primary'} className='nav'
            onClick={()=>setHomeRouter(HomeRoutes.dash)}
          >DashBoard</Typography>          
        </div>
      </Box>

      
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',justifyContent:'flex-end',p:1,columnGap:'10px' }}>
      {theme_ === Themes.dark?<IconButton onClick={light} color='primary' size='small' style={{border:'solid 1px #f3f3f3',borderRadius:'5px',pointerEvents: 'stroke' }}>
            <DarkModeIcon/>
        </IconButton>:
        <IconButton onClick={dark} color='primary' size='small' style={{border:'solid 1px #f3f3f3',borderRadius:'5px',pointerEvents: 'stroke' }}>
            <LightModeIcon/>
        </IconButton>
      }
        <IconButton color='primary' size='small' style={{border:'solid 1px #f3f3f3',borderRadius:'5px',pointerEvents: 'stroke' }}
          href='https://github.com/AbderafieChairi/mern'
        >
          <GitHubIcon />
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            color="primary"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={e=>{
          handleClose(e);
          setHomeRouter(HomeRoutes.profile);
        }}>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={e=>{
          handleClose(e);
          logout();
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}