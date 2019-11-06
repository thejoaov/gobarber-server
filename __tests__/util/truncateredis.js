import database from '../../src/database/index';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.redisconnection).map(key => {
      return database.connection.redisconnection[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}
