
export enum PricingTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ELITE = 'ELITE'
}

export interface PricingPackage {
  id: PricingTier;
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
}

export interface LeadData {
  name?: string;
  estimatedScore?: number;
  negativeItems?: string[];
  monthlyIncome?: string;
  qualified: boolean;
}
