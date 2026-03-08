// Translation type definitions
// All translation files must implement this interface exactly

export interface TranslationKeys {
  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION & LAYOUT
  // ═══════════════════════════════════════════════════════════════
  'nav.features': string
  'nav.howItWorks': string
  'nav.useCases': string
  'nav.pricing': string
  'nav.login': string
  'nav.signup': string
  'nav.logout': string
  'nav.dashboard': string
  'nav.backToHome': string

  // Sidebar navigation
  'sidebar.dashboard': string
  'sidebar.viabilityScan': string
  'sidebar.launchRoadmap': string
  'sidebar.craDocumentHub': string
  'sidebar.licenseNavigator': string
  'sidebar.hrOnboarding': string
  'sidebar.breakEvenCalculator': string
  'sidebar.taxCalendar': string
  'sidebar.nameGenerator': string
  'sidebar.competitorMap': string
  'sidebar.analytics': string
  'sidebar.grantsAndFunding': string
  'sidebar.storefront': string

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - HERO
  // ═══════════════════════════════════════════════════════════════
  'hero.tagline': string
  'hero.headline1': string
  'hero.headline2': string
  'hero.subheadline': string
  'hero.cta.start': string
  'hero.cta.howItWorks': string

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FEATURES
  // ═══════════════════════════════════════════════════════════════
  'features.headline': string
  'features.headlineHighlight': string
  'features.subheadline': string

  'features.viability.title': string
  'features.viability.description': string

  'features.roadmap.title': string
  'features.roadmap.description': string

  'features.compliance.title': string
  'features.compliance.description': string

  'features.storefront.title': string
  'features.storefront.description': string

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - CTA
  // ═══════════════════════════════════════════════════════════════
  'cta.tagline': string
  'cta.headline1': string
  'cta.headline2': string
  'cta.subheadline': string
  'cta.button.start': string
  'cta.button.dashboard': string
  'cta.button.tryFree': string

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FOOTER
  // ═══════════════════════════════════════════════════════════════
  'footer.description': string
  'footer.product': string
  'footer.resources': string
  'footer.company': string
  'footer.startupGuides': string
  'footer.fundingDatabase': string
  'footer.documentation': string
  'footer.apiReference': string
  'footer.aboutBizy': string
  'footer.careers': string
  'footer.privacyPolicy': string
  'footer.termsOfService': string
  'footer.copyright': string
  'footer.builtInCanada': string

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  'dashboard.welcomeBack': string
  'dashboard.whatToDo': string
  'dashboard.loading': string

  // Business profile labels
  'dashboard.businessType': string
  'dashboard.location': string
  'dashboard.stage': string

  // Feature cards
  'dashboard.card.viability.title': string
  'dashboard.card.viability.description': string
  'dashboard.card.roadmap.title': string
  'dashboard.card.roadmap.description': string
  'dashboard.card.cra.title': string
  'dashboard.card.cra.description': string
  'dashboard.card.licenses.title': string
  'dashboard.card.licenses.description': string
  'dashboard.card.hr.title': string
  'dashboard.card.hr.description': string
  'dashboard.card.calculator.title': string
  'dashboard.card.calculator.description': string
  'dashboard.card.taxCalendar.title': string
  'dashboard.card.taxCalendar.description': string
  'dashboard.card.nameGenerator.title': string
  'dashboard.card.nameGenerator.description': string
  'dashboard.card.competitorMap.title': string
  'dashboard.card.competitorMap.description': string
  'dashboard.card.analytics.title': string
  'dashboard.card.analytics.description': string
  'dashboard.card.grants.title': string
  'dashboard.card.grants.description': string
  'dashboard.card.storefront.title': string
  'dashboard.card.storefront.description': string

  // ═══════════════════════════════════════════════════════════════
  // ONBOARDING
  // ═══════════════════════════════════════════════════════════════
  'onboarding.businessName': string
  'onboarding.businessNamePlaceholder': string
  'onboarding.businessType': string
  'onboarding.selectBusinessType': string
  'onboarding.businessDescription': string
  'onboarding.businessDescriptionPlaceholder': string
  'onboarding.continue': string
  'onboarding.back': string
  'onboarding.finish': string
  'onboarding.skip': string

  // Business types
  'businessType.food': string
  'businessType.retail': string
  'businessType.services': string
  'businessType.tech': string
  'businessType.construction': string
  'businessType.health': string
  'businessType.education': string
  'businessType.other': string

  // Location step
  'onboarding.province': string
  'onboarding.selectProvince': string
  'onboarding.city': string
  'onboarding.cityPlaceholder': string

