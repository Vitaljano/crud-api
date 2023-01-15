import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const fakeData = [
  { username: 'Will', age: 15, hobbies: ['basketball', 'chess'] },
  { username: 'Lukas', age: 16, hobbies: ['video games', 'films', 'poker'] },
  { username: 'Dasty', age: 15, hobbies: ['read'] },
  { username: 'Eleven', age: 16, hobbies: [''] },
  { username: 'Erika', age: 10, hobbies: ['trolyng'] },
  { username: 'Nensi', age: 21, hobbies: ['read', 'photo'] },
  { username: 'Mike', age: 16, hobbies: ['game'] },
  { username: 'Leo', age: 32, hobbies: ['football'] },
  { username: 'Marco', age: 22, hobbies: ['football', 'girls'] },
  { username: 'Vudi', age: 50, hobbies: ['movies'] },
];

fakeData.forEach(async (item) => {
  const req = http.request(
    {
      host: 'localhost',
      port: process.env.PORT || 3000,
      method: 'POST',
      path: '/api/users',
    },
    (res) => {
      res.resume();
      res.on('end', () => {
        if (!res.complete)
          console.error(
            'The connection was terminated while the message was still being sent'
          );
      });
    }
  );
  req.write(JSON.stringify(item));
  req.end();
});

console.log('This script add to server 10 fake accounts');
