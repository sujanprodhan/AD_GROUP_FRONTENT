import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route,Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import store from './store';
import App from './components/App';
import Posts from './components/Posts';
import reset from './constants/css/reset';
import AddNewPost from './components/AddNewPost';

import "./css/styles.css";

const GlobalStyle = createGlobalStyle`${reset}`;

ReactDOM.render(
    <BrowserRouter>
        <Fragment> 
            <Provider store={store}>
                {/* <App /> */}
                <div className="menu">
                <Link to="/posts" >Posts   </Link>
                <Link to="/" >Home </Link> 
                <Link to="/add-new-post" > Add New Post </Link> 
                </div>
                <Switch>
                    <Route path="/" exact>
                        <App />
                    </Route>
                    <Route path="/posts" exact>
                        <Posts />
                    </Route>
                    <Route path="/add-new-post" exact>
                        <AddNewPost />
                    </Route>
                </Switch>
            </Provider>
            <GlobalStyle />
           
        </Fragment>

    </BrowserRouter>,
    document.getElementById('root')
);
