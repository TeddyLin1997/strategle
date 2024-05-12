type Tick = { price: string, open: string }
type TopItem = { name: string, symbol: string, icon: string, url: string  }
type WorldIndex = { name: string, symbol: string, country: string, url: string  }
type Commodity = { name: string, symbol: string, icon: string, description: string, url: string  }
type New = {
  id: string
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

type Transaction = {
  id: string
  type: 'STRAG_Token' | 'Tether_Token'
  event: string
  transactionHash: string
  blockHash: string
  blockNumber: number
  from: string
  to: string
  value: string
  timestamp: Date
}
