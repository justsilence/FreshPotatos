import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  movieInfo: {
    height: 500,
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  movieInfoContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  root: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function MovieDetail(props) {
  const classes = useStyles();
  const { movieInfo } = props;

  return (
    <div>
      {/* movie information section */}
      <Paper className={classes.movieInfo} style={{ backgroundImage: `url(${movieInfo.image})` }}>
        {/* Increase the priority of the hero background image */}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.movieInfoContent}>
              <Typography align='left' component="h1" variant="h3" color="inherit" gutterBottom>
                {movieInfo.name}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.genre}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.actor}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.director}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.datePublished}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.duration}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.trailer}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.description}
              </Typography>
              <Typography align='left' variant="h5" color="inherit" paragraph>
                {movieInfo.rating}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {/* user comments section */}
      <Paper>
        <Grid container>
          <Grid item md={6}>
            <List className={classes.root}>
              {}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

MovieDetail.propTypes = {
  post: PropTypes.object,
};