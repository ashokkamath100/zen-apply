// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-red-500 to-red-700 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-lg font-bold">Job Application Automator</div>
        </div>
      </header>
      <main className="flex-grow">
        <section id="hero" className="flex items-center justify-center text-center py-20">
          <div className="container mx-auto px-4">
            <Image src="/images/logo.svg" alt="Logo" width={150} height={150} className="mx-auto my-8" />
            <h1 className="text-5xl font-bold mb-4">Automate Your Job Applications</h1>
            <p className="text-xl mb-8">Save time and get more interviews with our job application automation tool.</p>
            <Link href="/signup">
              <div className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg">Get Started</div>
            </Link>
          </div>
        </section>
        <section id="features" className="py-20 bg-gradient-to-b from-red-600 to-red-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Features</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Automated Applications</h3>
                  <p>Our tool automatically fills out and submits job applications for you.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Job Tracking</h3>
                  <p>Keep track of your applications and their statuses in one place.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Customizable Templates</h3>
                  <p>Create and use templates to tailor your applications to each job.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Pricing</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Free</h3>
                  <p>Get started with our free plan and automate up to 10 applications per month.</p>
                  <p className="mt-4"><strong>$0/month</strong></p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Pro</h3>
                  <p>Automate up to 100 applications per month with advanced tracking and templates.</p>
                  <p className="mt-4"><strong>$29/month</strong></p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-red-900">
                  <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                  <p>Unlimited applications and dedicated support for large organizations.</p>
                  <p className="mt-4"><strong>$99/month</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="py-20 bg-gradient-to-t from-red-600 to-red-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@jobautomator.com" className="text-white underline">support@jobautomator.com</a>.</p>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-red-500 to-red-700 py-4">
        <div className="container mx-auto text-center">
          &copy; 2023 Job Application Automator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
