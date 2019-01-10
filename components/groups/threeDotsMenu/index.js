import React from 'react';
import { IconButton, Menu, MenuItem, Badge, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import Trash from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { signOut } from 'actions/account';
import { getNewQuestions } from 'actions/questions';
import Router from 'next/router';
import ChangePasswordModal from 'components/landing/changePasswordModal';
import withModal from 'services/decorators/withModal';
import { myRoleIs } from "../../../services/accountService";


// import i18n from '../../../services/decorators/i18n';

import { menuProps } from '../../../constants/texts';
import { Link } from '../../../routes';
import './menu.sass'
export default class ThreeDotsMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = async event => {
    try {
      this.setState({ anchorEl: event.currentTarget });
    } catch(e){
      console.log(e)
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { handleDelete, info, id } = this.props
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'three-dots-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className="three-dots-button"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="three-dots-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <Link route="editgroup" params={{ id }}>
            <MenuItem>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
          </Link>
          <MenuItem
            onClick={handleDelete(info)}
          >
            <ListItemIcon>
              <Trash />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </Menu>
      </>
    );
  }
}