  // Budget step
  'onboarding.budget': string
  'onboarding.selectBudget': string
  'onboarding.targetCustomers': string
  'onboarding.selectTargetCustomers': string
  'onboarding.stage': string
  'onboarding.selectStage': string

  // Budget options
  'budget.under5k': string
  'budget.5kTo25k': string
  'budget.25kTo100k': string
  'budget.over100k': string

  // Target customer options
  'customers.b2c': string
  'customers.b2b': string
  'customers.both': string

  // Stage options
  'stage.idea': string
  'stage.planning': string
  'stage.launching': string
  'stage.operating': string

  // StepFour - Business Information
  'onboarding.stepFour.optionalNotice': string
  'onboarding.stepFour.optionalDescription': string
  'onboarding.stepFour.businessInfo': string
  'onboarding.stepFour.numberOfEmployees': string
  'onboarding.stepFour.annualRevenue': string
  'onboarding.stepFour.submit': string

  // Employee count options
  'employees.justMe': string
  'employees.1to5': string
  'employees.6to25': string
  'employees.26to100': string
  'employees.100plus': string

  // Revenue range options
  'revenue.preRevenue': string
  'revenue.under50k': string
  'revenue.50kTo250k': string
  'revenue.250kTo1m': string
  'revenue.1mTo5m': string
  'revenue.over5m': string

  // Founder Demographics
  'onboarding.founderDemographics': string
  'onboarding.founderDemographicsDesc': string
  'onboarding.genderIdentity': string
  'onboarding.indigenousIdentity': string
  'onboarding.immigrantStatus': string
  'onboarding.disabilityStatus': string
  'onboarding.veteranStatus': string
  'onboarding.youthEntrepreneur': string

  // Gender options
  'gender.woman': string
  'gender.man': string
  'gender.nonBinary': string
  'gender.other': string
  'gender.preferNotToSay': string

  // Indigenous options
  'indigenous.firstNations': string
  'indigenous.metis': string
  'indigenous.inuit': string
  'indigenous.none': string
  'indigenous.preferNotToSay': string

  // Immigrant options
  'immigrant.newcomer': string
  'immigrant.immigrant': string
  'immigrant.citizenBorn': string
  'immigrant.preferNotToSay': string

  // Business Characteristics
  'onboarding.businessCharacteristics': string
  'onboarding.businessCharacteristicsDesc': string
  'onboarding.womanOwned': string
  'onboarding.minorityOwned': string
  'onboarding.indigenousOwned': string
  'onboarding.ruralLocation': string
  'onboarding.techStartup': string
  'onboarding.sustainabilityFocus': string

  // ═══════════════════════════════════════════════════════════════
  // VIABILITY SCAN
  // ═══════════════════════════════════════════════════════════════
  'viability.title': string
  'viability.subtitle': string
  'viability.runScan': string
  'viability.scanning': string
  'viability.score': string
  'viability.verdict': string
  'viability.risks': string
  'viability.opportunities': string
  'viability.nextSteps': string
  'viability.marketInsights': string
  'viability.grantsAvailable': string
  'viability.riskSeverity.high': string
  'viability.riskSeverity.medium': string
  'viability.riskSeverity.low': string

  // ═══════════════════════════════════════════════════════════════
  // LAUNCH ROADMAP
  // ═══════════════════════════════════════════════════════════════
  'roadmap.title': string
  'roadmap.subtitle': string
  'roadmap.generate': string
  'roadmap.generating': string
  'roadmap.progress': string
  'roadmap.completed': string
  'roadmap.inProgress': string
  'roadmap.notStarted': string
  'roadmap.markComplete': string
  'roadmap.markIncomplete': string
  'roadmap.estimatedTime': string
  'roadmap.dependencies': string
  'roadmap.tools': string
  'roadmap.priority': string
  'roadmap.difficulty': string
  'roadmap.category.legal': string
  'roadmap.category.financial': string
  'roadmap.category.product': string
  'roadmap.category.marketing': string
  'roadmap.category.operations': string

  // ═══════════════════════════════════════════════════════════════
  // COMPLIANCE HUB
  // ═══════════════════════════════════════════════════════════════
  'compliance.cra.title': string
  'compliance.cra.subtitle': string
  'compliance.licenses.title': string
  'compliance.licenses.subtitle': string
  'compliance.hr.title': string
  'compliance.hr.subtitle': string

  'compliance.required': string
  'compliance.recommended': string
  'compliance.optional': string
  'compliance.download': string
  'compliance.viewDetails': string
  'compliance.status.complete': string
  'compliance.status.pending': string
  'compliance.status.notStarted': string

