import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import MailIcon from 'material-ui-icons/Mail';
import Notifications from 'material-ui-icons/Notifications';
import HomeIcon from 'material-ui-icons/Home';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import api from '../../consts';
import axios from 'axios';
import Menu, { MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import {reactLocalStorage} from 'reactjs-localstorage';

const logo = require('../../images/gitpay-logo.png');

const styles = {
  logoMain: {
    marginLeft: 80
  },
  logoAlt: {
    marginLeft: -60
  },
  containerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  notifications: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30
  },
  intro: {
    padding: 20,
    margin: 0,
    textAlign: 'center',
    height: 40,
    width: '100%',
    backgroundColor: 'black'
  },
  avatar: {
    marginLeft: 40
  }
};

class TopBar extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      anchorEl: null,
      notify: false,
      notifyLogin: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignIn = this.handleSignOut.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleCloseLoginNotification = this.handleCloseLoginNotification.bind(this);

  }

  componentDidMount() {
    const token = reactLocalStorage.get('token');
    axios.get(api.API_URL + '/authenticated', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        this.setState({logged: true, notifyLogin: true});
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event, checked) {
    this.setState({ auth: checked });
  };

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  handleCloseNotification() {
    this.setState({ notify: false });
  }

  handleCloseLoginNotification() {
    this.setState({ notifyLogin: false });
  }

  handleSignIn() {

  }

  handleSignOut() {
    reactLocalStorage.set('token', false);
    this.setState({notify: true, logged: false});
  }

  render() {
    const isLoggedIn = this.state.logged;
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);
    return (
      <div style={styles.intro}>
        <div style={styles.containerBar}>
          <Button href="/">
            <HomeIcon color="primary"/>
          </Button>
            <img style={isLoggedIn ? styles.logoMain : styles.logoAlt } src={logo} width="140"/>
            <div style={styles.notifications}>
              { isLoggedIn &&
              <div style={styles.notifications}>
                <Badge badgeContent={4} color="secondary">
                  <Notifications color="primary"/>
                </Badge>
                <Avatar onClick={this.handleMenu} style={styles.avatar}>AM</Avatar>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    Sua conta
                  </MenuItem>
                  <MenuItem onClick={this.handleSignOut}>
                    Sair
                  </MenuItem>
                </Menu>
              </div>
              }
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.notify}
                autoHideDuration={3000}
                SnackbarContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Você saiu da plataforma</span>}
                action={[
                  <Button key="undo" color="secondary" size="small" onClick={this.handleSignIn}>
                    Entrar Novamente?
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleCloseNotification}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.notifyLogin && isLoggedIn}
                autoHideDuration={3000}
                SnackbarContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Você foi logado com sucesso</span>}
                action={[
                  <Button key="undo" color="secondary" size="small" onClick={this.handleSignIn}>
                    Sair?
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleCloseLoginNotification}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
          </div>
        </div>
      </div>
    )
  }
};

export default withStyles(styles)(TopBar);