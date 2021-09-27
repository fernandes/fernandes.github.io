---
layout: article
title:  Time Zones From A Developer's Perspective
date:   2019-01-19 12:25:00
categories: web
tags: postgresql, rails, javascript, date-fns
path: /timezones-from-a-developers-perspective
excerpt: |
  Let's talk in this article about timezones and how it applies to a web system.
  There are 3 main layers where is necessary to pay attention when working with date and times:<br />
  <ul>
    <li>- Database</li>
    <li>- Rails</li>
    <li>- JavaScript</li>
  </ul>
media:
  type: image
  source: posts_timezones
  alt: Dali painting the persistence of memory
  caption: the persistence of memory
---

# Time Zones From A Developer's Perspective

Let's talk in this article about timezones and how it applies to a web system. There are 3 main layers where is necessary to pay attention when working with date and times:  

- Database
- Rails
- JavaScript

If you don't know how the data is moving from one to another, you should check the code of other layers to avoid problems converting timezones and to be sure that the data is on correct timezone/format.

First things first, there are many ways to configure the database, as well as the application, including the host server to use the specific timezones. In my particular opinion, I believe that the best approach is to keep the 3 layers in UTC (Coordinated Universal Time) and guarantee the database stores in this reference. So, in the next lines of this post, we consider the 3 configured as UTC.

Before to start, just a straightforward explanation: GMT Offset isn't the same thing of Timezone, there are different concepts here! If you are aware of the difference, you can move to the next section, otherwise, let's go!

GMT Offset is information that says about a particular time, and how is different according to the universal reference GMT/UTC. Can be a value as -0300 or -03. This difference is because exist broken timezones inside the hour. 😱 Are you curious about these timezones? <a href="https://www.timeanddate.com/time/time-zones-interesting.html" target="_blank" rel="noopener noreferrer">Check more info here [external]</a>

Inside timezones contain data as summer time.

`America/Belem` is **-0300** all year, and `America/Sao_Paulo` is **-0300** during the year, and **-0200** in the summertime. How to obtain this information about summertime, when start and finish? Because of these nuances timezone is so essential!

## Storage and Processing

To store and exhibit the right date is like a song, that orchestrates between many different elements that play it. In our case, as we have 3 main layers, depending on the flow, each one has its importance, but exist some rules and some tricks that is a good practice if we follow.

### Database

First, it's important to be aware that the PostgreSQL handle time stamps in 2 different fields:

- `timestamp [ (p) ] [ without time zone ]`
- `timestamp [ (p) ] with time zone`

Both with 8 bytes of size, the lower value (year of) 4713 BC highest value (year of) 294276 AD, with a resolution of 1 microsecond, so the only difference is how the database process with (or without) timezone.

Tip: `timestamp` is a SQL standard across all databases for fields without timezone, the Postgre respect this standard, and, additionally, supports the field `timestamptz` for values with timezone, as an extension.

A request on PostgreSQL usually involves some data manipulation (sums, averages, groupings by day/hour) in UTC. When it is necessary to do some of these operations using a specific timezone, the first action is to convert the `timestamp` field to a specific timezone, so then to do the operation:

```sql
date_trunc('hour', measured_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') as date
```

ps: If it's a field `timestamp` without timezone, must first to inform that the date is in UTC, do then to inform the final timezone, in doubt, always inform that is in UTC.

### Rails

The Rails use the library `ActiveSupport` to support many operations with date; it's fantastic all possibilities. Another library `ActiveRecord` is responsible for doing the full internally conversion and to perform the sanitizing of input and to assemble the queries correctly if it was using operations in UTC, and as the framework is configured to use UTC ether (in doubt check, see the attachments in the end).

To  pick up the current date at a specific timezone is possible using: 

```ruby
Time.use_zone('America/Sao_Paulo') { DateTime.current }
```

Starting from a data string that came from a client, convert the object to the correct DateTime  timezone, use:  

```ruby
ActiveSupport::TimeZone['America/Sao_Paulo'].parse('2018-12-01')
```

Tip: the data needs to be at least 'YYYY-MM-DD'.

Tip2: In the example above, will be converted to the time 00:00 (midnight); however it's possible to set a date as '2018-12-01 13:58' to receive even in hour desired.

Tip3: After the parsing, is possible to use methods like `.beginning_of_day`, `.end_of_day`, `+ 3.hours` to perform operations on date.

