import {Elysia} from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

import {ReminderProcessor} from './reminders';
import {Logger} from "./helpers";

new ReminderProcessor().init();
Logger.Info('🔔🔔🔔  Reminder Processor initialized.');

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);