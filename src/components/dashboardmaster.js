import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer, CssBaseline, AppBar, Toolbar, Typography,List, Divider, IconButton, 
    ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Collapse, Navbar, NavItem, Nav } from 'reactstrap';
import { useHistory } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    margin:"0px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Reva Institute of Technology
          </Typography>
          {/* <div className="d-flex justify-content-end">
          <NotificationsIcon style={{float:"right"}} />
          </div> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <img style={{ height: "30rem",width:"30rem", padding: "0.8em", margin:"-41px 0px" }} src='https://scontent.fblr19-1.fna.fbcdn.net/v/t1.0-9/71484341_110051727062043_6492021510910246912_n.jpg?_nc_cat=100&ccb=3&_nc_sid=09cbfe&_nc_ohc=qKJ1OdUFSrwAX8E_mAM&_nc_ht=scontent.fblr19-1.fna&oh=991110848c666e1ada74a1b168ec73c8&oe=6060D70C'></img>
        <Divider />
        <List>
          <ListItem button key={"Home"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Home"} onClick={() => history.push('/profile') } />
          </ListItem>
          <ListItem button  key={"Circulars"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Circulars"} onClick={() => history.push('/circulars') } />
          </ListItem>
          <ListItem button  key={"Activities"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Activities"} onClick={() => history.push('/activities') } />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}