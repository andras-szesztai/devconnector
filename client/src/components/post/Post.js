import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Spinner from "../layout/Spinner"
import PostItem from "../posts/PostItem"
import CommentForm from "./CommentForm"

import { getPost } from "../../actions/post"

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" classNam="btn">Back to Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </>
  )
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
