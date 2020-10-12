import everyHour from './everyHour'

export default (cron) => {
  cron.schedule('0 * * * *', everyHour)
}