  // ═══════════════════════════════════════════════════════════════
  // GRANTS & FUNDING
  // ═══════════════════════════════════════════════════════════════
  'grants.title': string
  'grants.subtitle': string
  'grants.filter.all': string
  'grants.filter.federal': string
  'grants.filter.provincial': string
  'grants.filter.municipal': string
  'grants.apply': string
  'grants.deadline': string
  'grants.amount': string
  'grants.eligibility': string
  'grants.noResults': string

  // ═══════════════════════════════════════════════════════════════
  // STOREFRONT BUILDER
  // ═══════════════════════════════════════════════════════════════
  'storefront.title': string
  'storefront.subtitle': string
  'storefront.website': string
  'storefront.appClip': string
  'storefront.generate': string
  'storefront.generating': string
  'storefront.preview': string
  'storefront.publish': string
  'storefront.customize': string

  // ═══════════════════════════════════════════════════════════════
  // ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  'analytics.title': string
  'analytics.subtitle': string
  'analytics.revenue': string
  'analytics.customers': string
  'analytics.growth': string
  'analytics.benchmarks': string
  'analytics.healthScore': string
  'analytics.insights': string

  // ═══════════════════════════════════════════════════════════════
  // CALCULATOR
  // ═══════════════════════════════════════════════════════════════
  'calculator.title': string
  'calculator.subtitle': string
  'calculator.fixedCosts': string
  'calculator.variableCosts': string
  'calculator.pricePerUnit': string
  'calculator.breakEvenPoint': string
  'calculator.calculate': string
  'calculator.reset': string

  // ═══════════════════════════════════════════════════════════════
  // TAX CALENDAR
  // ═══════════════════════════════════════════════════════════════
  'taxCalendar.title': string
  'taxCalendar.subtitle': string
  'taxCalendar.upcoming': string
  'taxCalendar.past': string
  'taxCalendar.addReminder': string
  'taxCalendar.dueDate': string

  // ═══════════════════════════════════════════════════════════════
  // NAME GENERATOR
  // ═══════════════════════════════════════════════════════════════
  'nameGenerator.title': string
  'nameGenerator.subtitle': string
  'nameGenerator.generate': string
  'nameGenerator.generating': string
  'nameGenerator.save': string
  'nameGenerator.saved': string
  'nameGenerator.checkAvailability': string

  // ═══════════════════════════════════════════════════════════════
  // COMPETITOR MAP
  // ═══════════════════════════════════════════════════════════════
  'competitorMap.title': string
  'competitorMap.subtitle': string
  'competitorMap.search': string
  'competitorMap.searching': string
  'competitorMap.noCompetitors': string
  'competitorMap.distance': string
  'competitorMap.rating': string

  // ═══════════════════════════════════════════════════════════════
  // AI CHAT
  // ═══════════════════════════════════════════════════════════════
  'chat.placeholder': string
  'chat.send': string
  'chat.thinking': string
  'chat.error': string
  'chat.retry': string

  // ═══════════════════════════════════════════════════════════════
  // COMMON UI ELEMENTS
  // ═══════════════════════════════════════════════════════════════
  'common.loading': string
  'common.error': string
  'common.success': string
  'common.save': string
  'common.cancel': string
  'common.delete': string
  'common.edit': string
  'common.view': string
  'common.close': string
  'common.search': string
  'common.searchPlaceholder': string
  'common.noResults': string
  'common.retry': string
  'common.submit': string
  'common.next': string
  'common.previous': string
  'common.yes': string
  'common.no': string
  'common.confirm': string
  'common.all': string
  'common.none': string
  'common.filter': string
  'common.sort': string
  'common.export': string
  'common.import': string
  'common.download': string
  'common.upload': string
  'common.required': string
  'common.optional': string
  'common.select': string
  'common.back': string
  'common.skip': string
  'common.preferNotToSay': string

  // ═══════════════════════════════════════════════════════════════
  // ERROR MESSAGES
  // ═══════════════════════════════════════════════════════════════
  'error.generic': string
  'error.network': string
  'error.notFound': string
  'error.unauthorized': string
  'error.validation': string
  'error.required': string
  'error.invalidEmail': string
  'error.tryAgain': string

  // ═══════════════════════════════════════════════════════════════
  // SUCCESS MESSAGES
  // ═══════════════════════════════════════════════════════════════
  'success.saved': string
  'success.deleted': string
  'success.updated': string
  'success.created': string
  'success.sent': string

  // ═══════════════════════════════════════════════════════════════
  // PROVINCES
  // ═══════════════════════════════════════════════════════════════
  'province.on': string
  'province.bc': string
  'province.ab': string
  'province.qc': string
  'province.mb': string
  'province.sk': string
  'province.ns': string
  'province.nb': string
  'province.nl': string
  'province.pe': string
  'province.nt': string
  'province.yt': string
  'province.nu': string
}

export type TranslationKey = keyof TranslationKeys
