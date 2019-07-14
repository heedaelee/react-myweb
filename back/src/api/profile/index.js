import Router from 'koa-router'
import profileCtrl from './profile.ctrl'
import needsAuth from 'lib/middlewares/needsAuth'

const profile = new Router()

profile.get("/:username", needsAuth, profileCtrl.read)
profile.post("/:username", needsAuth, profileCtrl.update)

export default profile