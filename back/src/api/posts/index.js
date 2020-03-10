import Router from "koa-router";
import * as postsCtrl from "./posts.ctrl";
import needsAuth from "lib/middlewares/needsAuth";

const posts = new Router();
console.log('test');

posts.get("/tags", postsCtrl.getTags);
posts.post("/", needsAuth, postsCtrl.write);
posts.patch("/:id", needsAuth, postsCtrl.update);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);
posts.delete("/:id", needsAuth, postsCtrl.remove);
posts.get("/", postsCtrl.list); //exports.list 로 지정하면 디폴트로 받음

export default posts;
