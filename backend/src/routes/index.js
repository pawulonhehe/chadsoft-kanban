import { Router } from 'express';

import { columnRouter } from './column.routes';
import { taskRouter } from './tasks.routes';

const router = Router();
taskRouter(router);
columnRouter(router);
export default router;
