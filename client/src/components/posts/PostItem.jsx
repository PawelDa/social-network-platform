import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { createStructuredSelector } from 'reselect';

import { selectAuth } from '../../redux/selectors/auth';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showAction,
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date
}}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {showAction && (<Fragment>
        <button
          type="button"
          className="btn btn-light"
          onClick={e => addLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={e => removeLike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-black">
          Comments {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (    
          <button      
            type="button"
            className="btn btn-danger"
            onClick={e => {
              deletePost(_id);
              document.documentElement.scrollTop = 0;
            }}
          >
            Delete
          </button>
        )}
      </Fragment>)}
    </div>
  </div>
);

PostItem.defaultProps = {
  showAction: true
};

const mapStateToProps = createStructuredSelector({
  auth: selectAuth
});

const mapDispatchToProps = dispatch => ({
  addLike: (postId) => dispatch(addLike(postId)),
  removeLike: (postId) => dispatch(removeLike(postId)),
  deletePost: (postId) => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
