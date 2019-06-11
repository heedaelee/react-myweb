import Router from 'koa-router';
import postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.patch('/:id', postsCtrl.update);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);

export default posts;