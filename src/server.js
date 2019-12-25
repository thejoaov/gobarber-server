import boxen from 'boxen';
import app from './app';

console.log();
console.log(
  boxen(
    `Server Online!

ENV: ${process.env.NODE_ENV.toUpperCase()}
HOST: ${process.env.HOST}
PORT: ${process.env.PORT}
URL: ${process.env.APP_URL}`,
    { padding: 1, borderStyle: 'double' }
  )
);

app.listen(process.env.PORT);
