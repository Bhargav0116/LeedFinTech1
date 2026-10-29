import React from "react";
import {
  Building2,
  HandCoins,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Scale,
  CheckCircle2,
} from "lucide-react";

export default function FinservePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            Trusted by Leading Financial Institutions
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Restoring balance to <br className="hidden md:block" /> your
            financial ecosystem.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
            We collaborate seamlessly with banks to recover outstanding funds,
            secure collateralized items, and provide comprehensive backend
            financial services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm">
              Explore Our Services <ArrowRight size={20} />
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section
        id="solutions"
        className="bg-slate-50 border-y border-slate-100 py-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Core Financial Solutions
            </h2>
            <p className="text-slate-500 text-lg">
              Specialized institutional services designed for maximum recovery
              rates and seamless bank integration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100">
                <Building2 className="text-slate-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Bank Collaborations</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                Direct integration with banking infrastructure to streamline
                distressed portfolio management and offload compliance burdens.
              </p>
              <a
                href="#"
                className="text-slate-900 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight size={16} />
              </a>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100">
                <HandCoins className="text-slate-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fund & Item Recovery</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                Ethical, legally-compliant asset retrieval. We specialize in
                both liquid capital recovery and physical collateral
                repossession.
              </p>
              <a
                href="#"
                className="text-slate-900 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight size={16} />
              </a>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100">
                <Briefcase className="text-slate-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Auxiliary Fin-Services</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                From skip tracing to legal liaison and credit restructuring, we
                provide end-to-end support for non-performing assets.
              </p>
              <a
                href="#"
                className="text-slate-900 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Trust Metrics */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Precision. Compliance. <br /> Resolution.
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Operating at the intersection of finance and legal compliance,
              Finserve acts as an extension of your bank&apos;s internal
              operations. We protect your brand reputation while maximizing
              recovery outcomes.
            </p>
            <ul className="space-y-4">
              {[
                "Strict adherence to national financial regulations",
                "Advanced tracking and skip-tracing technology",
                "Transparent, real-time reporting dashboards",
                "Ethical and respectful debtor engagement",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <CheckCircle2 className="text-slate-900" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <ShieldCheck size={32} className="text-slate-400 mb-4" />
              <div className="text-4xl font-black text-slate-900 mb-1">
                99.9%
              </div>
              <div className="text-sm font-medium text-slate-500">
                Compliance Rate
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center mt-8">
              <Scale size={32} className="text-slate-400 mb-4" />
              <div className="text-4xl font-black text-slate-900 mb-1">
                $2B+
              </div>
              <div className="text-sm font-medium text-slate-500">
                Assets Recovered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to optimize your recovery process?
          </h2>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Join the network of top-tier financial institutions that trust
            Finserve with their most sensitive portfolios.
          </p>
          <button className="bg-slate-900 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all shadow-sm">
            Contact Our Institutional Team
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Finserve.</span>
          </div>
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Finserve Financial Services. All
            rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
