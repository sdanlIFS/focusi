import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Privacy Policy" description="How Focusi collects, uses, and protects your personal information when you visit or shop on our site." path="/privacy-policy" />
    <Navbar />
    <main className="flex-grow container max-w-3xl mx-auto pt-28 pb-16 px-4 animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="prose prose-neutral max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
        <p>This Privacy Policy describes how Focusi (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from our site.</p>

        <h2>Information We Collect</h2>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
        <p>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
        <p>When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
        <p>Additionally, we use this information to communicate with you, screen our orders for potential risk or fraud, and provide you with information or advertising relating to our products or services when in line with your preferences.</p>

        <h2>Cookies</h2>
        <p>We use cookies to help us understand how visitors use our website, remember preferences, and improve your browsing experience. You can control cookies through your browser settings.</p>

        <h2>Third-Party Services</h2>
        <p>We may share your personal information with third parties to help us use your personal information as described above. For example, we use Shopify to power our online store and payment processors to handle transactions.</p>
        <p>We may also share your personal information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</p>

        <h2>Data Security</h2>
        <p>We take reasonable precautions and follow industry best practices to make sure your personal information is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.</p>

        <h2>Changes</h2>
        <p>We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.</p>

        <h2>Contact Us</h2>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at <a href="mailto:support@focusi.co">support@focusi.co</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
