import * as http from 'http';
import * as dotenv from 'dotenv';

import CODES from './codes';
import { requestLog } from './helpers/requestLog';
import {
  getUser,
  getUsers,
  updateUser,
  createUser,
  removeUser,
} from './controller/userController';

import { Error } from './types/types';

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    requestLog(req, res);

    if (req.method === 'GET' && req.url === '/api/users') {
      getUsers(req, res);
    } else if (req.method === 'GET' && req.url?.match(/\/api\/users\/ ?(.*)/)) {
      const id = req.url?.split('/')[3];
      getUser(req, res, id);
    } else if (req.method === 'PUT' && req.url?.match(/\/api\/users\/ ?(.*)/)) {
      const id = req.url?.split('/')[3];
      updateUser(req, res, id);
    } else if (
      req.method === 'DELETE' &&
      req.url?.match(/\/api\/users\/?(.*)/)
    ) {
      const id = req.url?.split('/')[3];
      removeUser(req, res, id);
    } else if (req.method === 'POST' && req.url === '/api/users') {
      createUser(req, res);
    } else {
      res.writeHead(CODES.NOT_FOUND, { 'Content-Type': 'application/JSON' });
      res.end(JSON.stringify({ message: 'Route not Found' }));
    }
  } catch (err) {
    console.log('Ops! Something failed =)');
    res.statusCode = CODES.INTERNET_SERVER_ERROR;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ error: 'Ops! Something failed =)' }));

    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err: Error) => {
  if (err.code === 'EACCESS') {
    console.log(`No Access to ${PORT}`);
  }
});

export default server;
