const test = require('ava')
const getTimezoneStringByCityName = require('../src')

test('it should return correct timezone string for Moscow city', (t) => {
  return getTimezoneStringByCityName('Moscow', process.env.TIMEZONE_DB_API_KEY)
    .then(result => t.is(result, 'Europe/Moscow'))
})

test('it should return correct timezone string for Abu Dhabi city', (t) => {
  return getTimezoneStringByCityName('Abu Dhabi', process.env.TIMEZONE_DB_API_KEY)
    .then(result => t.is(result, 'Asia/Dubai'))
})

test('it should return correct timezone string for city written in cyrillic', (t) => {
  return getTimezoneStringByCityName('Самара', process.env.TIMEZONE_DB_API_KEY)
    .then(result => t.is(result, 'Europe/Samara'))
})

test('it should return error object when invalid city name passed', (t) => {
  return getTimezoneStringByCityName('abracadbra', process.env.TIMEZONE_DB_API_KEY)
    .then(result => t.is(result.isError, true))
})

test('it should return error object when invalid args passed', (t) => {
  return getTimezoneStringByCityName(1, {})
    .then(result => t.is(result.isError, true))
})
