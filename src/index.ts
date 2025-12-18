import {Elysia} from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

import {RedisRepo, ReminderProcessor} from './reminders';
import {Logger} from "./helpers";

new RedisRepo().setReminder({
    "key": "test-reminder-1",
    "value": "This is a test reminder",
    "expire": 10 // seconds
})

new ReminderProcessor().init();

Logger.Info('🔔🔔🔔  Reminder Processor initialized.');

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);