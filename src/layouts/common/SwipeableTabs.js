import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {

  render() {
    const { classes, tabs, index, updateIndex } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={index} onChange={updateIndex}>
            {tabs.filter(t => t.label).map(t => <Tab label={t.label} />)}
          </Tabs>
        </AppBar>
        <SwipeableViews index={index}>
          {tabs.map(t => t.content)}
        </SwipeableViews>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
