import fetch from "node-fetch"

// https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=ljFzZQ1pysSEnDtMOfQg3II0JFmlslCz

const API_KEY = "ljFzZQ1pysSEnDtMOfQg3II0JFmlslCz"

class TomorrowIOWrapper {
  #apiKey
  #location
  
  constructor(apiKey, lat, lng) {
    if (!(apiKey && lat && lng)) {
      throw new Error("Missing arguments")
    }

    this.#apiKey = apiKey
    this.#location = `${lat}%2C${lng}` 
  }

  async getWeatherData(fields, timesteps) {
    const url = queryBuilder("https://api.tomorrow.io/v4/timelines", {
      location: this.#location,
      apikey: this.#apiKey,
      fields,
      timesteps,
    })

    const response = await fetch(url)
    return response.json()
  }
}

function queryBuilder(request, options) {
  request += "?"

  Object.keys(options).forEach((key) => {
    if (request[request.length - 1] !== "?") {
      request += "&"
    }
    request += `${key}=${options[key]}`
  })

  return request
}

(async () => {
  const homeTownMonitor = new TomorrowIOWrapper(API_KEY, 41.3851, 2.1734)
  
  const response = await homeTownMonitor.getWeatherData(
    "temperature", 
    "current"
  )

  console.log(JSON.stringify(response))
})();