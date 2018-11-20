import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const Card = ({ classes, img, title, content, key }) =>
  <GridListTile key={img}>
    <img src={img} alt={title} />
    <GridListTileBar
      title={title}
      subtitle={content}
      actionIcon={
        <IconButton className={classes.icon}>
          <InfoIcon />
        </IconButton>
      }
    />
  </GridListTile>


Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);
