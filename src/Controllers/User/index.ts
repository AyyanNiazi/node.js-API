
import { Request, Response  } from "express"
export const getUser = function (req: Request, res: Response) {
    res.send('User Api');
}
