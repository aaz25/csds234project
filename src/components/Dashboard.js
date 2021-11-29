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
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useData from './Listener';
import RateChart from './RateChart';
import * as d3 from 'd3';

function sameDate(d, i) {
  if (d instanceof Date && i instanceof Date) {
    return d.getYear() === i.getYear() && d.getMonth() === i.getMonth() && d.getDate() === i.getDate();
  }
  else {
    return false;
  }
}

export default function Dashboard() {

  const data = useData();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!data) {
    return <pre>Loading...</pre>
  }

  for (var i = 0; i < 7; i++) {
    var e = new Date(new Date().setDate(new Date().getDate() - i));
    var idate = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()));

    var temp = {
      date: idate,
      total_cases: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.total_cases),
      new_cases: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.new_cases),
      new_deaths: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.new_cases),
      total_cases_per_million: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.total_cases_per_million),
      new_cases_per_million: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.new_cases_per_million),
      new_deaths_per_million: d3.sum(data.filter(d => sameDate(d.date, idate)), d => d.new_deaths_per_million),
      continent: 'all',
      location: 'all'
    };

    data.push(temp);
  }

  console.log(data.filter(d => d.location === 'all'));

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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={6}>
            <Paper className={fixedHeightPaper}>
              <RateChart
                title='New Cases'
                data={data.filter(d => d.location === 'all')}
                y='new_cases'
              />
            </Paper>
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
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  descriptionButton: {
    marginTop: 0.5,
    align: 'left',
    alignItems: 'center'
  }
}));