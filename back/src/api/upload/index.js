import Router from 'koa-router'
import uploadCtrl from './upload.ctrl'

const upload = new Router()

upload.post("/", uploadCtrl.upload)

export default upload