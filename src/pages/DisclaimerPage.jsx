export default function DisclaimerPage() {
  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--contact h-[300px] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3 mt-10">Disclaimer</h1>
          <p className="text-royal-200">Important information about website content and accuracy.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-8 prose prose-slate max-w-none">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>General Information</h2>
            <p>
              The information on this website is provided for general guidance. While we try to keep content up to
              date and accurate, we do not make warranties about completeness, reliability, or suitability.
            </p>

            <h2>Academic Outcomes</h2>
            <p>
              Student results may vary based on individual effort, attendance, and other factors. Past performance
              does not guarantee future results.
            </p>

            <h2>External Links</h2>
            <p>
              Links to external websites are provided for convenience. We do not control and are not responsible for
              their content or policies.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions, please reach us via the <a href="/contact">Contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

