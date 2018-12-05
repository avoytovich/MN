import React from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { signOut } from 'actions/account';
import { getNewQuestions } from 'actions/questions';
import Router from 'next/router';
import ChangePasswordModal from 'components/landing/changePasswordModal';
import withModal from 'services/decorators/withModal';
import { myRoleIs } from "../../../services/accountService";


// import i18n from '../../../services/decorators/i18n';

import { menuProps } from '../../../constants/texts';
import Link from 'next/link';
/*const options = [
  'Profile',
  'Edit',
  'Sign Up'
];*/

const ITEM_HEIGHT = 48;

// @i18n('menu')
@withModal(ChangePasswordModal)
class LongMenu extends React.Component {
  state = {
    anchorEl: null,
    newQuestions: 0,
    isAdmin: false,
  };

  componentDidMount() {
    this.setState({
      isAdmin: myRoleIs(),
    })
  }

  handleClick = async event => {
    try {
      this.setState({ anchorEl: event.currentTarget });
      const newQuestions = await getNewQuestions()
      this.setState({ newQuestions });
    } catch(e){
      console.log(e)
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangePassword = () => {
    const { open } = this.props
    open(true)
    this.handleClose()
  };

  handleLogout = async () => {
    this.handleClose()
    await signOut()
    Router.push({ pathname: '/' })
  }

  render() {
    const { anchorEl, newQuestions, isAdmin } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <ExpandMore style={{ color: 'white' }} />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 6.5,
              width: 200,
            },
          }}
        >
          {!isAdmin && (
            <>
              <Link href={{ pathname: '/edit-profile'}}>
                <MenuItem
                  onClick={this.handleClose}
                >
                  Edit Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={this.handleClose}>
                {newQuestions
                  ? (
                    <Badge
                      badgeContent={newQuestions}
                      color="error"
                      invisible={true}
                    >
                      Questions
                    </Badge>
                  )
                  : ('Questions')
                }
              </MenuItem>
              <MenuItem onClick={this.handleChangePassword}>
                Change password
              </MenuItem>
            </>
          )}
          <MenuItem onClick={this.handleLogout}>
            Log out
          </MenuItem>
        </Menu>
      </>
    );
  }
}

export default LongMenu;
