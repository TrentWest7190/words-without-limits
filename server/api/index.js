import { Router } from 'express'

import rooms from './rooms'

const router = Router()

router.use(rooms)

export default router
