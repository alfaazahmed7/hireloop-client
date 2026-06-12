"use client";

import React, { useState } from "react";
import { FaCheck, FaChevronDown, FaChevronUp, FaBriefcase, FaBuilding } from "react-icons/fa6";

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState("seekers");
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Data parsed from requirements
    const seekerPlans = [
        {
            name: "Free",
            id: 'seeker_free',
            price: "$0",
            period: "forever",
            desc: "Perfect for getting started and exploring available positions.",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic profile visibility",
                "Email job alerts",
            ],
            popular: false,
            buttonText: "Get Started",
        },
        {
            name: "Pro",
            id: 'seeker_pro',
            price: "$19",
            period: "month",
            desc: "Accelerate your search with tracking tools and insights.",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved jobs",
                "Advanced application tracking",
                "Salary insights data",
            ],
            popular: true,
            buttonText: "Upgrade to Pro",
        },
        {
            name: "Premium",
            id: 'seeker_premium',
            price: "$39",
            period: "month",
            desc: "Maximum visibility and direct advantages over other applicants.",
            features: [
                "Everything in Pro included",
                "Unlimited job applications",
                "Profile boost to top recruiters",
                "Early access to newly posted jobs",
                "Priority customer support",
            ],
            popular: false,
            buttonText: "Go Premium",
        },
    ];

    const recruiterPlans = [
        {
            name: "Free",
            id: 'recruiter_free',
            price: "$0",
            period: "forever",
            desc: "Great for a company's first year of organic hiring.",
            features: [
                "Up to 3 active job posts",
                "Basic applicant management",
                "Standard listing visibility",
            ],
            popular: false,
            buttonText: "Start Free",
        },
        {
            name: "Growth",
            id: 'recruiter_growth',
            price: "$49",
            period: "month",
            desc: "Designed for scaling teams looking for efficient tracking.",
            features: [
                "Up to 10 active job posts",
                "Full applicant tracking system (ATS)",
                "Basic recruitment analytics",
                "Dedicated email support",
            ],
            popular: true,
            buttonText: "Choose Growth",
        },
        {
            name: "Enterprise",
            id: 'recruiter_enterprise',
            price: "$149",
            period: "month",
            desc: "Robust pipelines for high-volume hiring demands.",
            features: [
                "Up to 50 active job posts",
                "Advanced analytics dashboard",
                "Featured job listings boost",
                "Team collaboration accounts",
                "Custom company branding",
                "Priority 24/7 support",
            ],
            popular: false,
            buttonText: "Contact Enterprise",
        },
    ];

    const faqs = [
        {
            question: "How does the plan cancellation work?",
            answer: "You can cancel your subscription at any time directly from your account settings page. Once canceled, you will retain access to your premium features until the end of your current billing cycle.",
        },
        {
            question: "Can I get a refund if I change my mind?",
            answer: "We offer a 14-day money-back guarantee for all paid monthly plans if you haven't exhausted your application or posting limits. Reach out to our support team to initiate a request.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also offer secure checkout payments via PayPal and Apple Pay.",
        },
        {
            question: "Can I switch between plans later?",
            answer: "Absolutely. You can upgrade or downgrade your plan instantly. When upgrading, your remaining balance is prorated automatically toward the new billing tier.",
        },
    ];

    const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500 selection:text-slate-950">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-14">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                    Fair, Transparent <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Pricing</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                    Choose the blueprint that aligns with your goals. No hidden fees, cancel seamlessly at any time.
                </p>

                {/* Tab Toggle Control */}
                <div className="flex justify-center mt-10">
                    <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
                        <button
                            onClick={() => setActiveTab("seekers")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "seekers"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-semibold"
                                : "text-slate-400 hover:text-slate-200"
                                }`}
                        >
                            <FaBriefcase className="text-base" />
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab("recruiters")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "recruiters"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-semibold"
                                : "text-slate-400 hover:text-slate-200"
                                }`}
                        >
                            <FaBuilding className="text-base" />
                            For Recruiters
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
                {currentPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 border bg-slate-900/60 backdrop-blur-sm ${plan.popular
                            ? "border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] md:-translate-y-2 scale-105"
                            : "border-slate-800 hover:border-slate-700 shadow-xl"
                            }`}
                    >
                        {/* Spotlight Banner for Popular Plan */}
                        {plan.popular && (
                            <span className="absolute -top-3 right-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md">
                                Most Popular
                            </span>
                        )}

                        <div>
                            {/* Header Details */}
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{plan.desc}</p>

                            {/* Price display */}
                            <div className="flex items-baseline gap-1 text-white mb-8 border-b border-slate-800/80 pb-6">
                                <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                                <span className="text-sm text-slate-400">/{plan.period}</span>
                            </div>

                            {/* Feature List */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-snug">
                                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <FaCheck className="text-xs" />
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Button */}
                        <form action="/api/checkout_sessions" method="POST" className="w-full">
                            {/* Hidden input to tell your backend which plan was selected */}
                            <input type="hidden" name="plan_id" value={plan.id} />
                            <input type="hidden" name="userType" value={activeTab} /> {/* "seekers" or "recruiters" */}

                            <button
                                type="submit"
                                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer text-center block ${plan.popular
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 shadow-lg shadow-emerald-500/10 font-bold"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/50"
                                    }`}
                            >
                                {plan.buttonText}
                            </button>
                        </form>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto border-t border-slate-900 pt-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
                    <p className="text-sm text-slate-400">Everything you need to know about our subscription mechanisms.</p>
                </div>

                {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                        <div
                            key={index}
                            className="rounded-2xl border border-slate-800/80 bg-slate-900/30 overflow-hidden transition-colors duration-200 mb-4"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-200 hover:text-white transition-colors duration-150"
                            >
                                <span className="text-base pr-4">{faq.question}</span>
                                {isOpen ? (
                                    <FaChevronUp className="text-sm text-emerald-400 flex-shrink-0" />
                                ) : (
                                    <FaChevronDown className="text-sm text-slate-500 flex-shrink-0" />
                                )}
                            </button>

                            {/* Fix: Using a transition grid layout instead of dynamic max-height prevents layout shifts and eliminates random empty artifacts.*/}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden bg-slate-950/40">
                                    <p className="p-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/50">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}