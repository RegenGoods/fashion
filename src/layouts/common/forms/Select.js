import React from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectUI = props =>
  <FormControl className={props.classes.formControl}>
    <InputLabel>{props.label}</InputLabel>
    <Select
      multiple={props.multiple}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)}
    </Select>
  </FormControl>

  const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(SelectUI)
