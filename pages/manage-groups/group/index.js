import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Link } from '../../../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';
import qs from 'qs';
import { Button } from '@material-ui/core';

import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import Features from 'components/features';
import { group } from 'services/cruds';
import loading from 'services/decorators/loading';
import { resetData, updateSpecData } from 'actions/updateData';
import { getSingle } from 'actions/groups';

import './group.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, resetData, getSingle }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groupDetails: runtime.groupDetailsData,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withRouter
@loading()
export class Group extends Component {

  state={
    group: 'ROOT'
  };

  componentDidMount() {
    this.GetGroupDetails_loadAndSaveToProps();
  }
  
  componentWillUnmount = () => {
    this.props.resetData('groupDetails');
  }

  GetGroupDetails_loadAndSaveToProps = async () => {
    const {
      query: { id }
    } = this.props.router;

    const resp = await this.props.loadData(
      group.get(
        {
          groupId: id
        },
        '/GetGroupDetails',
        false,
        par => qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'groupDetails'
      }
    );
    if (resp.data.data && !resp.data.data.subgroups.some(item => (item.name == 'ROOT'))) {
      resp.data.data.subgroups.unshift({name: 'ROOT', id: id})
    }
    this.props.updateSpecData('groupDetails', resp.data);
    this.props.getSingle({groupId: id});
  };

  titleCase = str => {
    if (str.search('-') !== -1) {
      const splitStr = str.split('-');
      splitStr.forEach((item, index) => {
        splitStr[index] =
          splitStr[index].charAt(0).toUpperCase() +
          splitStr[index].substring(1);
      });
      return splitStr.join(' ');
    }
    const splitStr = str.toLowerCase().split(' ');
    splitStr.forEach((item, index) => {
      splitStr[index] =
        splitStr[index].charAt(0).toUpperCase() + splitStr[index].substring(1);
    });
    return splitStr.join(' ');
  };

  titlePath = str => {
    const splitStr = str.toLowerCase().split('/');
    const path = splitStr[splitStr.length - 2].replace('-', ' ');
    return path.charAt(0).toUpperCase() + path.substring(1);
  };

  handleGroup = (group) => this.setState({ group });

  render() {
    //console.log('this.props', this.props);
    //console.log('this.state', this.state);
    const { pathname } = this.props.router;
    const { groupDetails, router } = this.props;
    const { group } = this.state;
    if (!groupDetails) return null;
    const data = _get(groupDetails, 'data');
    const subgroups = _get(groupDetails, 'data.subgroups');
    const currentGroup = subgroups.filter(item => item.name === group);
    const quizIsAvailable = group === 'ROOT' ?
        _get(groupDetails, 'data.quizIsAvailable') : _get(currentGroup[0], 'quizIsAvailable');
    return (
      <Fragment>
        <Layout>
          <div className="underheader-wrapper">
            <SecondPanel
              /*actionButtons={[
                <Button variant="outlined" color="secondary"> INVITE
                </Button>
              ]}*/
              actionButtons={[
                quizIsAvailable === true ? (
                  <Link
                    key="link-quiz"
                    route="quiz"
                    params={{
                      id: currentGroup[0] && currentGroup[0]['id'] || data.id
                    }}>
                    <a>
                      <Button
                        variant="contained"
                        color="primary"
                        className="custom-button-material">
                        Quiz
                      </Button>
                    </a>
                  </Link>
                ) : (
                  undefined
                )
              ]}
              breadCrumb={`Manage Groups / ${data.name}`}
              title="Group Content"
            />
          </div>
          <Features  groupDetails={data} handleGroup={this.handleGroup}/>
        </Layout>
      </Fragment>
    );
  }
}

export default Group;
