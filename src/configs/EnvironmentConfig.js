const dev = {
  //   API_ENDPOINT_URL: 'https://jsonplaceholder.typicode.com'
  API_ENDPOINT_URL: 'https://www.ecommerce.riolabz.com/api/v1',
}

const prod = {
  API_ENDPOINT_URL: 'https://api.prod.com',
}

const test = {
  API_ENDPOINT_URL: 'https://api.test.com',
}

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev
    case 'production':
      return prod
    case 'test':
      return test
    default:
      break
  }
}

export const env = getEnv()
