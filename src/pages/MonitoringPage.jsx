import { useState, useEffect } from 'react'
import { useStore } from '../hooks/useStore'
import { CONTRACT_ID, short } from '../utils/stellar'
import './MonitoringPage.css'

export default function MonitoringPage() {
  const { businesses, totalReviews } = useStore()
  const [latency, setLatency] = useState(120)
  const [uptime, setUptime] = useState('99.98%')
  const [nodeStatus, setNodeStatus] = useState('Healthy')
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Simulate real-time monitoring data
    const interval = setInterval(() => {
      setLatency(prev => Math.max(80, Math.min(200, prev + (Math.random() * 20 - 10))))
      
      const newEvent = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'CONTRACT_EVENT' : 'RPC_QUERY',
        msg: Math.random() > 0.5 ? 'Fetched latest business states' : 'Verified review signature',
        ts: new Date().toLocaleTimeString()
      }
      setEvents(prev => [newEvent, ...prev].slice(0, 8))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mon-page">
      <div className="wrap">
        <header className="mon-header">
           <div className="mon-title-row">
             <div className="mon-pulse"></div>
             <h1>System Health & Indexing Status</h1>
           </div>
           <p className="mon-subtitle">Real-time telemetry for StarChain Protocol (Stellar Testnet)</p>
        </header>

        <div className="mon-grid">
           {/* Metric Card 1 */}
           <div className="mon-card glass">
              <label>RPC Latency</label>
              <div className="mon-val">{latency.toFixed(0)}ms</div>
              <div className="mon-bar"><div className="mon-progress" style={{width: '60%'}}></div></div>
              <span className="mon-hint">Region: Mumbai-Stellar-Node-01</span>
           </div>

           {/* Metric Card 2 */}
           <div className="mon-card glass">
              <label>Network Uptime</label>
              <div className="mon-val text-green">{uptime}</div>
              <div className="mon-status-line">
                 {[...Array(20)].map((_, i) => <div key={i} className="uptime-dot"></div>)}
              </div>
              <span className="mon-hint">SLA: 99.9% High Availability</span>
           </div>

           {/* Metric Card 3 */}
           <div className="mon-card glass">
              <label>Node Status</label>
              <div className="mon-val">{nodeStatus}</div>
              <div className="mon-status-chip">OPERATIONAL</div>
              <span className="mon-hint">Last Block: #5289120</span>
           </div>
        </div>

        <section className="mon-sec">
           <div className="mon-sec-head">
              <h2>On-Chain Data Sync</h2>
              <span className="mon-count">Total Businesses: {businesses.length}</span>
           </div>
           
           <div className="indexing-table-wrap">
              <table className="indexing-table">
                 <thead>
                    <tr>
                       <th>Contract</th>
                       <th>Operation</th>
                       <th>Data Layer</th>
                       <th>Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td className="code">{short(CONTRACT_ID)}</td>
                       <td>Business Discovery</td>
                       <td>Events (L1)</td>
                       <td><span className="tag-sync">SYNCED</span></td>
                    </tr>
                    <tr>
                       <td className="code">{short(CONTRACT_ID)}</td>
                       <td>Review Aggregation</td>
                       <td>Storage Index (L2)</td>
                       <td><span className="tag-sync">LIVE</span></td>
                    </tr>
                    <tr>
                       <td className="code">---</td>
                       <td>User SRT Payouts</td>
                       <td>Batch Processing</td>
                       <td><span className="tag-pending">PENDING</span></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </section>

        <section className="mon-sec">
           <div className="mon-sec-head">
              <h2>Recent Indexing Events</h2>
           </div>
           <div className="event-list">
              {events.map(e => (
                <div key={e.id} className="event-row ani-in">
                   <span className="e-ts">[{e.ts}]</span>
                   <span className="e-type">{e.type}</span>
                   <span className="e-msg">{e.msg}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  )
}
