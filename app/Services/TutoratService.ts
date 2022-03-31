import { DateTime } from 'luxon'

export default class TutoratService {
  public static toDateTime(date: DateTime, time: DateTime): DateTime {
    const now = DateTime.local({ locale: 'fr' })

    return now.set({
      year: date.year,
      month: date.month,
      day: date.day,
      hour: time.hour,
      minute: time.minute,
    })
  }
}
