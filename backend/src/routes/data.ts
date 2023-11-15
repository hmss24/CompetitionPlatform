import express from 'express'
import errorcode from '@/utils/errorcode.js';
import tips from '@/utils/tips.js';

const router = express.Router();

import CF_router from './data/data_CF'
router.use('/data/CF', CF_router)

router.use('*', (request, response)=> {
  return response.json({ code: errorcode.DATA_CATEGORY_ERROR, msg: tips.DATA_CATEGORY_UNKNOWN });
})
export default router;