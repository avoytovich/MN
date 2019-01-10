import React, { Component } from 'react';
import {
  Typography,
  withStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  TableBody,
  Grid,
  Avatar
} from '@material-ui/core';
import _ from 'lodash';
import SearchField from '../searchpanel/searchfield';
import ActivityTable from './table';

import SelectGroup from './selectgroup';

const styles = theme => ({
  title: {
    fontSize: 24,
    color: '#224483',
    fontWeight: 'bold',
    marginLeft: 20
  },
  wrapper: {
    minHeight: 700,
    marginTop: 76,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: 1200,
    width: '100%'
  },
  paper: {
    boxShadow: '-4.7px 3.8px 6px 0 rgba(105, 105, 105, 0.08)',
    marginTop: 16,
    padding: '31px 18px'
  },
  name: {
    display: 'flex',
    alignItems: 'center'
  }
});

@withStyles(styles)
export default class ActivityChart extends Component {
  render() {
    const { classes } = this.props;
    const keys = [
      {
        id: 'name',
        sort: true,
        numeric: false,
        label: 'name'
      },
      {
        id: 'title',
        sort: false,
        numeric: false,
        label: 'title'
      },
      {
        id: 'top_scores',
        sort: true,
        numeric: true,
        label: 'top scores'
      },
      {
        id: 'quiz_taken',
        sort: true,
        numeric: true,
        label: 'quizzess taken'
      }
    ];
    const data = [
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'Catherine Weiss',
        title: 'Some title',
        top_scores: 28,
        quiz_taken: 3
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'vasya',
        title: 'Some title',
        top_scores: 28,
        quiz_taken: 5
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 28,
        quiz_taken: 8
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 28,
        quiz_taken: 1
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 55,
        quiz_taken: 6
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 28,
        quiz_taken: 5
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 13,
        quiz_taken: 11
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 56,
        quiz_taken: 13
      },
      {
        img: '/static/png/image-member.png',
        email: 'someemail@email.com',
        name: 'asdasds',
        title: 'Some title',
        top_scores: 11,
        quiz_taken: 14
      }
    ];

    return (
      <div className={classes.wrapper}>
        <Typography className={classes.title}>
          Accounting Department (Total Members: 06)
        </Typography>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} md={9}>
              <SelectGroup items={['Some subgroup', 'Brand new subgroup']} />
            </Grid>
            <Grid item xs={12} md={3}>
              <SearchField label="Search by Name" />
            </Grid>
          </Grid>
          <ActivityTable keys={keys} data={data} />
        </Paper>
      </div>
    );
  }
}
