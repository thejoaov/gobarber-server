import Bee from 'bee-queue';
import CancelationMailProvider from '../app/jobs/CancelationMailProvider';
import CancelationMailUser from '../app/jobs/CancelationMailUser';
import redisConfig from '../config/redis';

const jobs = [CancelationMailProvider, CancelationMailUser];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig(),
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    console.log(job.name);
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      console.log('Queue started');
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED\n`, err);
  }
}

export default new Queue();
