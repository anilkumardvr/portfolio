import './WorkPermit.css';

export default function WorkPermit() {
  return (
    <div className="work-permit-container">
      <div className="permit-card">
        <p className="permit-eyebrow">Canada Employment Eligibility</p>

        <h2>Work Authorization</h2>

        <p className="permit-summary">
          I am currently residing in Canada and hold an Open Work Permit. I am legally authorized
          to work for eligible employers across Canada without employer sponsorship or LMIA support.
        </p>

        <div className="permit-grid">
          <div>
            <span>Status</span>
            <strong>Open Work Permit Holder</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>Toronto, Ontario, Canada</strong>
          </div>

          <div>
            <span>Employer Requirement</span>
            <strong>No sponsorship required</strong>
          </div>

          <div>
            <span>Role Availability</span>
            <strong>Contract, full-time, hybrid, remote, or onsite</strong>
          </div>
        </div>

        <p className="note">
          Open to DevOps, Cloud Engineering, Platform Engineering, SRE, and Infrastructure
          Automation opportunities across Canada.
        </p>
      </div>
    </div>
  );
}
