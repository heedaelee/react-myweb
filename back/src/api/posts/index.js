import Router from "koa-router";
import postsCtrl from "./posts.ctrl";

const posts = new Router();

posts.get("/", postsCtrl.list);
posts.post("/", postsCtrl.checkLogin, postsCtrl.write);
posts.patch("/:id", postsCtrl.checkLogin, postsCtrl.update);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read);
posts.delete("/:id", postsCtrl.checkLogin, postsCtrl.remove);

export default posts;
