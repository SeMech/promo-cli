import { Request, Response } from 'express';
import express from 'express';

const App = express();
const port = 8080;

App.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

App.listen(port, function () {
    console.log(`Started server from port ${port}`);
});
