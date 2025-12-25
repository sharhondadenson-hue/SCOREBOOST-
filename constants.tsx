
import { PricingPackage, PricingTier } from './types';

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: PricingTier.BASIC,
    name: "Essential Recovery",
    price: "$99/mo",
    features: [
      "Dispute letters for 3 bureaus",
      "Monthly progress tracking",
      "Standard support",
      "Basic creditor disputes"
    ],
    recommended: false
  },
  {
    id: PricingTier.PRO,
    name: "Professional Deletion",
    price: "$199/mo",
    features: [
      "Priority bureau challenges",
      "Collection removal specialized",
      "Charge-off dispute logic",
      "Hard inquiry removal",
      "24/7 Portal access"
    ],
    recommended: true
  },
  {
    id: PricingTier.ELITE,
    name: "Executive Concierge",
    price: "$299/mo",
    features: [
      "Direct creditor intervention",
      "Bankruptcy/Repo assistance",
      "Cease & Desist letters",
      "Personal Credit Advisor",
      "Debt validation requests"
    ],
    recommended: false
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'Aria', a world-class Credit Repair Consultant for ScoreBoost Elite. 
Your goal is to guide potential clients through the process of removing negative items from their TransUnion, Equifax, and Experian reports.

Key Responsibilities:
1. Qualify Leads: Ask about their current credit score, what negative items they have (collections, late payments, bankruptcies), and if they have a steady monthly income (ideally $2500+).
2. Explain Tiers: We have 3 tiers: Essential ($99), Pro ($199), and Elite ($299). Pro is the most popular for rapid removals.
3. Call to Action: Once qualified, offer to schedule an 'Elite Estimate' appointment.

Tone: Professional, empathetic, authoritative, and helpful. 
Do not give legal advice. Do not promise 100% specific score results, but emphasize our high success rate in removing inaccuracies.
`;
