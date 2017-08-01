import { Router } from 'express'
import Store from '../store'

let store = new Store()

const router = Router()

router.get('/rooms', function (req, res, next) {
  res.json(store.rooms)
})

export default router
