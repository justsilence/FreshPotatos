import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  block: {
    display: 'block',
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
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {'Genre:  ' + movieInfo.genre.join(', ')}
              </Typography>
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {'Actors:  ' + movieInfo.actor.join(', ')}
              </Typography>
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {'Directors:  ' + movieInfo.director.join(', ')}
              </Typography>
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {'PublishedDate:  ' + movieInfo.datePublished}
              </Typography>
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {movieInfo.description}
              </Typography>
              <Typography align='left' variant="subtitle" color="inherit" paragraph>
                {'Rate:  ' + movieInfo.rating}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {/* user comments section */}
      <Paper>
        <Grid container>
          <Grid item md={8}>
            <List className={classes.root}>
              {movieInfo.review.map((r) => {
                return (
                  <div>
                    <ListItem alignItems='flex-start'>
                      <ListItemText
                        primary={
                          <Typography variant='h6'>
                            {r.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='button'
                              className={classes.block}
                              color='textPrimary'
                            >
                            {r.userName}
                            </Typography>
                            {r.content}
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => {window.alert("delete")}} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </div>
                )
              })}
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