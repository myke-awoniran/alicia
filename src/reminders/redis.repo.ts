import Redis from 'ioredis';
import {Logger} from '../helpers';
import {config} from '../config';

export interface SetReminderParam {
    key: string;
    value: string;
    expire: number;
}

export enum REMINDER_ACTION_KEY {
    REMINDER = 'reminder',
    MESSAGE = 'message',
    READY = 'ready'
}

export class RedisRepo {
    private redis: Redis;

    constructor() {
        this.redis = new Redis(config.redis.uri);
        this.redis.on(REMINDER_ACTION_KEY.READY, () => {
            this.redis.config('SET', 'notify-keyspace-events', 'Ex');
        });
    }

    public get(key: string) {
        return this.redis.get(key);
    }

    public setReminder(reminderParam: SetReminderParam) {
        this.redis
            .multi()
            .set(reminderParam.key, reminderParam.value)
            .set(`${REMINDER_ACTION_KEY.REMINDER}:${reminderParam.key}`, 1)
            .expire(`${REMINDER_ACTION_KEY.REMINDER}:${reminderParam.key}`, reminderParam.expire)
            .exec();

        Logger.Info(`reminder set for ${reminderParam.key}`);
    }
}