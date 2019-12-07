import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/PersonPin';
import Email from '@material-ui/icons/Email';
import Password from '@material-ui/icons/VpnKey';
import User from '@material-ui/icons/PermIdentity';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// generate style attributes
const useStyles = makeStyles(theme => ({
  // style for current page
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // style for icon
  icon: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  // style for email&password input form
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(1),
  },
  // style for sign in button
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

// signup function
const signup = function(e, email, password, name) {
  e.preventDefault();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  if (email === undefined || password === undefined || name === undefined) {
    window.alert("Please provide valid email, password and name");
  } else if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    fetch(proxyUrl+'https://project3b-kam455.glitch.me/api/brand/microsoft', {
      method: 'GET',
      // body: JSON.stringify({'email': email, 'password': password}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
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
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }
  handleChangeEmail(event) { this.setState({email: event.target.value}); }
  handleChangePassword(event) { this.setState({password: event.target.value}); }
  handleChangeName(event) { this.setState({name: event.target.value}); }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.icon}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <form className={this.props.classes.form} noValidate>
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
                    <Email />
                  </InputAdornment>
                ),
              }}
              type='email'
              autoComplete="email"
              autoFocus
            />
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
                    <Password />
                  </InputAdornment>
                ),
              }}
              type="password"
              autoComplete="current-password"
            />
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
                    <User />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
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
          </form>
        </div>
      </Container>
    );
  }
}

export default function Hook() {
  const classes = useStyles();
  return <Signup classes={classes}>Hook</Signup>;
}