import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Box, Icon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useData from './Listener';
import RateChart from './RateChart';
import StatTable from './StatTable';
import GeoSelect from './GeoSelect';
import options from '../options';

export default function Dashboard() {

  const data = useData();
  const classes = useStyles();
  const [location, setLocation] = useState('World');

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  if (!data) {
    return <pre>Loading...</pre>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarIcon}>
            <Icon>
              <DashboardIcon />
            </Icon>
          </div>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Covid-19 Statistics Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        className={classes.drawer}
      >
        <Toolbar />
        <Box className={classes.navTool}>
          <GeoSelect options={options} location={location} handleChange={handleChange} />
        </Box>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <StatTable
                  data={data.filter(d => d.location === location)}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='New Cases'
                  data={data.filter(d => d.location === location)}
                  y='new_cases'
                  yAxisLabel='Number New Cases per Day'
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='Total Cases'
                  data={data.filter(d => d.location === location)}
                  y='total_cases'
                  yAxisLabel='Total Cases'
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='New Cases Per Million People'
                  data={data.filter(d => d.location === location)}
                  y='new_cases_per_million'
                  yAxisLabel='New Cases per Million People'
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='Total Cases per Million People'
                  data={data.filter(d => d.location === location)}
                  y='total_cases_per_million'
                  yAxisLabel='Total Cases per Million People'
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='New Deaths'
                  data={data.filter(d => d.location === location)}
                  y='new_deaths'
                  yAxisLabel='Number of New Deaths per Day'
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <RateChart
                  title='New Deaths per Million People'
                  data={data.filter(d => d.location === location)}
                  y='new_deaths_per_million'
                  yAxisLabel='New Deaths per Million People'
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 360
  },
  sectionHeader: {
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  navTool: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  descriptionButton: {
    marginTop: 0.5,
    align: 'left',
    alignItems: 'center'
  }
}));