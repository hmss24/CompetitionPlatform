import Model from '@/models/data/DataModel_CF'
import express, { response } from 'express'
import { getUserID } from './data_util';
import errorcode from '@/utils/errorcode';
import tips from '@/utils/tips';

const router = express.Router();

router.use('/add', async (request, response) => {
  const ll_username = request.get('username');
  let userid: string = null;

  try {
    userid = await getUserID(ll_username);
    if (userid == null) return response.json({ code: errorcode.DATA_BAD_FORMAT, msg: tips.DATA_USER_NO_EXIST });
  } catch (e) {
    return response.json({ code: errorcode.NETWORK_ERROR, msg: tips.NETWORK_ERROR });
  }

  const { score, remark }: {
    score: string,
    remark: string
  } = request.body;

  try {
    await Model.create({
      ll_userid: userid,
      ll_score: score,
      ll_remark: remark,
      ll_createdTime: new Date(),
      ll_updatedTime: new Date()
    });
    return response.json({ code: errorcode.SUCCESS, msg: tips.DATA_ADD_SUCCESS })
  } catch(e) {
    return response.json({ code: errorcode.NETWORK_ERROR, msg: tips.NETWORK_ERROR });
  }
})

export default router;