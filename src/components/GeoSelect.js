import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

export default function GeoSelect({ options, location, handleChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant='outlined' fullWidth>
      <InputLabel id='geo-label'>Region</InputLabel>
      <Select
        labelId='geo-label'
        label='Location'
        id='location'
        value={location}
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60
  }
}));