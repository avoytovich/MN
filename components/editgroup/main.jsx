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
    IconButton,
    NoSsr
} from '@material-ui/core'; import styles from './styles';
import get from 'lodash/get';
import Subgroups from './subgroups';
import Questions from './questions';
import withModal from 'services/decorators/withModal';
import IconModal from 'components/iconmodal';
import { wrapField } from 'services/materialformik';
import { Field } from 'formik';

<<<<<<< HEAD

const Main = ({ classes,  group, setFieldValue, open, values, chosenIcon }) => {
    const subgroups = get(group, 'subgroups', []);
    const id = get(group, 'id');
    // Showing either group icon or changed icon 
    const icon = get(chosenIcon, 'icon') || get(group, 'icon');
    return (
        <div className={classes.wrapper}>
            <Paper elevation={0} className={classes.paper}>
                <Typography className={classes.title}>Edit Group</Typography>
                <div className={classes.iconWrapper}>
                    <NoSsr>
                        <Avatar
                            onClick={() => open(true)}
                            src={icon}
                            className={classes.icon}
                        />
                    </NoSsr>
                    <Typography onClick={() => open(true)} className={classes.sgi}>
                        Select Group Icon
                        </Typography>
                </div>
                <Field
                    fullWidth
                    InputProps={{
                        className: classes.text
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.label
                    }}
                    className={classes.input}
                    name="name"
                    value={values.name}
                    component={wrapField}
                    placeholder="Group name"
                    margin="normal"
                    value={values.name}
                />
                <Field
                    InputProps={{
                        className: classes.text
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.label
                    }}
                    value={values.description}
                    component={wrapField}
                    name="description"
                    placeholder="Description"
                    fullWidth
                    margin="normal"
                />
            </Paper>
            <Paper elevation={0} className={classes.paper}>
                <Typography className={classes.title}>Sub Groups</Typography>
                <Subgroups
                    subgroups={subgroups}
                    classes={classes}
                    setFieldValue={setFieldValue}
                    id={id}
                />
            </Paper>
            <Paper elevation={0} className={classes.paper}>
                <Typography className={classes.title}>Question Answer</Typography>
                <Questions 
                    setFieldValue={setFieldValue}
                    classes={classes} />
            </Paper>
        </div>
    )
=======
@withModal(IconModal)
@withStyles(styles)
export default class Main extends Component {

    render() {
        const { classes, formik, group, open, chosenIcon } = this.props;
        const subgroups = get(group, 'subgroups', []);
        const id = get(group, 'id');
        // Showing either group icon or changed icon 
        const icon = get(chosenIcon, 'icon') || get(group, 'icon');
        // const iconId = get(chosenIcon, 'id');
        return (
            <div className={classes.wrapper}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography className={classes.title}>Edit Group</Typography>
                    <div className={classes.iconWrapper}>
                        <NoSsr>
                            <Avatar
                                onClick={() => open(true)}
                                src={icon}
                                className={classes.icon}
                            />
                        </NoSsr>
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
                    <Questions formik={formik} classes={classes} />
                </Paper>
            </div>
        )
    }
>>>>>>> dev
}

export default withModal(IconModal)(withStyles(styles)(Main));