const SITE_NAME = process.env.REACT_APP_SITE_NAME

const dev = {
  //   https://ecommercelive.riolabz.com'
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? // TODO: CHANGE NEEDED FOR PROD
        'https://ecommercelive.riolabz.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : // Default For Awen
        'https://awenapi.riolabz.com/api/v1',
}

const prod = {
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? 'https://api.zapkart.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : // Default For Awen
        'https://awenapi.riolabz.com/api/v1',
}

const test = {
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? 'https://ecommercelive.riolabz.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : // Default For Awen
        'https://awenapi.riolabz.com/api/v1',
}

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev
    case 'production':
      return process.env.REACT_APP_API_STAGE === 'Dev' ? dev : prod
    case 'test':
      return test
    default:
      break
  }
}

export const env = getEnv()
