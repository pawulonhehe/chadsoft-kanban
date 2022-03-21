import { StatusCodes } from 'http-status-codes';

import { createUser, deleteUser } from '../controllers/user.controllers';

export const userRouter = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.delete('/users/:id', async (req, res) => {
    const response = await deleteUser(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};
