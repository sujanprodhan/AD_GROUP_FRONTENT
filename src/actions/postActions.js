import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from './types';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = '12345678';
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const  fetchPosts = () => {
  return (dispatch) => {
    return axios.get("/posts")
      .then(({ data }) => {
        dispatch({ type: FETCH_POSTS,posts:data})
        return data;
    });
  };
}


export const  createPost = (postData) => {
  return (dispatch) => {
    return axios.post("/posts", postData)
      .then(({ data }) => {
        dispatch({ type: NEW_POST,item:data})
        return data;
    });
  };
}
