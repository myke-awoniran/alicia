import Redis from 'ioredis';
import { config } from '../config';

const subscriber = new Redis(config.redis.uri);
const publisher = new Redis(config.redis.uri);

export default new class PubSub {

    publish(channel: string, message: string) {
        publisher.publish(channel, message);
    }

    subscribe(channel: string) {
        subscriber.subscribe(channel);
    }

    on(event: string, callback: Function) {
        subscriber.on(event, (channel, message) => {
            callback(channel, message);
        });
    }
}();