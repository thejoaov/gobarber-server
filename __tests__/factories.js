import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Appointment from '../src/app/models/Appointment';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  provider: faker.random.boolean(),
});

factory.define('Appointment', Appointment, {
  date: faker.date.recent(),
  provider_id: faker.random.number(),
});

export default factory;
