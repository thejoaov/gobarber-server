import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

import factory from '../factories';

describe('Appointments tests', () => {
  beforeEach(async done => {
    await truncate();
    done();
  });

  it('Should be able to create appointments', async () => {
    // Create user
    const user = await factory.attrs('User', {
      provider: false,
    });
    await request(app)
      .post('/users')
      .send(user);

    // Create provider
    const provider = await factory.attrs('User', {
      provider: true,
    });
    const responseProvider = await request(app)
      .post('/users')
      .send(provider);

    // Login as user to retrieve token
    const login = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    // Retrieve user token
    const { token } = login.body;

    // Make an appointment
    console.log(responseProvider);
    const appointment = await factory.attrs('Appointment', {
      provider_id: responseProvider.id,
    });

    const response = await request(app)
      .post('/appointments')
      .send(appointment)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
});
