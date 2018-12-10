import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Link } from '../../../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';
import qs from 'qs';
import { Button } from '@material-ui/core';
import find from 'lodash/find';
import get from 'lodash/get';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import Features from 'components/features';
import { group } from 'services/cruds';
import loading from 'services/decorators/loading';
import { setData } from 'actions/updateData';
import { getSingle } from 'actions/groups';

import './group.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData, getSingle }, dispatch);

const mapStateToProps = ({ runtime, groups }, {router}) => ({
  groupDetails: runtime.groupDetails,
  subgroups: get(find(groups.groups, el => el.id === parseInt(router.query.id)), 'subgroups') || [],
  mainGroup: find(groups.groups, el => el.id === parseInt(router.query.id))
});

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
@loading()
export class Group extends Component {
  componentDidMount() {
    this.GetGroupDetails_loadAndSaveToProps();
  }
  componentDidUpdate = (prevProps) => {
    console.log(this.props.router);
    if(this.props.router.query.id !== prevProps.router.query.id || this.props.router.query.sub !== prevProps.router.query.sub)
      {
        console.log('updateTTTTT');
        this.GetGroupDetails_loadAndSaveToProps();
      }
  }
  GetGroupDetails_loadAndSaveToProps = async () => {
    const {
      query: { id, sub }
    } = this.props.router;
    const selected = sub? sub: id;

    const resp = await this.props.loadData(
      group.get(
        {
          groupId: selected
        },
        '/GetGroupDetails',
        false,
        par => qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'groupDetails'
      }
    );
    this.props.getSingle({groupId: id});
    this.props.setData(resp.data, 'groupDetails');
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

  render() {
    const { pathname } = this.props.router;
    const { groupDetails } = this.props;
    if (!groupDetails) return null;
    const data = _get(groupDetails, 'data');
    const quizAvailable = !!data.images.length;
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
                quizAvailable === true ? (
                  <Link
                    key="link-quiz"
                    route="quiz"
                    params={{
                      id: data.id
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
          <Features mainGroup={this.props.mainGroup} subgroups={this.props.subgroups} groupDetails={data} />
        </Layout>
      </Fragment>
    );
  }
}

export default Group;
