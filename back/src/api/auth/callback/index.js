import Router from 'koa-router'
import * as callbackCtrl from './callback.ctrl'

const callback = new Router()
console.log('callback탐')
callback.get('/facebook', callbackCtrl.facebookCallback)
callback.get('/facebook/login', callbackCtrl.redirectFacebookLogin)
/* callback.get('/token', callbackCtrl.getToken) */

export default callback