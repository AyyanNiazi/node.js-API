
import { Request, Response  } from "express"
export const getUser = function (req: Request, res: Response) {
    res.sendFile(process.cwd() + '../../../index.html');
}
