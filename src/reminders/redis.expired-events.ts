import PubSub from './pubSub';
import {REMINDER_ACTION_KEY, RedisRepo} from './redis.repo';
import {Logger} from '../helpers';

const REMINDER_EXPIRED_EVENT = '__keyevent@0__:expired';
const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export class ReminderProcessor extends RedisRepo {
    private readonly redisRepo: RedisRepo;

    constructor() {
        super();
        this.redisRepo = new RedisRepo();
    }

    public init() {
        PubSub.subscribe(REMINDER_EXPIRED_EVENT);
        PubSub.on(REMINDER_ACTION_KEY.MESSAGE, this.handleExpiredEvent.bind(this));
    }

    private async handleExpiredEvent(channel: string, message: string) {
        const [type, key] = message.split(':');

        if (type !== REMINDER_ACTION_KEY.REMINDER) {
            return
        }

        await this.processReminder(key);

        const value = await this.redisRepo.get(key);
        Logger.Info('VALUE:', value);
        await this.processReminder(key);
    }

    private async processReminder(reminderId: string): Promise<void> {
        try {
            // This is an function where you can process your reminder.
            // check the database with the reminder ID, and send out multicast notifications to your users.
            Logger.Info(`Reminder Fired for event ${reminderId}`)
        } catch (error) {
            Logger.Error(`Error processing reminder ${reminderId}: ${error}`);
        }
    }

}
