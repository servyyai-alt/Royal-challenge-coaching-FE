export default function PrivacyPolicyPage() {
  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--contact py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-royal-200">How we collect, use, and protect your information.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-8 prose prose-slate max-w-none">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>Contact details (name, phone, email) submitted via student registration/contact forms.</li>
              <li>Message content you voluntarily share with us.</li>
              <li>Basic technical data (IP address, browser/device info) from server logs.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to enquiries and provide course/program information.</li>
              <li>To contact you about admissions, schedules, and updates you request.</li>
              <li>To maintain and improve our services and website security.</li>
            </ul>

            <h2>Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share information only with trusted service providers
              (e.g., email/hosting) as necessary to operate the website, or when required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We use reasonable administrative and technical safeguards to protect information. No method of
              transmission or storage is 100% secure, but we take security seriously.
            </p>

            <h2>Your Choices</h2>
            <ul>
              <li>You can request access, correction, or deletion of your submitted information.</li>
              <li>You can opt out of non-essential communications at any time.</li>
            </ul>

            <h2>Contact</h2>
            <p>
              For privacy questions, contact us via the <a href="/contact">Contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
