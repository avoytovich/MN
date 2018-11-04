import React, { Component } from 'react'
import {
    Paper,
    Typography,
    TextField,
    MenuItem,
    withStyles,
    Button,
    Icon,
    Select,
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
  } from '@material-ui/core';import styles from './styles';
import get from 'lodash/get';

import Subgroups from './subgroups';
import Questions from './questions';
import withModal from 'services/decorators/withModal';
import IconModal from 'components/iconmodal';

@withModal(IconModal)
@withStyles(styles)
export default class Main extends Component {
    
    render() {
        const { classes, formik, group, open } = this.props;
        const subgroups = get(group, 'subgroups', []);
        const id = get(group, 'id');
        return (
            <div className={classes.wrapper}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography className={classes.title}>Edit Group</Typography>
                    <div className={classes.iconWrapper}>
                        <Avatar
                            onClick={() => open(true)}
                            src="/static/png/icon-group.png"
                            className={classes.icon}
                        />
                        <Typography onClick={() => open(true)} className={classes.sgi}>
                            Select Group Icon
                        </Typography>
                    </div>
                    <TextField
                        onChange={formik.handleChange}
                        InputProps={{
                            className: classes.text
                        }}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.label
                        }}
                        value={formik.values.name}
                        helperText={formik.errors.name}
                        error={formik.errors.name !== undefined}
                        name="name"
                        placeholder="Group name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        InputProps={{
                            className: classes.text
                        }}
                        value={formik.values.description}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.label
                        }}
                        helperText={formik.errors.description}
                        error={formik.errors.description !== undefined}
                        name="description"
                        onChange={formik.handleChange}
                        placeholder="Description"
                        fullWidth
                        name="description"
                        margin="normal"
                    />
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Typography className={classes.title}>Sub Groups</Typography>
                    <Subgroups
                        subgroups={subgroups}
                        classes={classes}
                        id={id}
                        />
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Typography className={classes.title}>Question Answer</Typography>
                    {/* <Questions classes={classes} formik={formik} /> */}
                </Paper>
            </div>
        )
    }
}
