import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import profile from './profile';
import upload from './upload';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/profile', profile.routes());
api.use('/upload', upload.routes());

export default api;