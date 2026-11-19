import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsOfService = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Terms of Service" description="Read Focusi's terms and conditions for using our website and purchasing our products." path="/terms-of-service" />
    <Navbar />
    <main className="flex-grow container max-w-3xl mx-auto pt-28 pb-16 px-4 animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
      <div className="prose prose-neutral max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
        <h2>Overview</h2>
        <p>This website is operated by Focusi. Throughout the site, the terms "we", "us", and "our" refer to Focusi. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.</p>
        <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions. Please read these Terms of Service carefully before accessing or using our website.</p>

        <h2>Online Store Terms</h2>
        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.</p>
        <p>You may not use our products for any illegal or unauthorised purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>

        <h2>General Conditions</h2>
        <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks.</p>

        <h2>Accuracy of Information</h2>
        <p>We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.</p>

        <h2>Modifications to the Service and Prices</h2>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>

        <h2>Products or Services</h2>
        <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return only according to our Refund Policy.</p>
        <p>We have made every effort to display as accurately as possible the colours and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any colour will be accurate.</p>

        <h2>Prohibited Uses</h2>
        <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others.</p>

        <h2>Disclaimer of Warranties; Limitation of Liability</h2>
        <p>We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</p>

        <h2>Governing Law</h2>
        <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction in which Focusi operates.</p>

        <h2>Contact Information</h2>
        <p>Questions about the Terms of Service should be sent to us at <a href="mailto:support@focusi.co">support@focusi.co</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
