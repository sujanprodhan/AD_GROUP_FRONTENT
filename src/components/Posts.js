import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  }
  componentDidMount() {
    this.props.fetchPosts().then((data) => {   
      this.setState(({posts : data}))
    });
  }

  render() {
    let {posts} = this.state || [];
    const postItems = posts && posts.map(post => (
      <div key={post.id}>
        <hr/>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        <h1>Posts</h1>
         {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  // posts: PropTypes.array.isRequired,
  // newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts,
  newPost: state.posts.item
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);