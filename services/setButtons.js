import { Component } from 'react';
import { Clear, DoneAll } from '@material-ui/icons/index';
import { Button } from '@material-ui/core';

import qs from 'qs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loading from './decorators/loading';
import { organization } from './cruds';
import { setData } from '../actions/updateData';

const ApproveButtonSet = async (loadData, set, selectInfo, handleAcceptSet) => {
  const resp = await loadData(
    organization.post(selectInfo, '/AcceptJoinRequests'),
    {
      saveTo: 'acceptJoin'
    }
  );
  new Promise((resolve, reject) => {
    resolve(set(resp.data, 'acceptJoin'));
  })
    .then(res => handleAcceptSet(res))
    .catch(error => console.log('error', error));
};

const RejectButtonSet = (loadData, selectInfo) =>
  loadData(organization.post(selectInfo, '/DeclineJoinRequests'), {
    saveTo: 'declineJoin'
  });

const withIcon = (IconComponents, selectInfo, handleAcceptSet) => {
  const ButtonInfo = {
    Approve: {
      name: 'Approve',
      className: 'approve-button',
      onClick: (load, set) => ApproveButtonSet(load, set, selectInfo, handleAcceptSet)
    },
    Reject: {
      name: 'Reject',
      className: 'reject-button',
      onClick: load => RejectButtonSet(load, selectInfo)
    },
    Verticals: {
      name: '',
      className: 'vertical-button',
      onClick: load => console.log('VerticalButtons', load, selectInfo)
    }
  };
  const CustomButton = ({ IconComponent, loadData, set }) => {
    let data;
    IconComponent === DoneAll
      ? (data = ButtonInfo.Approve)
      : IconComponent === Clear
      ? (data = ButtonInfo.Reject)
      : (data = ButtonInfo.Verticals);
    const { name, className, onClick } = data;
    return (
      <Button className={className} onClick={() => onClick(loadData, set)}>
        {name}
        <IconComponent />
      </Button>
    );
  };

  const mapDispatchToProps = dispatch =>
    bindActionCreators({ setData }, dispatch);

  const mapStateToProps = ({ runtime }) => ({
    acceptJoin: runtime.acceptJoin,
    declineJoin: runtime.declineJoin
  });

  return @connect(
    mapStateToProps,
    mapDispatchToProps
  )
  @loading()
  class Icon extends Component {
    render() {
      //console.log('this.props', this.props);
      //console.log('this.state', this.state);
      return (
        <>
          {IconComponents.map((IconComponent, id) => (
            <CustomButton
              key={id}
              IconComponent={IconComponent}
              loadData={this.props.loadData}
              set={this.props.setData}
            />
          ))}
        </>
      );
    }
  };
};

export default withIcon;
