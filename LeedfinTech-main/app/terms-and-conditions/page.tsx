import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using the LeedfinTech website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="legal-page">
      <article className="inner-container legal-content">
        <p className="legal-eyebrow">Legal</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: October 5, 2026</p>
        <p className="legal-intro">
          These terms describe the basic rules for using the LeedfinTech
          website. By accessing the site, you agree to use it lawfully and in
          accordance with these terms.
        </p>

        <section>
          <h2>1. About this website</h2>
          <p>
            This website provides general information about LeedfinTech,
            including its technology services and learning initiatives. Website
            content is for general information and does not constitute a
            service offer, professional advice, or a guarantee that a
            particular service or learning opportunity is available.
          </p>
        </section>

        <section>
          <h2>2. Acceptable use</h2>
          <p>You agree not to misuse the site. In particular, do not:</p>
          <ul>
            <li>Use the site in violation of applicable laws or regulations.</li>
            <li>Attempt to disrupt, damage, or gain unauthorized access to the site or its systems.</li>
            <li>Copy, republish, or exploit site content except as permitted by law or with permission.</li>
            <li>Submit content that is unlawful, deceptive, or infringes another person&apos;s rights.</li>
          </ul>
        </section>

        <section>
          <h2>3. Intellectual property</h2>
          <p>
            Unless otherwise indicated, the text, branding, design, and other
            materials on this website belong to LeedfinTech or are used with
            permission. You may view and print pages for personal,
            non-commercial reference. All other rights are reserved.
          </p>
        </section>

        <section>
          <h2>4. Enquiries and services</h2>
          <p>
            Sending an enquiry through this website does not create a client,
            employment, or training relationship. The enquiry form currently
            prepares and copies your message in your browser; it does not
            automatically send it to LeedfinTech. Any actual services or
            programs will be subject to separate terms agreed with you.
          </p>
        </section>

        <section>
          <h2>5. Third-party services and links</h2>
          <p>
            The site may display content or links provided by third parties.
            LeedfinTech does not control third-party services and is not
            responsible for their content, availability, or practices. Your use
            of a third-party service is governed by that provider&apos;s terms
            and policies.
          </p>
        </section>

        <section>
          <h2>6. Availability and disclaimers</h2>
          <p>
            We aim to keep the website useful and available, but do not
            guarantee uninterrupted access, error-free operation, or that all
            information is complete and current. To the extent permitted by
            applicable law, the site is provided on an &quot;as is&quot; and
            &quot;as available&quot; basis.
          </p>
        </section>

        <section>
          <h2>7. Limitation of liability</h2>
          <p>
            To the extent permitted by applicable law, LeedfinTech will not be
            liable for indirect, incidental, special, or consequential loss
            arising from your use of, or inability to use, this website. Nothing
            in these terms excludes liability that cannot legally be excluded.
          </p>
        </section>

        <section>
          <h2>8. Changes to these terms</h2>
          <p>
            We may update these terms as the website or our practices change.
            The revised version will be posted on this page with an updated
            date. Your continued use of the site after a change means you
            acknowledge the revised terms.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For questions about these terms, please use our{" "}
            <Link className="legal-contact-link" href="/contact">
              contact page
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
