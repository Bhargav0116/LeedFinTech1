import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the LeedfinTech website handles information and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <article className="inner-container legal-content">
        <p className="legal-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: October 5, 2026</p>
        <p className="legal-intro">
          This policy explains how information may be handled when you visit
          the LeedfinTech website. It describes the current website
          functionality and should be reviewed whenever that functionality
          changes.
        </p>

        <section>
          <h2>1. Information you enter</h2>
          <p>
            The contact form asks for your name, email address, area of
            interest, and message. At present, submitting the form prepares
            this information in your browser and attempts to copy it to your
            clipboard. It does not automatically transmit the information to
            LeedfinTech or save it in a website account. You decide whether to
            paste and send it using your own email or messaging service.
          </p>
        </section>

        <section>
          <h2>2. Information processed when you visit</h2>
          <p>
            Like most websites, the hosting and delivery services used to
            operate this site may process technical information needed to
            deliver pages, maintain security, and diagnose errors. Depending
            on the provider, this may include an IP address, browser and device
            details, requested page, and request time. Please consult the
            applicable hosting provider&apos;s privacy information for details
            about its processing and retention.
          </p>
        </section>

        <section>
          <h2>3. Cookies and similar technologies</h2>
          <p>
            The current site does not intentionally use advertising or
            analytics cookies. Hosting, security, or platform services may use
            technologies necessary to deliver or protect the website. If
            optional analytics, account, or marketing features are introduced,
            this policy will be updated and any required choices will be
            provided.
          </p>
        </section>

        <section>
          <h2>4. How information is used</h2>
          <p>
            Information you choose to send to us may be used to respond to your
            enquiry and continue the conversation you requested. Technical
            information may be used by service providers to operate, secure,
            and troubleshoot the website.
          </p>
        </section>

        <section>
          <h2>5. Sharing and retention</h2>
          <p>
            The contact form does not itself send your message to us. If you
            choose to send an enquiry through another service, that service
            will handle the information under its own terms and privacy
            practices. Technical information may be processed by website
            hosting or security providers as needed to deliver the site.
            Retention periods depend on the relevant provider and any
            communication you initiate.
          </p>
        </section>

        <section>
          <h2>6. Your choices and rights</h2>
          <p>
            You can choose not to provide personal information in the contact
            form and can clear or decline clipboard access in your browser.
            Depending on where you live, you may have rights to access,
            correct, delete, or otherwise control personal information held
            about you. Such requests depend on whether LeedfinTech has received
            or holds the information and on applicable law.
          </p>
        </section>

        <section>
          <h2>7. Children&apos;s privacy</h2>
          <p>
            This website is intended for a general audience and is not
            specifically directed to children. Please do not submit
            information about a child unless you have the authority to do so
            and it is necessary for your enquiry.
          </p>
        </section>

        <section>
          <h2>8. Changes to this policy</h2>
          <p>
            We may revise this policy as the website and its services evolve.
            Updates will be posted here with a revised date. Please review this
            page periodically.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For privacy questions or requests, please use our{" "}
            <Link className="legal-contact-link" href="/contact">
              contact page
            </Link>
            . Please do not include sensitive information in a general enquiry.
          </p>
        </section>
      </article>
    </main>
  );
}
