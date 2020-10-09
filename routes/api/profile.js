const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"])
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }
    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     GET api/profile
// @desc      Create or update a user profile
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      linkedin,
      facebook,
      twitter,
      instagram,
    } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (company) profileFields.website = website
    if (company) profileFields.location = location
    if (company) profileFields.bio = bio
    if (company) profileFields.status = status
    if (company) profileFields.githubusername = githubusername
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim())
    }
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }
      // Create
      profile = new Profile(profileFields)

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)

// @route     GET api/profile
// @desc      Get all profiles
// @access    Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"])
    res.json(profiles)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user id
// @access    Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"])
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" })
    }
    res.status(500).send("Server Error")
  }
})

// @route     DELETE api/profile
// @desc      Delete profile, user & posts
// @access    Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id,
    })
    await User.findOneAndRemove({
      _id: req.user.id,
    })
    res.json({msg: "User deleted"})
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