**Pro Tip:** I had a severe problem once parsing a date string to a timezone, and then query the database, generated an unexpected result. I found that two objects that aren't in the same timezone, and during the conversion led to an unexpected result. So I discovered that a super simple verification is to check if the object is on the timeline desired.
Explaining in a practical example, we received the start dare, and we want to check if it's in an expected timezone.

```ruby
start_date = ActiveSupport::TimeZone['America/Belem'].parse('2018-12-01')
start_date.time_zone.name == 'America/Sao_Paulo'
# => false
```

Very simple, and can save some precious minutes of our lives. 

### JavaScript

Starting with the front end, as a quick quiz, let's see the first particularity about JS. Running the code:

```js
new Date
```

What is the timezone of the data object? Counting 1, counting 2...that is it!

`Wed Jan 09 2019 17:44:27 GMT+0200 (Eastern European Standard Time)`

It is on the same timezone where the machine is running the code, so this doesn't provide any information about the server, or event timezone, so we can just trust the browser, how to convert it correctly?

The information that comes from the server can come or not with timezone in a string. Something like this:
_"2018-12-01 00:00:00 -0200"_

It's necessary for some way to set the timezone, not just parse the string, if it was in milliseconds, the browser converts considering the computer timezone, not UTC.

If we received a time that the client-server is waiting to visualize in your machine, as an email that just received, this makes sense to be in local time. However, if this information was about another timezone, will diverge from the informed hour.

```js
const date = parseFromTimeZone('2018-12-01 00:00', { timeZone: 'America/Sao_Paulo' })
// Sat Dec 01 2018 04:00:00 GMT+0200 (EET)
formatToTimeZone(date, 'YYYY-MM-DD HH:mm', { timeZone: 'America/Sao_Paulo' })
// "2018-12-01 00:00"
```

In a case where your string has the information of GMT offset, like '2018-12-01 00:00 +0200', can use the function `parseFromString`

```js
parseFromString('2018-12-01 00:00 -0100', 'YYYY-MM-DD hh:mm ZZ')
```

If it is just about to print the date in a specific format, it's ok, but if you use this data in some calculation or further manipulation, you need to parse, otherwise, it can generate a divergence in values, always remember: GMT offset isn't timezone ;)

## Use Cases

### Flight Schedule

Data displayed at the customer's local timezone.

Receiving:

1. Get the data at the client's timezone
2. Send the time/timezone information to the server (essential to avoid problems with DST)
3. The server processes time based on the timezone
4. To check the database in UTC or TZ

Sending:

1. To check the database in UTC or TZ
1. Returns the data in the client's timezone
1. Displays in the local timezone

### Telemetry

The data is displayed at a specified timezone in the backend, in a case the backend knows which timezone must perform the operations, so it must inform the client of this information.

Receiving / Sending:

1. The client sends the time in the TZ format of the place being monitored, reported by the server
1. The server receives the string and parses for time TZ of the place
1. Consult the database by shifting the database date to the TZ of the place
1. Send the data in the TZ format of the place

### Calendar

Data displayed in different timezones

Receiving:

1. In this case, all data sent to the server should be in UTC or specified at each date of timezone, I believe that keeping UTC is the best for the frontend/backend.
1. The system only receives data and stores in UTC
1. The system sends data in UTC
1. JS displays the data in the respective timezones

Of course, these use cases are not (and should not be) used as silver bullets, the intention was more to alert that there are different problems/approaches to data manipulation. The server / front end may have more or fewer responsibilities depending on the scope of the problem and its users. 

## Attachments

Checking the PostgreSQL date setting

```sql
show timezone;
--     TimeZone
-- -----------------
--       UTC
```

However the Rails / ActiveRecord set the date on each connection, check through the console rails:

```ruby
ActiveRecord::Base.connection.execute('show timezone;').values.first
#   (0.4ms)  show timezone;
# => ["UTC"]

# Checking the Rails configuration
Rails.application.config.time_zone
# "UTC"
```

Thank you for reading until here, English is not my first language but I'm trying to improve it everyday, if you have any consideration about grammar, or some sentence that is not clear, I appreciate so much if you could send me a review here on [Github](https://github.com/fernandes/fernandes.github.io/blob/master/src/posts/2019-01-19-timezones-from-a-developers-perspective.md)

ps: I'm still cooking my comments sections, in the meanwhile you get in [touch](https://coding.com.br/contact/)
