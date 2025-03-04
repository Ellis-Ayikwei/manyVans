'use client';

const FAQ = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
            <div className="space-y-4">
                <div>
                    <h2 className="font-semibold">1. What is your return policy?</h2>
                    <p>We offer a 30-day return policy on all products. If you are not satisfied, you can return the product within 30 days of purchase.</p>
                </div>
                <div>
                    <h2 className="font-semibold">2. How long does shipping take?</h2>
                    <p>Shipping typically takes 3-5 business days, depending on your location.</p>
                </div>
                <div>
                    <h2 className="font-semibold">3. Do you offer international shipping?</h2>
                    <p>Yes, we offer international shipping to select countries. Please check our shipping policy for more details.</p>
                </div>
                {/* Add more FAQs as needed */}
            </div>
        </div>
    );
};

export default FAQ;
