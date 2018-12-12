import * as React from 'react';
import { Fragment } from 'react';
import {
  Avatar,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import './modal.sass';
import { Member, Question } from 'actions/members';
import map from 'lodash/map';

interface MemberProps {
  modalProps: Member;
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
  }
];

const MemberModal: React.SFC<MemberProps> = ({ modalProps }) => (
  <div className="wrapper-modal">
      <Grid container className="grid" spacing={0}>
          <Grid item sm={7} xs={12}>
        <Avatar className="avatar" src={modalProps.imageContent.mediumImage} />
      </Grid>
      <Grid className="info" item sm={5} xs={12}>
        <Typography align="right" className="text fname">
          {modalProps.firstName}
        </Typography>
        <hr className="hline" />
              {
                    map(keys, (el, key: number) => (
          <React.Fragment key={`${key  }item`}>
                          <p className="caption">{el.label}</p>
                          <p className="data">{modalProps[el.id] ? modalProps[el.id] : '-'}</p>
            </p>
          </React.Fragment>
        ))}
        <p className="caption">Answered questions</p>
              <List style={{margin: 0, padding: 0}}>
                  {
                        map(modalProps.questions, (qs: Question) => (
            <ListItem className="question-item">
                              <ListItemText  classes={{
                classes={{
                  primary: 'pri',
                  secondary: 'sec'
                }}
                primary={qs.question}
                secondary={qs.answer}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  </div>
);

export default MemberModal;
