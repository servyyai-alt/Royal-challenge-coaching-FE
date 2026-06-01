export default function TermsPage() {
  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--courses py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-royal-200">Rules and guidelines for using our website and services.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-8 prose prose-slate max-w-none">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>Use of Website</h2>
            <ul>
              <li>Use this site for lawful purposes only.</li>
              <li>Do not attempt to disrupt, damage, or gain unauthorized access to our systems.</li>
              <li>Content is provided for general information and may change without notice.</li>
            </ul>

            <h2>Admissions, Fees, and Schedules</h2>
            <p>
              Course availability, fees, timings, and batches are subject to change. Final confirmation is provided
              by our team during admission/enrolment.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              Website content, branding, and media belong to Royal Coaching Centre or its licensors. Do not copy or
              reuse content without permission.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              This site may contain links to third-party websites (e.g., social media). We are not responsible for
              their content or practices.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              We strive for accuracy, but we do not guarantee completeness or error-free operation. Use of the site
              is at your own risk.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us via the <a href="/contact">Contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

