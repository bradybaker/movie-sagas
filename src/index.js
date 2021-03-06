import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIE', fetchMovie);
    yield takeEvery('FETCH_DETAIL', fetchDetail);
    yield takeEvery('FETCH_GENRE', fetchGenre);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('DELETE_MOVIE', deleteMovie);
    yield takeEvery('UPDATE_MOVIE', editMovie)
}

function* addMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload)
        yield put({ type: 'FETCH_MOVIE' })
    } catch (error) {
        console.log('Error is addMovie', error)
    }
}

function* deleteMovie(action) {
    try {
        yield axios.delete(`/api/movie/${action.payload}`)
        yield put({ type: 'FETCH_MOVIE' })
    } catch (error) {
        console.log('Error in deleteMovie', error)
    }
}

function* fetchGenre() {
    try {
        const response = yield axios.get('/api/genre')
        console.log('This is response.data genre GET', response.data)
        yield put({ type: 'SET_GENRES', payload: response.data })
    } catch (error) {
        console.log('Error in fetchGenre', error)
    }
}

function* fetchDetail(id) {
    try {
        const response = yield axios.get(`/api/movie/${id.payload}`)
        console.log('This is response.data for specific movie =========', response.data)
        yield put({ type: 'SET_DETAIL', payload: response.data })
    } catch (error) {
        console.log('Error in fetchDetail index.js', error);
    }
}

function* fetchMovie() {
    try {
        const response = yield axios.get('/api/movie')
        yield put({ type: 'SET_MOVIES', payload: response.data })
    } catch (error) {
        console.log('Error in fetchMovie')
    }
}

function* editMovie(action) {
    try {
        console.log('This is action.payload EDIT', action.payload)
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload)
    } catch (err) {
        console.log('Error in editMovie', err)
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
