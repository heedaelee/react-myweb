import Router from "koa-router";
import postsCtrl from "./posts.ctrl";
import needsAuth from 'lib/middlewares/needsAuth'

const posts = new Router();

posts.get("/", postsCtrl.list);
posts.post("/", needsAuth, postsCtrl.write);
posts.patch("/:id", needsAuth, postsCtrl.update);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);
posts.delete("/:id", needsAuth, postsCtrl.remove);

export default posts;
