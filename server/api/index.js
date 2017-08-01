import { Router } from 'express'

import users from './users'
import rooms from './rooms'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(rooms)

export default router
