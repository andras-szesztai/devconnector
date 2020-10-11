import React from "react"
import Moment from "react-moment"

const ProfileEducation = ({
  education: { school, degree, fielddofstudy, current, to, from, description },
}) => (
  <>
    <h3 className="text-ddark">{school}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Degree:</strong> {degree}
    </p>
    <p>
      <strong>Field of Study:</strong> {fielddofstudy}
    </p>
    <p>
      <strong>Description:</strong> {description}
    </p>
  </>
)

export default ProfileEducation
