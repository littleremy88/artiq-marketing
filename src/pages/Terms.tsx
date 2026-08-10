import { PLATFORM_FEE_PERCENT } from "@/lib/fees";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Welcome to Artiq",
    body: (
      <p>
        Artiq is a platform that connects artists with art enthusiasts, enabling
        the discovery, sharing, and purchase of original artwork. By using Artiq,
        you agree to these terms which govern your use of our services.
      </p>
    ),
  },
  {
    title: "Using Artiq",
    body: (
      <>
        <p>
          You must be at least 18 years old to create an account and make
          purchases. You are responsible for maintaining the security of your
          account and for all activities that occur under your account.
        </p>
        <p>
          We expect all users to engage respectfully with the community.
          Harassment, fraud, or any form of abuse will result in account
          suspension or termination.
        </p>
      </>
    ),
  },
  {
    title: "Content Guidelines",
    body: (
      <>
        <p>
          Artists retain ownership of their work. By uploading content, you grant
          Artiq a license to display, promote, and facilitate the sale of your
          artwork on our platform.
        </p>
        <p>
          You may not upload content that infringes on intellectual property
          rights, contains explicit material without proper labeling, or violates
          any applicable laws.
        </p>
      </>
    ),
  },
  {
    title: "Purchases and Transactions",
    body: (
      <>
        <p>
          All purchases are final once confirmed. Artiq facilitates transactions
          between buyers and sellers but is not responsible for the physical
          condition of artwork upon delivery.
        </p>
        <p>
          Buyers agree to pay the listed price plus any applicable taxes and
          shipping fees. Artists agree to ship items within the stated timeframe
          and provide accurate tracking information.
        </p>
      </>
    ),
  },
  {
    title: "Fees and Payments",
    body: (
      <p>
        Artiq charges a {PLATFORM_FEE_PERCENT}% commission on completed sales.
        This fee covers platform maintenance, payment processing, and customer
        support. Artists receive their earnings within 3–5 business days after a
        sale is confirmed.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    body: (
      <p>
        Artists maintain full copyright ownership of their work. Artiq does not
        claim ownership over any artwork uploaded to the platform. Buyers receive
        ownership of the physical artwork but not the reproduction rights unless
        explicitly stated.
      </p>
    ),
  },
  {
    title: "Dispute Resolution",
    body: (
      <p>
        We encourage users to resolve disputes directly. If needed, Artiq will
        mediate disputes in good faith. Our decisions in dispute resolution are
        final and binding.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    body: (
      <p>
        Artiq is provided &quot;as is&quot; without warranties of any kind. We
        are not liable for any indirect, incidental, or consequential damages
        arising from your use of the platform.
      </p>
    ),
  },
  {
    title: "Changes to Terms",
    body: (
      <p>
        We may update these terms from time to time. Continued use of Artiq after
        changes constitutes acceptance of the new terms. We will notify users of
        significant changes via email or in-app notification.
      </p>
    ),
  },
  {
    title: "Contact Us",
    body: (
      <p>
        Questions about these terms? Contact us at{" "}
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

export default function Terms() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-wide text-ivory md:text-5xl">
          Terms of Service
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
