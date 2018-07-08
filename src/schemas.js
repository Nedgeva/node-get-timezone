const yaMapsResSchema = {
  type: 'object',
  required: ['response'],
  properties: {
    response: {
      type: 'object',
      required: ['GeoObjectCollection'],
      properties: {
        GeoObjectCollection: {
          type: 'object',
          required: ['featureMember'],
          properties: {
            featureMember: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['GeoObject'],
                properties: {
                  GeoObject: {
                    type: 'object',
                    required: ['Point'],
                    properties: {
                      Point: {
                        type: 'object',
                        required: ['pos'],
                        properties: {
                          pos: {
                            // https://stackoverflow.com/a/18690202
                            pattern: '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

const tdbResSchema = {
  type: 'object',
  required: ['status', 'zoneName'],
  properties: {
    status: {
      type: 'string',
    },
    zoneName: {
      type: 'string',
    },
  },
}

module.exports = {
  yaMapsResSchema,
  tdbResSchema,
}
