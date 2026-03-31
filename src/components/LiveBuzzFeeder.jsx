import { useState, useEffect } from 'react'
import { short } from '../utils/stellar'
import './LiveBuzzFeeder.css'

const MOCK_EVENTS = [
  { action: 'left a 5-star review for', target: 'Sharma Dosa', icon: '⭐' },
  { action: 'verified a transaction on', target: 'Soroban L1', icon: '⛓️' },
  { action: 'registered a new business', target: 'in Mumbai', icon: '🏢' },
  { action: 'claimed 50 SRT tokens', target: 'for contributing', icon: '💰' },
  { action: 'upvoted a review at', target: 'Burger King', icon: '👍' }
]

const randomHex = () => 'G' + Math.random().toString(36).substring(2, 6).toUpperCase()

export default function LiveBuzzFeeder() {
  const [buzz, setBuzz] = useState(null)

  useEffect(() => {
    // Start interval
    const interval = setInterval(() => {
      // 30% chance to show a notification every 5 seconds
      if (Math.random() > 0.3) {
        const evt = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)]
        setBuzz({
          id: Date.now(),
          user: randomHex() + '...' + randomHex().slice(-4),
          ...evt
        })

        // Remove after 4 seconds
        setTimeout(() => setBuzz(null), 4000)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  if (!buzz) return null

  return (
    <div className="live-buzz-popup ani-slide-up">
      <div className="lbp-icon">{buzz.icon}</div>
      <div className="lbp-context">
        <span className="lbp-user">{buzz.user}</span> {buzz.action} <span className="lbp-target">{buzz.target}</span>
      </div>
    </div>
  )
}
