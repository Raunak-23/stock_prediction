import { BrainCircuit } from "lucide-react";
import { Newspaper } from "lucide-react";
import { CandlestickChart } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { BellRing  } from "lucide-react";
import { SwatchBook  } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";

export const navItems = [
    { label: "Features", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "Pricing", href: "#" },
];

export const features = [
    {
        icon: <BrainCircuit />,
        text: "Al-Powered Predictions",
        description:
        "Get accurate stock price forecasts using Al algorithms trained on historical data and real-time market trends.",
    },
    {
        icon: <Newspaper />,
        text: "News Sentiment Analysis",
        description:
        "Understand how global & financial news impacts stocks with real-time sentiment tracking and predictive analytics.",
    },
    {
        icon: <CandlestickChart />,
        text: "Risk Assessmention",
        description:
        "Reduce risk and optimize your investments with Al-driven portfolio recommendations and real-time risk alerts.",
    },
    {
        icon: <TrendingUp />,
        text: "Market Trends",
        description:
        "Get in-depth analysis of market trends using technical indicators, fundamental analysis and social media sentiment.",
    },
    {
        icon: <BellRing />,
        text: "Real-Time Alerts",
        description:
        "Receive instant alerts on significant stock movements, sentiment shifts and critical news updates.",
    },
    {
        icon: <SwatchBook />,
        text: "Customizable Watchlist",
        description:
        "Create a personalized watchlist and get Al-driven stock predictions for your selected. stocks based on custom preferences.",
    },
]; 

export const testimonials = [
    {
        user: "Rahul S",
        Participant: "Investor",
        image: user1,
        text: "This platform gave me an edge in the market! The sentiment analysis helped me predict trends before they happened.",
    },
    {
        user: "Ananya M",
        Participant: "Trader",
        image: user2,
        text: "AI-powered predictions are game-changer. It helped me adjust my portfolio strategy for better returns.",
    },
    {
        user: "Vikram P",
        Participant: "Finance Enthusiast",
        image: user3,
        text: "I love the real-time alerts! They've helped me make faster smarter investment decisions.",
    },
];

export const pricingOptions = [
    {
        title: "Free Plan",
        price: "($0/month)",
        features: [
        "Limited stock insights",
        "5 AI Predictions per month",
        "Basic sentiment analysis",
        ],
    },
    {
        title: "Pro Plan",
        price: "($500/month)",
        features: [
        "Unlimited AI preditions",
        "Real-time alerts",
        "Advanced sentiment analysis",
        "Portfolio optimization",
        ],
    },
    {
        title: "Enterprise Plan",
        price: "(Custom Pricing)",
        features: [
        "Dedicated Support",
        "Premium features",
        "API access",
        "Deep market analysis",
        ],
    },
];

export const productLinks = [
    { href: "#", text: "Features" },
    { href: "#", text: "Integrations" },
    { href: "#", text: "Pricing" },
    { href: "#", text: "Changelog" },
];

export const companyLinks = [
    { href: "#", text: "About" },
    { href: "#", text: "Blog" },
    { href: "#", text: "Careers" },
    { href: "#", text: "Contact" },
];

export const resourcesLinks = [
    { href: "#", text: "Documentation" },
    { href: "#", text: "Guide" },
    { href: "#", text: "Support" },
    { href: "#", text: "API" },
];

export const legalLinks = [
    { href: "#", text: "Privacy" },
    { href: "#", text: "Terms" },
    { href: "#", text: "Security" },
];