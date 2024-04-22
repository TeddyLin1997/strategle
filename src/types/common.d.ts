type Tick = { price: string, open: string }
type TopItem = { name: string, symbol: string, icon: string, url: string  }
type WorldIndex = { name: string, symbol: string, country: string, url: string  }
type Commodity = { name: string, symbol: string, icon: string, description: string, url: string  }
type New = {
  banner_image: string
  title: string
  summary: string
  source: string
  time_published: string
  url: string
  overall_sentiment_label: string
  overall_sentiment_score: number
  topics: Array<string>
}
