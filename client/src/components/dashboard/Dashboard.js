import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Spinner from "../layout/Spinner"

import { getCurrentProfile } from "../../actions/profile"

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 class="large text-primary">Dashboard</h1>
      <p class="lead">
        <i class="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>has</>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}

Dashboard.propTypes = {}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
