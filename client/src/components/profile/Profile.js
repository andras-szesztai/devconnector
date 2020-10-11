import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Spinner from "../layout/Spinner"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"

import { getProfileById } from "../../actions/profile"

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  console.log("profile", profile)
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </>
      )}
      <div class="profile-grid my-1">
        {profile && (
          <>
            <ProfileAbout profile={profile} />
            <ProfileAbout profile={profile} />
          </>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
