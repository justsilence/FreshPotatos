import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/Lock';
import Email from '@material-ui/icons/Email';
import Password from '@material-ui/icons/VpnKey';
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

export default function Register() {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState();
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChangeEmail}
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
            value={password}
            onChange={handleChangePassword}
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
          <Grid container>
            <Grid item xs className={classes.grid}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => { e.preventDefault(); window.alert(email); }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs className={classes.grid}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => { e.preventDefault(); window.alert(password); }}
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