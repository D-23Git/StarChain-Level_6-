import React, { useMemo } from 'react';
import { Activity, ArrowUpRight, Zap } from 'lucide-react';
import { EXPLORER_BASE } from '../utils/stellar';
import { useStore } from '../hooks/useStore';
import './MetricsDashboard.css';

export default function MetricsDashboard() {
  const { businesses, totalReviews } = useStore();

  const activeUsers = useMemo(() => {
    const users = new Set();
    businesses.forEach(b => {
      if (b.owner) users.add(b.owner);
      (b.revs || []).forEach(r => {
        if (r.reviewer) users.add(r.reviewer);
      });
    });
    return users.size;
  }, [businesses]);

  return (
    <div className="metrics-container animate-fade-in">
      <div className="metrics-header">
        <h1>Protocol Health & Metrics</h1>
        <p>Real-time on-chain statistics and network performance monitoring for StarChain Protocol v1.0</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total On-Chain Reviews</div>
          <div className="metric-value">{totalReviews}</div>
          <div className="metric-sub">Verified through Freighter</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Verified Businesses</div>
          <div className="metric-value">{businesses.length}</div>
          <div className="metric-sub">Registered across the network</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Active Users</div>
          <div className="metric-value">{activeUsers}</div>
          <div className="metric-sub">Unique Wallets connected</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Network Success Rate</div>
          <div className="metric-value">99.8%</div>
          <div className="metric-sub">Stellar Testnet Node</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-placeholder">
          <div className="metric-label" style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <Activity size={18} color="#a78bfa" />
            Transaction Volume (Last 7 Days)
          </div>
          <div className="chart-bar-container">
            <div className="chart-bar" style={{height: '40%'}}></div>
            <div className="chart-bar" style={{height: '65%'}}></div>
            <div className="chart-bar" style={{height: '50%'}}></div>
            <div className="chart-bar" style={{height: '85%'}}></div>
            <div className="chart-bar" style={{height: '70%'}}></div>
            <div className="chart-bar" style={{height: '95%'}}></div>
            <div className="chart-bar" style={{height: '80%'}}></div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', width:'100%', padding:'0 10px'}}>
            <span className="chart-label">Mon</span>
            <span className="chart-label">Tue</span>
            <span className="chart-label">Wed</span>
            <span className="chart-label">Thu</span>
            <span className="chart-label">Fri</span>
            <span className="chart-label">Sat</span>
            <span className="chart-label">Sun</span>
          </div>
        </div>

        <div className="chart-placeholder">
          <div className="metric-label" style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <Zap size={18} color="#10b981" />
            Protocol Performance
          </div>
          <div style={{marginTop: '20px', width: '100%'}}>
            <div style={{marginBottom:'15px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', marginBottom:'5px'}}>
                <span>Avg. Block Time</span>
                <span style={{color:'var(--primary-light)'}}>5.2s</span>
              </div>
              <div style={{height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'10px'}}>
                <div style={{width:'90%', height:'100%', background:'#a78bfa', borderRadius:'10px'}}></div>
              </div>
            </div>
            <div style={{marginBottom:'15px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', marginBottom:'5px'}}>
                <span>Smart Contract Latency</span>
                <span style={{color:'var(--primary-light)'}}>1.4s</span>
              </div>
              <div style={{height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'10px'}}>
                <div style={{width:'95%', height:'100%', background:'#10b981', borderRadius:'10px'}}></div>
              </div>
            </div>
          </div>
          <a 
            href={EXPLORER_BASE} 
            target="_blank" 
            rel="noreferrer"
            style={{marginTop:'20px', color:'var(--primary-light)', fontSize:'0.9rem', display:'flex', alignItems:'center', gap:'5px', textDecoration:'none'}}
          >
            View on Stellar Expert <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
