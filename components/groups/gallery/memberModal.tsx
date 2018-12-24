import * as React from 'react';
import { Fragment } from 'react';
import Router from 'next/router';
import { Avatar, Typography, Grid, List, ListItem, ListItemText, IconButton, Icon } from '@material-ui/core';
import Button from './../../material-wrap/button';
import { myRoleIs } from "../../../services/accountService";
import './modal.sass';
import { Member, Question } from 'actions/members';
import map from 'lodash/map';
import Close from '@material-ui/icons/Close'

interface MemberProps {
    modalProps: Member
}

const keys = [
    {
        id: 'department',
        label: 'Department'
    },
    {
        id: 'title',
        label: 'Position'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'number',
        label: 'Phone number'
    },
    {
        id: 'city',
        label: 'City'
    },
    {
        id: 'aboutme',
        label: 'About me'
    },
];

const isAdmin = myRoleIs();

const MemberModal: React.SFC<MemberProps> = ({ modalProps, close }) => (
    <div className="wrapper-modal">
        <IconButton className="close-btn" onClick={close}><Close/></IconButton>
        <Grid container className="grid" spacing={0}>
            <Grid item sm={7} xs={12}>
                <Avatar className="avatar" src={modalProps.imageContent? modalProps.imageContent.mediumImage: ''} />
            </Grid>
            <Grid className="info" item sm={5} xs={12}>
                <Typography align="right" className="text fname">
                    {modalProps.firstName}
                </Typography>
                <hr className="hline" />
                {
                    map(keys, (el, key: number) => (
                        <React.Fragment key={key + 'item'}>
                            <p className="caption">{el.label}</p>
                            <p className="data">{modalProps[el.id] ? modalProps[el.id] : '-'}</p>
                        </React.Fragment>
                    ))
                }
                <p className="caption">Answered questions</p>
                <List style={{margin: 0, padding: 0}}>
                    {
                        map(modalProps.questions, (qs: Question) => (
                            <ListItem className="question-item">
                                <ListItemText  classes={{
                                    primary: 'pri',
                                    secondary: 'sec'
                                }} primary={qs.question} secondary={qs.answer} />
                            </ListItem>
                        ))
                    }
                </List>
                {isAdmin && (<Button
                  className="btn-edit-profile"
                  variant="contained"
                  color="secondary"
                  onClick={() => (
                    Router.push({
                      pathname: '/edit-member',
                      query: {memberId: modalProps.id}
                    })
                  )}
                >
                  Edit Profile
                </Button>)}
            </Grid>
        </Grid>

    </div>
)

export default MemberModal;