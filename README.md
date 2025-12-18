# Redis Reminder Service (ElysiaJS)

## About

High-performance reminder service built entirely on Redis. It leverages Redis pub/sub and Keyspace notification features
to schedule, track, and trigger reminders with minimal latency and maximum reliability.

---

## Overview

This service provides a lightweight, event-driven reminder engine powered by Redis TTLs and keyspace notifications.
Instead of relying on cron jobs or database polling, reminders are triggered instantly when Redis keys expire.

The system is designed for:

- Low-latency reminder execution
- High throughput
- Horizontal scalability
- Minimal infrastructure overhead

---

## Key Features

- Redis-based scheduling using key expiration (TTL)
- Real-time triggering via Redis Keyspace Notifications
- Pub/Sub–driven event handling
- High-performance ElysiaJS server
- No polling, no cron jobs
- Simple and predictable reminder lifecycle
- Fully in-memory with Redis durability guarantees

---

## Architecture

```
┌──────────────┐
│   Clients    │
└──────┬───────┘
       │
       ▼
┌────────────────┐
│   ElysiaJS     │
│ Reminder API  │
└──────┬─────────┘
       │ SET key with TTL
       ▼
┌────────────────────────┐
│        Redis           │
│  - TTL Scheduling      │
│  - Keyspace Events     │
│  - Pub/Sub             │
└──────┬─────────────────┘
       │ Key Expired Event
       ▼
┌────────────────────────┐
│ Reminder Event Handler │
│  - Trigger reminder    │
│  - Process Reminder fn │
└────────────────────────┘
```

## How It Works

The reminder service is built on Redis TTLs and Keyspace Notifications to deliver reminders with near-zero latency and
without background polling or cron jobs.

1. **Schedule a Reminder**  
   A reminder is created by writing a Redis key (e.g. `reminder:{id}`) with a time-to-live (TTL). The TTL represents
   when the reminder should fire.

2. **Redis Handles Timing**  
   Redis internally tracks the key expiration using its highly optimized event loop and timing wheel.

3. **Key Expiration Event**  
   When the TTL reaches zero, Redis deletes the key and emits a keyspace notification event.

4. **Pub/Sub Listener**  
   The service subscribes to Redis keyevent channels and receives the expiration event in real time.

5. **Reminder Execution**  
   The reminder handler is invoked immediately, executing the configured action (notification, callback, job trigger,
   etc.).

This architecture guarantees low latency, avoids polling, and scales horizontally by simply adding more consumers.

---

## Tech Stack

- **Runtime:** Bun / Node.js
- **Framework:** ElysiaJS
- **Scheduler & Storage:** Redis (TTL-based scheduling)
- **Messaging:** Redis Pub/Sub
- **Language:** TypeScript

---

## Redis Configuration

Redis keyspace notifications must be enabled for expiration events.

### Enable Notifications

```bash
redis-cli CONFIG SET notify-keyspace-events Ex
```
