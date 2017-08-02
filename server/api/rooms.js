import { Router } from 'express'
import Store from '../store'

let store = new Store()

const router = Router()

router.get('/rooms', function (req, res, next) {
  if (req.query.socketid) {
    res.json(store.findPlayerRoom(req.query.socketid))
  } else {
    res.json(store.rooms)
  }
})

router.get('/rooms/:id', function (req, res, next) {
  res.json(store.getRoomByCode(req.params.id))
})

export default router
