import type { Grant } from '@/types'

export const GRANTS: Grant[] = [
  // ─── General Small Business Programs ───────────────────────────────────────
  {
    id: 'csbfp',
    name: 'Canada Small Business Financing Program',
    provider: 'Government of Canada',
    amount: { min: 1000, max: 1000000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      maxRevenue: 10000000,
    },
    url: 'https://ised-isde.canada.ca/site/canada-small-business-financing-program/en',
    description: 'Government-backed loans for small businesses to finance the purchase or improvement of land, buildings, equipment, and leasehold improvements.',
    tags: ['general'],
  },
  {
    id: 'cdap',
    name: 'Canada Digital Adoption Program',
    provider: 'Innovation, Science and Economic Development Canada',
    amount: { min: 2400, max: 15000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      maxEmployees: 499,
    },
    url: 'https://ised-isde.canada.ca/site/canada-digital-adoption-program/en',
    description: 'Micro-grants to help small businesses adopt digital technologies, including e-commerce, digital marketing, and business management software.',
    tags: ['general', 'tech_startup'],
  },

  // ─── Women Entrepreneurs ───────────────────────────────────────────────────
  {
    id: 'wes',
    name: 'Women Entrepreneurship Strategy',
    provider: 'Government of Canada',
    amount: { min: 5000, max: 100000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresWomanOwned: true,
    },
    url: 'https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en',
    description: 'Federal strategy providing access to financing, mentorship, and resources for women entrepreneurs. Multiple funding streams available.',
    tags: ['women_owned'],
    deadline: '2026-06-30',
  },
  {
    id: 'wekh',
    name: 'Women Entrepreneurship Knowledge Hub',
    provider: 'Ryerson University / Government of Canada',
    amount: { min: 0, max: 50000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresWomanOwned: true,
    },
    url: 'https://wekh.ca/',
    description: 'Research, resources, and funding opportunities specifically designed for women entrepreneurs across Canada.',
    tags: ['women_owned'],
  },
  {
    id: 'she-recovers',
    name: 'SheEO Activator Program',
    provider: 'SheEO',
    amount: { min: 50000, max: 100000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresWomanOwned: true,
    },
    url: 'https://sheeo.world/',
    description: 'Interest-free loans for women-led ventures working on the UN Sustainable Development Goals. Community-funded perpetual capital model.',
    tags: ['women_owned', 'sustainability'],
    deadline: '2026-12-31',
  },

  // ─── Youth Entrepreneurs ───────────────────────────────────────────────────
  {
    id: 'futurpreneur',
    name: 'Futurpreneur Canada',
    provider: 'Futurpreneur Canada',
    amount: { min: 12000, max: 60000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresYouth: true,
    },
    url: 'https://www.futurpreneur.ca/',
    description: 'Financing, mentoring, and support for aspiring business owners aged 18-39. Includes startup loans and expert mentorship for up to 2 years.',
    tags: ['youth'],
  },
  {
    id: 'cybi',
    name: 'Canadian Youth Business Foundation',
    provider: 'Canadian Youth Business Foundation',
    amount: { min: 5000, max: 45000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresYouth: true,
    },
    url: 'https://www.cybf.ca/',
    description: 'Start-up financing, mentorship and resources for young entrepreneurs (18-39) who are starting or growing a business.',
    tags: ['youth'],
  },

  // ─── Indigenous Business Programs ──────────────────────────────────────────
  {
    id: 'isc-business',
    name: 'Indigenous Business Development Program',
    provider: 'Indigenous Services Canada',
    amount: { min: 10000, max: 250000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresIndigenousOwned: true,
    },
    url: 'https://www.sac-isc.gc.ca/eng/1582218767276/1610721527375',
    description: 'Support for Indigenous entrepreneurs to start, expand or acquire a business. Covers costs like equipment, working capital, and marketing.',
    tags: ['indigenous'],
  },
  {
    id: 'nacca',
    name: 'Aboriginal Financial Institutions Loans',
    provider: 'National Aboriginal Capital Corporations Association',
    amount: { min: 5000, max: 500000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresIndigenousOwned: true,
    },
    url: 'https://nacca.ca/',
    description: 'Access to capital for Indigenous entrepreneurs through a network of Aboriginal Financial Institutions across Canada.',
    tags: ['indigenous'],
  },
  {
    id: 'indigenous-women',
    name: 'Indigenous Women Entrepreneurship Program',
    provider: 'Pauktuutit / Government of Canada',
    amount: { min: 5000, max: 75000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresIndigenousOwned: true,
      requiresWomanOwned: true,
    },
    url: 'https://pauktuutit.ca/',
    description: 'Funding and support specifically for Indigenous women entrepreneurs to start or grow their businesses.',
    tags: ['indigenous', 'women_owned'],
  },

  // ─── Immigrant & Newcomer Programs ─────────────────────────────────────────
  {
    id: 'startup-visa',
    name: 'Start-Up Visa Program',
    provider: 'Immigration, Refugees and Citizenship Canada',
    amount: { min: 0, max: 0 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['all'],
      requiresNewcomer: true,
      requiresTechStartup: true,
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',
    description: 'Targets immigrant entrepreneurs with innovative business ideas. Links them with Canadian venture capital funds, angel investor groups, or business incubators.',
    tags: ['immigrant', 'tech_startup', 'innovation'],
  },
  {
    id: 'oinp',
    name: 'Ontario Immigrant Nominee Program — Entrepreneur Stream',
    provider: 'Ontario Ministry of Labour, Immigration, Training and Skills Development',
    amount: { min: 0, max: 0 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['ON'],
      requiresNewcomer: true,
    },
    url: 'https://www.ontario.ca/page/oinp-entrepreneur-stream',
    description: 'Provincial nominee program allowing experienced entrepreneurs to start or buy a business in Ontario and apply for permanent residence.',
    tags: ['immigrant'],
  },
  {
    id: 'newcomer-entrepreneur',
    name: 'Newcomer Entrepreneur Program',
    provider: 'Immigrant Services Association of Nova Scotia',
    amount: { min: 5000, max: 25000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['NS'],
      requiresNewcomer: true,
    },
    url: 'https://isans.ca/',
    description: 'Business training, mentorship and micro-grants for newcomers to Nova Scotia looking to start their own business.',
    tags: ['immigrant'],
  },

  // ─── Tech & Innovation Programs ────────────────────────────────────────────
  {
    id: 'irap',
    name: 'Industrial Research Assistance Program (IRAP)',
    provider: 'National Research Council Canada',
    amount: { min: 10000, max: 500000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['all'],
      maxEmployees: 500,
      requiresTechStartup: true,
    },
    url: 'https://nrc.canada.ca/en/support-technology-innovation',
    description: 'Advisory services and financial support for qualifying technology innovation R&D projects. Covers salaries of R&D staff and contractor costs.',
    tags: ['tech_startup', 'innovation'],
  },
  {
    id: 'sred',
    name: 'Scientific Research & Experimental Development (SR&ED) Tax Credit',
    provider: 'Canada Revenue Agency',
    amount: { min: 0, max: 3000000 },
    type: 'tax_credit',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['all'],
      requiresTechStartup: true,
    },
    url: 'https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html',
    description: 'The largest single source of federal government support for R&D. Provides tax incentives including investment tax credits for qualifying SR&ED expenditures.',
    tags: ['tech_startup', 'innovation'],
  },
  {
    id: 'strategic-innovation',
    name: 'Strategic Innovation Fund',
    provider: 'Innovation, Science and Economic Development Canada',
    amount: { min: 100000, max: 10000000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['all'],
      requiresTechStartup: true,
    },
    url: 'https://ised-isde.canada.ca/site/strategic-innovation-fund/en',
    description: 'Funding for large-scale, transformative projects that accelerate innovation, support clean technology, and create jobs.',
    tags: ['tech_startup', 'innovation', 'sustainability'],
    deadline: '2026-09-30',
  },

  // ─── Sustainability & Green Business ───────────────────────────────────────
  {
    id: 'sustainable-canada',
    name: 'Sustainable Development Technology Canada (SDTC)',
    provider: 'Government of Canada',
    amount: { min: 50000, max: 500000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech', 'construction', 'other'],
      provinces: ['all'],
      requiresSustainabilityFocus: true,
    },
    url: 'https://www.sdtc.ca/',
    description: 'Funding for Canadian companies developing clean technology solutions for climate change, clean air, water, and soil.',
    tags: ['sustainability', 'innovation'],
  },
  {
    id: 'green-construction',
    name: 'Green Construction Innovation Program',
    provider: 'Natural Resources Canada',
    amount: { min: 25000, max: 250000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['construction'],
      provinces: ['all'],
      requiresSustainabilityFocus: true,
    },
    url: 'https://natural-resources.canada.ca/',
    description: 'Support for innovative green building materials, energy-efficient construction methods, and sustainable building practices.',
    tags: ['sustainability', 'innovation'],
    deadline: '2026-08-15',
  },
  {
    id: 'clean-growth',
    name: 'Clean Growth Hub',
    provider: 'Government of Canada',
    amount: { min: 10000, max: 100000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresSustainabilityFocus: true,
    },
    url: 'https://www.canada.ca/en/services/environment/cleangrowthhub.html',
    description: 'One-stop shop for clean technology funding and advice. Connects businesses with the right government programs for green innovation.',
    tags: ['sustainability'],
  },

  // ─── Rural Business Programs ───────────────────────────────────────────────
  {
    id: 'cfdc',
    name: 'Community Futures Development Corporation',
    provider: 'FedDev Ontario / Western Economic Diversification',
    amount: { min: 10000, max: 150000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresRuralLocation: true,
    },
    url: 'https://communityfutures.ca/',
    description: 'Business loans, counseling and support for rural and remote communities across Canada. Focus on economic development in underserved areas.',
    tags: ['rural'],
  },
  {
    id: 'rural-innovation',
    name: 'Rural Economic Development Program',
    provider: 'Infrastructure Canada',
    amount: { min: 25000, max: 500000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresRuralLocation: true,
    },
    url: 'https://www.infrastructure.gc.ca/',
    description: 'Grants for projects that support economic development and job creation in rural and remote communities.',
    tags: ['rural'],
    deadline: '2026-07-31',
  },

  // ─── Veteran Programs ──────────────────────────────────────────────────────
  {
    id: 'veteran-entrepreneur',
    name: "Prince's Trust Canada - Veterans Program",
    provider: "Prince's Trust Canada",
    amount: { min: 5000, max: 30000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresVeteran: true,
    },
    url: 'https://www.princestrust.ca/',
    description: 'Business start-up support, training and funding specifically for Canadian Armed Forces veterans transitioning to entrepreneurship.',
    tags: ['veteran'],
  },

  // ─── Disability Programs ───────────────────────────────────────────────────
  {
    id: 'entrepreneurs-disability',
    name: 'Entrepreneurs with Disabilities Program',
    provider: 'Community Futures Network',
    amount: { min: 5000, max: 75000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresDisability: true,
    },
    url: 'https://communityfuturescanada.ca/',
    description: 'Business loans and support services for entrepreneurs with disabilities. Flexible repayment terms and accessibility accommodations.',
    tags: ['disability'],
  },

  // ─── Minority-Owned Business Programs ──────────────────────────────────────
  {
    id: 'black-entrepreneur',
    name: 'Black Entrepreneurship Program',
    provider: 'Government of Canada',
    amount: { min: 10000, max: 250000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresMinorityOwned: true,
    },
    url: 'https://ised-isde.canada.ca/site/black-entrepreneurship-program/en',
    description: 'Loans up to $250,000 for Black business owners and entrepreneurs. Part of a $265 million investment to support Black entrepreneurship in Canada.',
    tags: ['minority_owned'],
  },
  {
    id: 'bipoc-foundation',
    name: 'BIPOC Foundation Business Fund',
    provider: 'BIPOC Foundation',
    amount: { min: 5000, max: 50000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['all'],
      requiresMinorityOwned: true,
    },
    url: 'https://bipocfoundation.com/',
    description: 'Grants and resources for Black, Indigenous, and People of Color entrepreneurs to start and grow their businesses.',
    tags: ['minority_owned', 'indigenous'],
  },

  // ─── Provincial Programs ───────────────────────────────────────────────────
  {
    id: 'ontario-innovation',
    name: 'Ontario Innovation Tax Credit',
    provider: 'Province of Ontario',
    amount: { min: 0, max: 500000 },
    type: 'tax_credit',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['ON'],
      requiresTechStartup: true,
    },
    url: 'https://www.ontario.ca/page/ontario-innovation-tax-credit',
    description: 'Refundable tax credit for qualifying R&D expenditures by Ontario corporations. Up to 10% of eligible expenditures.',
    tags: ['tech_startup', 'innovation'],
  },
  {
    id: 'bc-tech-fund',
    name: 'BC Tech Fund',
    provider: 'Province of British Columbia',
    amount: { min: 25000, max: 500000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech'],
      provinces: ['BC'],
      requiresTechStartup: true,
    },
    url: 'https://www.britishcolumbia.ca/',
    description: 'Investment and grants for BC-based tech companies at various stages of growth. Focus on scalable technology businesses.',
    tags: ['tech_startup', 'innovation'],
  },
  {
    id: 'quebec-women',
    name: 'Femmessor Quebec',
    provider: 'Femmessor',
    amount: { min: 10000, max: 150000 },
    type: 'loan',
    eligibility: {
      industries: ['all'],
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['QC'],
      requiresWomanOwned: true,
    },
    url: 'https://femmessor.com/',
    description: 'Financing, coaching and networking for women entrepreneurs in Quebec. Flexible loans with personalized support.',
    tags: ['women_owned'],
  },
  {
    id: 'alberta-innovates',
    name: 'Alberta Innovates',
    provider: 'Province of Alberta',
    amount: { min: 25000, max: 1000000 },
    type: 'grant',
    eligibility: {
      industries: ['all'],
      businessTypes: ['tech', 'health'],
      provinces: ['AB'],
      requiresTechStartup: true,
    },
    url: 'https://albertainnovates.ca/',
    description: 'Funding and mentorship for Alberta-based technology and health innovation companies. Multiple programs for different stages.',
    tags: ['tech_startup', 'innovation'],
    deadline: '2026-05-15',
  },
]

// Helper function to get grants by tag
export function getGrantsByTag(tag: string): Grant[] {
  return GRANTS.filter(grant => grant.tags.includes(tag as Grant['tags'][number]))
}

// Helper function to get grants by province
export function getGrantsByProvince(province: string): Grant[] {
  return GRANTS.filter(grant => 
    grant.eligibility.provinces.includes('all') || 
    grant.eligibility.provinces.includes(province as never)
  )
}

// Helper function to search grants
export function searchGrants(query: string): Grant[] {
  const lowerQuery = query.toLowerCase()
  return GRANTS.filter(grant =>
    grant.name.toLowerCase().includes(lowerQuery) ||
    grant.description.toLowerCase().includes(lowerQuery) ||
    grant.provider.toLowerCase().includes(lowerQuery)
  )
}
