import { Settings, Bell, Shield, Wifi, Database, Globe } from 'lucide-react';

const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">CONFIGURATION</div>
      <h1 className="font-display text-3xl text-foreground tracking-wider">SYSTEM SETTINGS</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Alert Configuration */}
      <div className="bg-card border border-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-primary" />
          <h3 className="font-display text-sm tracking-wider text-foreground">ALERT CONFIGURATION</h3>
        </div>
        {[
          { label: 'SMS Notifications', enabled: true },
          { label: 'Email Alerts', enabled: true },
          { label: 'Siren Activation', enabled: true },
          { label: 'Auto-Evacuation Trigger', enabled: false },
          { label: 'Push Notifications', enabled: true },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm font-body text-muted-foreground">{s.label}</span>
            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${s.enabled ? 'bg-safe/30' : 'bg-muted'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${s.enabled ? 'right-0.5 bg-safe' : 'left-0.5 bg-muted-foreground'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Network */}
      <div className="bg-card border border-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-primary" />
          <h3 className="font-display text-sm tracking-wider text-foreground">NETWORK STATUS</h3>
        </div>
        {[
          { label: 'Mesh Network', value: 'ACTIVE', color: 'text-safe' },
          { label: 'Cloud Sync', value: 'CONNECTED', color: 'text-safe' },
          { label: 'Backup Link', value: 'STANDBY', color: 'text-warning' },
          { label: 'Latency', value: '12ms', color: 'text-primary' },
          { label: 'Bandwidth', value: '847 Kbps', color: 'text-foreground' },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm font-body text-muted-foreground">{s.label}</span>
            <span className={`text-xs font-mono-space ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="bg-card border border-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          <h3 className="font-display text-sm tracking-wider text-foreground">SECURITY</h3>
        </div>
        {[
          { label: 'Two-Factor Auth', value: 'ENABLED' },
          { label: 'Session Timeout', value: '30 MIN' },
          { label: 'Encryption', value: 'AES-256' },
          { label: 'Last Audit', value: '2026-02-15' },
          { label: 'Access Level', value: 'ADMIN' },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm font-body text-muted-foreground">{s.label}</span>
            <span className="text-xs font-mono-space text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* System Info */}
      <div className="bg-card border border-border p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Database size={16} className="text-primary" />
          <h3 className="font-display text-sm tracking-wider text-foreground">SYSTEM INFO</h3>
        </div>
        {[
          { label: 'Platform Version', value: 'v4.2.1' },
          { label: 'Firmware', value: 'v2.8.4' },
          { label: 'Database', value: '2.4 GB / 10 GB' },
          { label: 'Last Backup', value: '2026-02-20 07:00 UTC' },
          { label: 'License', value: 'ENTERPRISE' },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm font-body text-muted-foreground">{s.label}</span>
            <span className="text-xs font-mono-space text-foreground">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SettingsPage;
