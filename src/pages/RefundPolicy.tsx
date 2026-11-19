import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const RefundPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Refund Policy" description="Focusi's 30-day return policy. Learn about returns, exchanges, and refunds for your wobble stool purchase." path="/refund-policy" />
    <Navbar />
    <main className="flex-grow container max-w-3xl mx-auto pt-28 pb-16 px-4 animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
      <div className="prose prose-neutral max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
        <p>We have a <strong>30-day return policy</strong>, which means you have 30 days after receiving your item to request a return.</p>
        <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>
        <p>To start a return, you can contact us at <a href="mailto:support@focusi.co">support@focusi.co</a>.</p>

        <h2>Damages and Issues</h2>
        <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

        <h2>Exceptions / Non-returnable Items</h2>
        <p>Certain types of items cannot be returned, like custom products (such as special orders or personalised items). Please get in touch if you have questions or concerns about your specific item.</p>
        <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>

        <h2>Exchanges</h2>
        <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

        <h2>European Union 14-Day Cooling Off Period</h2>
        <p>Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>

        <h2>Refunds</h2>
        <p>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
        <p>If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:support@focusi.co">support@focusi.co</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default RefundPolicy;
