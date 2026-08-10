const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Your Privacy Matters",
    body: (
      <p>
        At Artiq, we believe in transparency about how we collect, use, and protect
        your personal information. This policy explains our practices in clear,
        straightforward language.
      </p>
    ),
  },
  {
    title: "Information We Collect",
    body: (
      <>
        <p>
          <strong className="text-ivory">Account Information:</strong> When you
          create an account, we collect your email address, display name, and
          optional profile details like your bio and location.
        </p>
        <p>
          <strong className="text-ivory">Transaction Data:</strong> When you buy
          or sell artwork, we collect payment information, shipping addresses, and
          transaction history to process orders.
        </p>
        <p>
          <strong className="text-ivory">Usage Information:</strong> We collect
          data about how you use Artiq, including artworks viewed, searches made,
          and features used to improve your experience.
        </p>
        <p>
          <strong className="text-ivory">Device Information:</strong> We collect
          device type, operating system, and app version to optimize performance
          and troubleshoot issues.
        </p>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        <p>We use your information to:</p>
        <ul className="ml-2 list-inside list-disc space-y-2">
          <li>Provide and improve our services</li>
          <li>Process transactions and send related communications</li>
          <li>Personalize your discovery experience</li>
          <li>Send important updates about your account</li>
          <li>Protect against fraud and abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: "Information Sharing",
    body: (
      <>
        <p>
          We do not sell your personal information. We share information only in
          these circumstances:
        </p>
        <p>
          <strong className="text-ivory">With Artists/Buyers:</strong> When you
          make a purchase, we share necessary information with the artist to
          fulfill your order.
        </p>
        <p>
          <strong className="text-ivory">Service Providers:</strong> We work with
          trusted partners for payment processing, hosting, and analytics who are
          bound by confidentiality agreements.
        </p>
        <p>
          <strong className="text-ivory">Legal Requirements:</strong> We may
          disclose information when required by law or to protect rights and
          safety.
        </p>
      </>
    ),
  },
  {
    title: "Data Security",
    body: (
      <p>
        We use industry-standard security measures to protect your information,
        including encryption, secure servers, and regular security audits.
        However, no method of transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="ml-2 list-inside list-disc space-y-2">
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and associated data</li>
          <li>Export your data in a portable format</li>
          <li>Opt out of marketing communications</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cookies and Tracking",
    body: (
      <p>
        We use cookies and similar technologies to remember your preferences, keep
        you logged in, and understand how you use our app. You can control cookie
        settings through your device settings.
      </p>
    ),
  },
  {
    title: "Data Retention",
    body: (
      <p>
        We retain your information for as long as your account is active or as
        needed to provide services. After account deletion, we may retain certain
        information for legal compliance and fraud prevention for up to 7 years.
      </p>
    ),
  },
  {
    title: "International Users",
    body: (
      <p>
        Artiq operates globally. By using our services, you consent to the
        transfer of your information to the United States and other countries
        where we operate, which may have different data protection laws.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    body: (
      <p>
        Artiq is not intended for users under 18. We do not knowingly collect
        information from children. If we learn we have collected such information,
        we will delete it promptly.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this policy periodically. We will notify you of significant
        changes via email or in-app notification. Continued use after changes
        indicates acceptance.
      </p>
    ),
  },
  {
    title: "Contact Us",
    body: (
      <p>
        Questions about privacy? Contact us at{" "}
        <a
          href="mailto:artiqcali@gmail.com"
          className="text-gold underline underline-offset-2"
        >
          artiqcali@gmail.com
        </a>
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-wide text-ivory md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ivory/45">Last updated: December 2024</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-medium text-gold">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ivory/70">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
