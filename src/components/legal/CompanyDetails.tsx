import { BRAND, COMPANY_LEGAL_NAME, COMPANY_LOCATION, PRIVACY_EMAIL, PRIVACY_OFFICER, SITE_URL, SUPPORT_EMAIL } from "@/lib/constants";

/** Impressum-style company details, rendered from constants only. */
export default function CompanyDetails({ heading = true }: { heading?: boolean }) {
  return (
    <div className="company-details">
      {heading ? <h3>Company details</h3> : null}
      <p>
        <strong>{COMPANY_LEGAL_NAME}</strong>
        <br />
        {COMPANY_LOCATION}
      </p>
      <ul>
        <li>Product: {BRAND.name}, operated by {COMPANY_LEGAL_NAME}, a Canadian company</li>
        <li>Postal address for legal notices: email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
        <li>Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
        <li>Privacy: {PRIVACY_OFFICER}, <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li>
        <li>Website: <a href={SITE_URL}>{SITE_URL}</a></li>
      </ul>
    </div>
  );
}
