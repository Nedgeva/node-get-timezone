const axios = require('axios')
const { escape } = require('querystring')
const AJV = require('ajv')

const ajv = new AJV({ allErrors: true })

const {
  yaMapsResSchema,
  tdbResSchema,
} = require('./schemas')

const {
  yaFeatMemberKp,
  yaPosKp,
  tdbStatusKp,
  tdbZoneNameKp,
} = require('./keypaths')

const {
  getPropSafely,
  makeSafeErrorObject,
} = require('./utils')

const validateYaMapsRes = ajv.compile(yaMapsResSchema)
const validateTdbRes = ajv.compile(tdbResSchema)

const getTimezoneStringByCityName = async (cityName, tdbApiKey) => {
  try {
    if (typeof cityName !== 'string' || typeof tdbApiKey !== 'string') {
      return makeSafeErrorObject('invalid args! It only accepts Strings as CityName and API key')
    }

    const city = escape(cityName)

    const yaMapsRes = await axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${city}&format=json&results=1`)
    const isYaMapsResValid = validateYaMapsRes(yaMapsRes.data)

    if (!isYaMapsResValid) {
      return makeSafeErrorObject('invalid yandex maps API response')
    }

    const yaMapsFeatMember = getPropSafely(yaFeatMemberKp, yaMapsRes.data)
    const yaMapsPos = getPropSafely(yaPosKp, yaMapsFeatMember[0])
    const posCoordsArray = yaMapsPos.split(' ')

    const tdbRes = await axios.get(`http://api.timezonedb.com/v2/get-time-zone?key=${tdbApiKey}&format=json&by=position&lat=${posCoordsArray[1]}&lng=${posCoordsArray[0]}`)
    const isTdbResValid = validateTdbRes(tdbRes.data)

    if (!isTdbResValid) {
      return makeSafeErrorObject('invalid TimezoneDB API response')
    }

    const status = getPropSafely(tdbStatusKp, tdbRes.data)

    if (status.toLowerCase() !== 'ok') {
      return makeSafeErrorObject('TimezoneDB returned error')
    }

    const zoneName = getPropSafely(tdbZoneNameKp, tdbRes.data)

    return zoneName
  } catch (ex) {
    return makeSafeErrorObject(ex.message)
  }
}

module.exports = getTimezoneStringByCityName
