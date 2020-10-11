import React from "react"
import Moment from "react-moment"

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <>
    <h3 className="text-ddark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Location:</strong> {location}
    </p>
    <p>
      <strong>Position:</strong> {title}
    </p>
    <p>
      <strong>Description:</strong> {description}
    </p>
  </>
)

export default ProfileExperience
