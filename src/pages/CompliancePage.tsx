import { FileText, Download, CheckCircle2 } from 'lucide-react';

const reports = [
  { id: 'RPT-2026-Q1-EPA', name: 'EPA Quarterly Emissions Report', type: 'EPA', date: '2026-01-31', status: 'SUBMITTED' },
  { id: 'RPT-2026-Q1-OSHA', name: 'OSHA Air Quality Compliance', type: 'OSHA', date: '2026-01-31', status: 'SUBMITTED' },
  { id: 'RPT-2026-02-ISO', name: 'ISO 45001 Safety Audit', type: 'ISO', date: '2026-02-15', status: 'APPROVED' },
  { id: 'RPT-2026-02-INT', name: 'Internal Safety Assessment', type: 'INTERNAL', date: '2026-02-10', status: 'APPROVED' },
  { id: 'RPT-2026-02-INC', name: 'H₂S Incident Report EM-0043', type: 'INCIDENT', date: '2026-02-14', status: 'FILED' },
  { id: 'RPT-2026-02-CAL', name: 'Sensor Calibration Certificates', type: 'CALIBRATION', date: '2026-02-18', status: 'CURRENT' },
];

const certifications = [
  { name: 'IECEx Certificate of Conformity', expiry: '2027-08-15', status: 'VALID' },
  { name: 'ATEX Equipment Certification', expiry: '2027-06-22', status: 'VALID' },
  { name: 'ISO 45001:2018 Certification', expiry: '2026-12-01', status: 'VALID' },
  { name: 'OSHA VPP Star Status', expiry: '2026-09-30', status: 'RENEWAL DUE' },
  { name: 'EPA Emissions Permit', expiry: '2026-05-15', status: 'RENEWAL DUE' },
];

const CompliancePage = () => (
  <div className="space-y-6">
    <div>
      <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">REGULATORY</div>
      <h1 className="font-display text-3xl text-foreground tracking-wider">COMPLIANCE & REPORTS</h1>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: 'COMPLIANCE SCORE', value: '98%', color: 'text-safe' },
        { label: 'REPORTS FILED', value: '24', color: 'text-primary' },
        { label: 'AUDITS PASSED', value: '6/6', color: 'text-safe' },
        { label: 'NEXT AUDIT', value: 'MAR 15', color: 'text-foreground' },
      ].map(s => (
        <div key={s.label} className="bg-card border border-border p-4">
          <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-1">{s.label}</div>
          <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
        </div>
      ))}
    </div>

    {/* Reports */}
    <div className="bg-card border border-border">
      <div className="border-b border-border px-5 py-3">
        <h3 className="font-display text-sm tracking-wider text-foreground">RECENT REPORTS</h3>
      </div>
      {reports.map(r => (
        <div key={r.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
          <div className="flex items-center gap-3">
            <FileText size={14} className="text-primary" />
            <div>
              <div className="text-sm font-body text-foreground">{r.name}</div>
              <div className="text-[9px] font-mono-space text-muted-foreground">{r.id} • {r.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono-space text-safe tracking-wider">{r.status}</span>
            <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
              <Download size={12} className="text-primary" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Certifications */}
    <div className="bg-card border border-border">
      <div className="border-b border-border px-5 py-3">
        <h3 className="font-display text-sm tracking-wider text-foreground">CERTIFICATIONS</h3>
      </div>
      {certifications.map(c => (
        <div key={c.name} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={14} className={c.status === 'VALID' ? 'text-safe' : 'text-warning'} />
            <div>
              <div className="text-sm font-body text-foreground">{c.name}</div>
              <div className="text-[9px] font-mono-space text-muted-foreground">Expires: {c.expiry}</div>
            </div>
          </div>
          <span className={`text-[9px] font-mono-space tracking-wider ${c.status === 'VALID' ? 'text-safe' : 'text-warning'}`}>{c.status}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CompliancePage;
