import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'next/router';
//import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import { get as _get } from 'lodash';

import { setData } from '../../actions/updateData';
import { group } from '../../services/cruds';
import { formData } from '../../services/api';
import loading from '../../services/decorators/loading';

import "./features.sass";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groupDetails: runtime.groupDetails,
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
@loading()
export class Features extends Component {

  componentDidMount() {
    this.loadAndSaveToProps();
  }

  loadAndSaveToProps = async () => {
    const {
      query: { id },
    } = this.props.router;
    const resp = await this.props.loadData(
      group.get(
        {
          groupId: id,
        },
        '/GetGroupDetails',
        false,
        par => qs.stringify(par, { indices: false }),
      ),
      {
        saveTo: 'groupDetails',
      },
    );
    this.props.setData(resp.data, 'groupDetails');
  };

  /*async getInitialProps() {
    const { id } = this.props.router.query;
    const res = await fetch(`http://localhost:3000/api/Group/GetGroupDetails?groupId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5kcmlpLnZvaXRvdnljaEBraW5kZ2Vlay5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIyIiwiaXNSZWZyZXNoIjoiRmFsc2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwibmJmIjoxNTQyMDMwNTQ1LCJleHAiOjE1NDMyNDAxNDUsImlzcyI6Ik1ldEtub3dBdXRoU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.IOv8zbunNaFBXQ4JDdkKTfPMZJuOd2ZWA_UEI3dZSnc',
          'Organization': '7'
        },
      });
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data}`);

    return {
      shows: data
    };
  }*/
  
  render() {
    const { groupDetails } = this.props;
    const data = _get(groupDetails, 'data');
    return (
      <div className="features-wrapper">
        <Grid container spacing={0} justify="center">
          <Grid item xs={8} sm={8}>
            <Grid container spacing={0} justify="center">
              <Grid item xs={2} sm={2}>
                <div
                  style={{
                    backgroundImage: `url('/static/svg/group-features.svg')`,
                  }}
                  className="icon"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <h1>{data.name}</h1>
              </Grid>
              <Grid item xs={4} sm={4}>
                <h1>Haal</h1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Features;