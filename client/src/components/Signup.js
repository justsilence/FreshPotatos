import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/PersonPin';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/VpnKey';
import UserIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

// signup function
const signup = function(e, email, password, name) {
  e.preventDefault();
  if (email === undefined || password === undefined || name === undefined) {
    window.alert("Please provide valid email, password and name");
  } else if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    fetch('https://web-final-demo.azurewebsites.net/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({'email': email, 'password': password, 'name': name, "isAdmin": false}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === "User created"){
        // then we do login
        fetch('https://web-final-demo.azurewebsites.net/api/user/login', {
          method: 'POST',
          body: JSON.stringify({'email': email, 'password': password}),
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        .then(r => r.json())
        .then(r => {window.sessionStorage.setItem('is_login', r.auth);
          window.sessionStorage.setItem('is_admin', r.isAdmin);
          window.sessionStorage.setItem('token', r.token);
          window.sessionStorage.setItem('name', r.name);
          window.sessionStorage.setItem('email', r.email);
                      window.location.href='/';
                      })
      }else{
        window.alert(res.message);
      }
    });
  } else {
    window.alert('invalid email');
  }
}

// Signup component
class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
    this.showEmailInput = this.showEmailInput.bind(this);
    this.showPasswordInput = this.showPasswordInput.bind(this);
    this.showUserNameInput = this.showUserNameInput.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  showEmailInput(){
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={this.state.email}
        onChange={this.handleChangeEmail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        type='email'
        autoComplete="email"
        autoFocus
      />
    )
  }
  showPasswordInput(){
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        value={this.state.password}
        onChange={this.handleChangePassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
        type="password"
        autoComplete="current-password"
      />
    )
  }
  showUserNameInput(){
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={this.state.name}
        onChange={this.handleChangeName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <UserIcon />
            </InputAdornment>
          ),
        }}
        type="text"
      />
    )
  }
  showButtons(){
    return (
      <Grid container>
        <Grid item xs className={this.props.classes.grid}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
            onClick={(e) => {signup(e, this.state.email, this.state.password, this.state.name)}}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    )
  }
  handleChangeEmail(event) { this.setState({email: event.target.value}); }
  handleChangePassword(event) { this.setState({password: event.target.value}); }
  handleChangeName(event) { this.setState({name: event.target.value}); }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          {/* sign up avatar */}
          <Avatar className={this.props.classes.icon}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <form className={this.props.classes.form} noValidate>
            {/* email input field */}
            {this.showEmailInput()}
            {/* password input field */}
            {this.showPasswordInput()}
            {/* user name input field */}
            {this.showUserNameInput()}
            {/* sign up button */}
            {this.showButtons()}
          </form>
        </div>
      </Container>
    );
  }
}

// use Hook to wrap styles classes with Signup component
export default function Hook() {
  const classes = useStyles();
  return <Signup classes={classes}>Hook</Signup>;
}