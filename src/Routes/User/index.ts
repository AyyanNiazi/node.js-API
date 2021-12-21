import express from 'express'
// Controllers
import { getUser } from '../../Controllers/User'

const router = express.Router()

router.get('/', getUser);

export default router;

