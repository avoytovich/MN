import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Link } from '../../../../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';
import qs from 'qs';
import { Button } from '@material-ui/core';

import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import Features from 'components/features';
import { group } from '../../../../services/cruds';
import loading from '../../../../services/decorators/loading';
import { setData } from '../../../../actions/updateData';

import './group.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groupDetails: runtime.groupDetails
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withRouter
@loading()
export class Group extends Component {
  componentDidMount() {
    this.GetGroupDetails_loadAndSaveToProps();
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
              breadCrumb={`${this.titlePath(pathname)} / ${this.titleCase(
                data.name
              )}`}
              title="Group Content"
            />
          </div>
          <Features groupDetails={data} />
        </Layout>
      </Fragment>
    );
  }
}

export default Group;
