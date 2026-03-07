import type { Grant } from '@/types'

export const GRANTS: Grant[] = [
  {
    id: 'csbfp',
    name: 'Canada Small Business Financing Program',
    provider: 'Government of Canada',
    amount: { min: 1000, max: 1000000 },
    type: 'loan',
    eligibility: {
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: 'all',
      maxRevenue: 10000000,
    },
    url: 'https://ised-isde.canada.ca/site/canada-small-business-financing-program/en',
    description:
      'Government-backed loans for small businesses to finance the purchase or improvement of land, buildings, equipment, and leasehold improvements.',
  },
  {
    id: 'cdap',
    name: 'Canada Digital Adoption Program',
    provider: 'Innovation, Science and Economic Development Canada',
    amount: { min: 2400, max: 15000 },
    type: 'grant',
    eligibility: {
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: 'all',
      maxEmployees: 499,
    },
    url: 'https://ised-isde.canada.ca/site/canada-digital-adoption-program/en',
    description:
      'Micro-grants to help small businesses adopt digital technologies, including e-commerce, digital marketing, and business management software.',
  },
  {
    id: 'futurpreneur',
    name: 'Futurpreneur Canada',
    provider: 'Futurpreneur Canada',
    amount: { min: 12000, max: 60000 },
    type: 'loan',
    eligibility: {
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: 'all',
      founderCriteria: ['youth'],
    },
    url: 'https://www.futurpreneur.ca/',
    description:
      'Financing, mentoring, and support for aspiring business owners aged 18-39. Includes startup loans and expert mentorship for up to 2 years.',
  },
  {
    id: 'wes',
    name: 'Women Entrepreneurship Strategy',
    provider: 'Government of Canada',
    amount: { min: 5000, max: 100000 },
    type: 'grant',
    eligibility: {
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: 'all',
      founderCriteria: ['women'],
    },
    url: 'https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en',
    description:
      'Federal strategy providing access to financing, mentorship, and resources for women entrepreneurs. Multiple funding streams available.',
  },
  {
    id: 'startup-visa',
    name: 'Start-Up Visa Program',
    provider: 'Immigration, Refugees and Citizenship Canada',
    amount: { min: 0, max: 0 },
    type: 'grant',
    eligibility: {
      businessTypes: ['tech'],
      provinces: 'all',
      founderCriteria: ['immigrant'],
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',
    description:
      'Targets immigrant entrepreneurs with innovative business ideas. Links them with Canadian venture capital funds, angel investor groups, or business incubators.',
  },
  {
    id: 'irap',
    name: 'Industrial Research Assistance Program (IRAP)',
    provider: 'National Research Council Canada',
    amount: { min: 10000, max: 500000 },
    type: 'grant',
    eligibility: {
      businessTypes: ['tech'],
      provinces: 'all',
      maxEmployees: 500,
    },
    url: 'https://nrc.canada.ca/en/support-technology-innovation',
    description:
      'Advisory services and financial support for qualifying technology innovation R&D projects. Covers salaries of R&D staff and contractor costs.',
  },
  {
    id: 'oinp',
    name: 'Ontario Immigrant Nominee Program — Entrepreneur Stream',
    provider: 'Ontario Ministry of Labour, Immigration, Training and Skills Development',
    amount: { min: 0, max: 0 },
    type: 'grant',
    eligibility: {
      businessTypes: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
      provinces: ['ON'],
      founderCriteria: ['immigrant'],
    },
    url: 'https://www.ontario.ca/page/oinp-entrepreneur-stream',
    description:
      'Provincial nominee program allowing experienced entrepreneurs to start or buy a business in Ontario and apply for permanent residence.',
  },
  {
    id: 'sred',
    name: 'Scientific Research & Experimental Development (SR&ED) Tax Credit',
    provider: 'Canada Revenue Agency',
    amount: { min: 0, max: 3000000 },
    type: 'tax_credit',
    eligibility: {
      businessTypes: ['tech'],
      provinces: 'all',
    },
    url: 'https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html',
    description:
      'The largest single source of federal government support for R&D. Provides tax incentives including investment tax credits for qualifying SR&ED expenditures.',
  },
]
