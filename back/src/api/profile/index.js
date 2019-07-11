import Router from 'koa-router'
import profileCtrl from './profile.ctrl'

const profile = new Router()

profile.get("/:username", profileCtrl.checkLogin, profileCtrl.read)

export default profile