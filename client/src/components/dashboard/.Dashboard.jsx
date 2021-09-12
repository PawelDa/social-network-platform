import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileInfo from './ProfileInfo';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large">Dashboard</h1>
    <p><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    {profile !== null ? (
      <Fragment>
        <ProfileInfo details={profile} />
        <div>
          <Link to='/edit-profile' className='btn btn-primary my-1' >Edit bio</Link>
          <button className='btn btn-danger my-1' onClick={() => deleteAccount()}>
            Delete my account
          </button>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <p>Add some info</p>
        <Link to='/create-profile' className='btn btn-primary my-1' >Add profile</Link>
      </Fragment>
    )}
  </Fragment>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);