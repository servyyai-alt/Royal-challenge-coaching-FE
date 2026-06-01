export default function RefundPolicyPage() {
  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--enquiry py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Refund & Cancellation Policy</h1>
          <p className="text-royal-200">Information about cancellations and refunds (if applicable).</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-8 prose prose-slate max-w-none">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>General</h2>
            <p>
              Refunds and cancellations depend on the course/program, batch, and the stage of enrolment. Please
              contact our office for exact details.
            </p>

            <h2>How to Request</h2>
            <ul>
              <li>Share student name, course/program, and payment details.</li>
              <li>Explain the reason for cancellation/refund request.</li>
              <li>Our team will verify and respond with next steps.</li>
            </ul>

            <h2>Processing Time</h2>
            <p>
              If approved, refunds (if any) are typically processed within 7–14 business days depending on the
              payment method.
            </p>

            <h2>Contact</h2>
            <p>
              Please use the <a href="/contact">Contact page</a> or call us for assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

