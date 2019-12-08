import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    maxHeight: theme.spacing(5),
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    flex: 1,
    marginLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    marginRight: theme.spacing(0),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: theme.spacing(1),
    border: theme.spacing(0),
    color: 'white',
    height: theme.spacing(5),
    padding: theme.spacing(1, 5, 1, 5),
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

export default function Navbar({ component: Component, ...rest }) {
  
  const classes = useStyles();

  const [searchContent, setSearchContent] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [navAnchorEl, setNavAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNavMenuOpen = Boolean(navAnchorEl);

  const handleProfileMenuOpen = event => { setAnchorEl(event.currentTarget); };

  const handleMobileMenuOpen = event => { setMobileMoreAnchorEl(event.currentTarget); };
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };

  const handleNavMenuOpen = event => { setNavAnchorEl(event.currentTarget); };
  const handleNavMenuClose = () => { setNavAnchorEl(null); };

  const handleLogoutButton = () => { localStorage.clear(); window.location.href='/login' }
  const handleProfileButton = () => { window.location.href='/profile' }
  const searchOperator = (e) => {
    e.preventDefault();
    if (searchContent === null) {
      return
    }else{
      window.location.href='/search?name='+ searchContent
    }
  }

  // desktop version: left menu
  const renderNavMenu = (
    <Menu
      id="primary-search-account-menu-nav"
      anchorEl={navAnchorEl}
      keepMounted
      open={isNavMenuOpen}
      onClose={handleNavMenuClose}
    >
      <MenuItem>
        <Button className={classes.button}  onClick={(e) => {e.preventDefault(); window.location.href='/'}}>
          Home
        </Button>
      </MenuItem>
      <MenuItem>
        <Button className={classes.button}  onClick={(e) => {e.preventDefault(); window.location.href='/list'}}>
          All movies
        </Button>
      </MenuItem>
    </Menu>
  );

  // desktop version: right menu after login
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='primary-search-account-menu'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileButton}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutButton}>Log out</MenuItem>
    </Menu>
  );

  // mobile version for above components
  const renderMobileMenu = (
  <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='primary-search-account-menu-mobile'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleNavMenuOpen}
          >
          <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
           Fresh Potatoes
          </Typography>
          <Paper component="form" className={classes.search}>
            <IconButton type="button" onClick={searchOperator} className={classes.searchIcon} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search…"
              className={classes.inputInput}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {e.preventDefault(); setSearchContent(e.target.value)}}
            />
          </Paper>
          <div className={classes.grow} />

          {/* check if is login, then display different content on the top right */}

          {/* desktop version */}
          {localStorage.getItem('is_login') ? 
          (<div className={classes.sectionDesktop} >
            <IconButton edge="end" onClick={handleProfileMenuOpen}>
              <AccountCircle />
              {localStorage.getItem('name')}
            </IconButton>
          </div>):
          (
          <Button className={classes.button} onClick={event =>  window.location.href='/login'}>
            LogIn
          </Button>
          )}

          {/* mobile version */}
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNavMenu}
    </div>
  );
}
