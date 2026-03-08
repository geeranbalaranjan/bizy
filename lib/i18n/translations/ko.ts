import type { TranslationKeys } from '../types'

export const ko: TranslationKeys = {
  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION & LAYOUT
  // ═══════════════════════════════════════════════════════════════
  'nav.features': '기능',
  'nav.howItWorks': '작동 방식',
  'nav.useCases': '사용 사례',
  'nav.pricing': '가격',
  'nav.login': '로그인',
  'nav.signup': '가입',
  'nav.logout': '로그아웃',
  'nav.dashboard': '대시보드',
  'nav.backToHome': '홈으로 돌아가기',

  'sidebar.dashboard': '대시보드',
  'sidebar.viabilityScan': '실행 가능성 스캔',
  'sidebar.launchRoadmap': '런칭 로드맵',
  'sidebar.craDocumentHub': 'CRA 문서 허브',
  'sidebar.licenseNavigator': '라이선스 네비게이터',
  'sidebar.hrOnboarding': 'HR 온보딩',
  'sidebar.breakEvenCalculator': '손익분기점 계산기',
  'sidebar.taxCalendar': '세금 캘린더',
  'sidebar.nameGenerator': '이름 생성기',
  'sidebar.competitorMap': '경쟁사 지도',
  'sidebar.analytics': '분석',
  'sidebar.grantsAndFunding': '보조금 및 자금',
  'sidebar.storefront': '스토어프론트',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - HERO
  // ═══════════════════════════════════════════════════════════════
  'hero.tagline': '캐나다를 위한 AI 공동 창업자',
  'hero.headline1': '당신의 AI 공동 창업자',
  'hero.headline2': '캐나다에서 사업을 시작하기 위한.',
  'hero.subheadline': 'Bizy는 아이디어를 검증하고, 규정을 탐색하고, 회사를 런칭하는 것을 도와줍니다 — 하나의 지능형 플랫폼에서.',
  'hero.cta.start': '사업 구축 시작하기',
  'hero.cta.howItWorks': '작동 방식 보기',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FEATURES
  // ═══════════════════════════════════════════════════════════════
  'features.headline': '필요한 모든 것',
  'features.headlineHighlight': '더 스마트하게 런칭하세요.',
  'features.subheadline': '추측을 멈추세요. AI 플랫폼이 캐나다에서 사업을 시작하는 복잡한 과정을 안내해 드립니다.',

  'features.viability.title': '실행 가능성 스캔',
  'features.viability.description': '런칭 전에 시장 수요, 경쟁, 생존 확률을 분석합니다.',

  'features.roadmap.title': '런칭 로드맵',
  'features.roadmap.description': 'AI 공동 창업자가 사업을 런칭하기 위한 맞춤형 단계별 로드맵을 생성합니다.',

  'features.compliance.title': '규정 준수 허브',
  'features.compliance.description': '귀하의 주에 필요한 라이선스, 세금 및 CRA 양식을 자동으로 발견합니다.',

  'features.storefront.title': '스토어프론트 빌더',
  'features.storefront.description': 'AI가 생성한 랜딩 페이지와 예약 흐름으로 즉시 온라인에서 사업을 런칭하세요.',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - CTA
  // ═══════════════════════════════════════════════════════════════
  'cta.tagline': '준비되었을 때',
  'cta.headline1': '사업을 시작하세요',
  'cta.headline2': '자신감을 가지고',
  'cta.subheadline': 'Bizy가 아이디어에서 런칭까지 안내합니다. 조사를 멈추고 오늘 꿈의 회사를 구축하기 시작하세요.',
  'cta.button.start': '구축 시작하기',
  'cta.button.dashboard': '대시보드로 이동',
  'cta.button.tryFree': 'Bizy 무료 체험',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - STORY SCROLL (Animated Text)
  // ═══════════════════════════════════════════════════════════════
  'storyScroll.line1': '사업을 시작하는 것이 아이디어를 공유하는 것처럼 간단하다면 어떨까요?',
  'storyScroll.line2': 'AI가 성공 여부를 알려줄 수 있다면 어떨까요?',
  'storyScroll.line3': '단계별 로드맵이 있다면 어떨까요?',
  'storyScroll.line4': 'Bizy를 만나보세요.',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - AI FEATURES
  // ═══════════════════════════════════════════════════════════════
  'aiFeatures.badge': 'Gemini 2.5 Flash 기반',
  'aiFeatures.headline1': '캐나다 비즈니스 현실에 맞게',
  'aiFeatures.headline2': '훈련된 AI.',
  'aiFeatures.description': 'Bizy는 일반 챗의 래퍼가 아닙니다. StatsCan, CRA 데이터 및 주별 라이선스 레지스트리에 연결된 지능형 엔진입니다.',
  'aiFeatures.contextAware.title': '맥락 인식 조언',
  'aiFeatures.contextAware.desc': '귀하의 특정 주, 산업 및 예산 제약을 이해합니다.',
  'aiFeatures.realTimeData.title': '실시간 시장 데이터',
  'aiFeatures.realTimeData.desc': '귀하의 정확한 우편번호 지역에 대한 생존율 및 수익 벤치마크를 가져옵니다.',
  'aiFeatures.automatedCompliance.title': '자동화된 규정 준수',
  'aiFeatures.automatedCompliance.desc': '필요한 정확한 CRA 양식과 세금 마감일을 생성합니다.',
  'aiFeatures.chat.bizyAI': 'Bizy AI',
  'aiFeatures.chat.online': '온라인',
  'aiFeatures.chat.message1': '토론토에서 카페를 열고 싶다는 것을 알았습니다. 그곳에서 카페의 65%가 첫 해에 실패한다는 것을 아셨나요? 먼저 경쟁 밀도를 확인해 보겠습니다.',
  'aiFeatures.chat.message2': '네, 지도를 보여주시고 시작 비용을 계산해 보겠습니다.',
  'aiFeatures.chat.message3': '실행 가능성 스캔 로딩 중... 계산된 위험 점수는 보통(42)입니다. 초기 임대료를 상쇄할 수 있는 3개의 보조금을 찾았습니다.',
  'aiFeatures.chat.placeholder': '무엇이든 물어보세요...',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - COMPARISON TABLE
  // ═══════════════════════════════════════════════════════════════
  'comparison.badge': '비교',
  'comparison.headline': '창업자가 실제로 구축하고 싶어하는 방식을 위해 설계됨',
  'comparison.subheadline': 'Bizy는 정적인 사업 계획 템플릿이 아닙니다. 현대 구축자를 위해 설계된 동적이고 안내된 지능 플랫폼입니다.',
  'comparison.keyFeatures': '주요 기능',
  'comparison.bizy': 'Bizy',
  'comparison.consultants': '컨설턴트',
  'comparison.consultant': '컨설턴트',
  'comparison.manualPlanning': '수동 계획',
  'comparison.manual': 'DIY 수동',
  'comparison.feature1': 'AI 기반 시장 분석',
  'comparison.feature2': '단계별 런칭 로드맵',
  'comparison.feature3': '즉시 보조금 매칭',
  'comparison.feature4': '실시간 세금 캘린더',
  'comparison.feature5': '규정 준수 추적',
  'comparison.feature6': '시작 비용',
  'comparison.feature7': '런칭 시간',
  'comparison.bizyF6': '월 $29',
  'comparison.consultantF6': '$3,000+',
  'comparison.manualF6': '무료 + 시간',
  'comparison.bizyF7': '시간',
  'comparison.consultantF7': '주',
  'comparison.manualF7': '개월',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FOUR STEPS / TIMELINE
  // ═══════════════════════════════════════════════════════════════
  'timeline.headline': '런칭까지 4단계.',
  'timeline.step1.title': '사업을 설명하세요',
  'timeline.step1.description': 'Bizy에게 무엇을 어디에 구축하고 싶은지 알려주세요.',
  'timeline.step2.title': 'Bizy가 실행 가능성을 분석합니다',
  'timeline.step2.description': 'AI가 시장 데이터를 가져와 생존을 예측합니다.',
  'timeline.step3.title': '런칭 로드맵 생성',
  'timeline.step3.description': '단계별 규정 준수 행동 계획을 받으세요.',
  'timeline.step4.title': '스토어프론트 런칭',
  'timeline.step4.description': '아름다운 웹사이트를 생성하고 판매를 시작하세요.',
  'timeline.stepLabel': '단계',
  'timeline.previewLabel': '애니메이션 UI 미리보기:',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FEATURE DEEP DIVE
  // ═══════════════════════════════════════════════════════════════
  'featureSpotlight.badge': '기능 스포트라이트',
  'featureSpotlight.uiPreview': 'UI 미리보기',
  'featureSpotlight.viability.title': 'AI 실행 가능성 분석',
  'featureSpotlight.viability.subtitle': '돈을 쓰기 전에 기회를 파악하세요.',
  'featureSpotlight.viability.description': '시장 수요, 경쟁 밀도 및 생존 확률을 예측하기 위해 캐나다 전역의 방대한 데이터셋을 분석합니다.',
  'featureSpotlight.viability.bullet1': '실시간 시장 밀도 스캔',
  'featureSpotlight.viability.bullet2': '생존 확률 예측',
  'featureSpotlight.viability.bullet3': '비용 대 수익 벤치마킹',
  'featureSpotlight.viability.image': 'viability',
  'featureSpotlight.roadmap.title': '런칭 로드맵',
  'featureSpotlight.roadmap.subtitle': '단계별 마스터 플랜.',
  'featureSpotlight.roadmap.description': 'Gemini AI가 사업 유형과 주를 분석하여 아이디어부터 오픈일까지 매우 구체적이고 순서화된 로드맵을 생성합니다.',
  'featureSpotlight.roadmap.bullet1': '시간 추정이 포함된 순서화된 작업',
  'featureSpotlight.roadmap.bullet2': '우선순위 논리',
  'featureSpotlight.roadmap.bullet3': '진행 상황 추적',
  'featureSpotlight.roadmap.image': 'roadmap',

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE - FOOTER
  // ═══════════════════════════════════════════════════════════════
  'footer.description': '캐나다에서 사업을 시작하기 위한 AI 공동 창업자. 아이디어 검증, 규정 준수 탐색, 스토어프론트 구축.',
  'footer.product': '제품',
  'footer.resources': '리소스',
  'footer.company': '회사',
  'footer.startupGuides': '스타트업 가이드',
  'footer.fundingDatabase': '자금 데이터베이스',
  'footer.documentation': '문서',
  'footer.apiReference': 'API 참조',
  'footer.aboutBizy': 'Bizy 소개',
  'footer.careers': '채용',
  'footer.privacyPolicy': '개인정보 보호정책',
  'footer.termsOfService': '서비스 약관',
  'footer.copyright': '© {year} Bizy Inc. 모든 권리 보유.',
  'footer.builtInCanada': '캐나다에서 제작',

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  'dashboard.welcomeBack': '다시 오신 것을 환영합니다',
  'dashboard.whatToDo': '무엇을 하시겠습니까?',
  'dashboard.loading': '로딩 중...',

  'dashboard.businessType': '사업 유형',
  'dashboard.location': '위치',
  'dashboard.stage': '단계',

  'dashboard.card.viability.title': '실행 가능성 스캔',
  'dashboard.card.viability.description': '사업 아이디어 검증하기',
  'dashboard.card.roadmap.title': '런칭 로드맵',
  'dashboard.card.roadmap.description': '단계별 런칭 체크리스트',
  'dashboard.card.cra.title': 'CRA 문서 허브',
  'dashboard.card.cra.description': '세금 양식 및 CRA 리소스',
  'dashboard.card.licenses.title': '라이선스 네비게이터',
  'dashboard.card.licenses.description': '필수 허가 및 라이선스',
  'dashboard.card.hr.title': 'HR 온보딩',
  'dashboard.card.hr.description': '직원 설정 및 규정 준수',
  'dashboard.card.calculator.title': '손익분기점 계산기',
  'dashboard.card.calculator.description': '수익성 계산하기',
  'dashboard.card.taxCalendar.title': '세금 캘린더',
  'dashboard.card.taxCalendar.description': '중요한 세금 마감일',
  'dashboard.card.nameGenerator.title': '이름 생성기',
  'dashboard.card.nameGenerator.description': 'AI 기반 비즈니스 이름',
  'dashboard.card.competitorMap.title': '경쟁사 지도',
  'dashboard.card.competitorMap.description': '근처 경쟁사 찾기',
  'dashboard.card.analytics.title': '분석',
  'dashboard.card.analytics.description': '비즈니스 인사이트 및 지표',
  'dashboard.card.grants.title': '보조금 및 자금',
  'dashboard.card.grants.description': '자금 지원 기회 찾기',
  'dashboard.card.storefront.title': '스토어프론트',
  'dashboard.card.storefront.description': '온라인 존재감 구축하기',

  // ═══════════════════════════════════════════════════════════════
  // ONBOARDING
  // ═══════════════════════════════════════════════════════════════
  'onboarding.businessName': '사업체 이름',
  'onboarding.businessNamePlaceholder': '사업체 이름을 입력하세요',
  'onboarding.businessType': '사업 유형',
  'onboarding.selectBusinessType': '사업 유형 선택',
  'onboarding.businessDescription': '사업 설명',
  'onboarding.businessDescriptionPlaceholder': '귀하의 사업을 설명하세요...',
  'onboarding.continue': '계속',
  'onboarding.back': '뒤로',
  'onboarding.finish': '완료',
  'onboarding.skip': '건너뛰기',

  'businessType.food': '식음료',
  'businessType.retail': '소매',
  'businessType.services': '서비스',
  'businessType.tech': '기술',
  'businessType.construction': '건설',
  'businessType.health': '건강',
  'businessType.education': '교육',
  'businessType.other': '기타',

  'onboarding.province': '주',
  'onboarding.selectProvince': '주 선택',
  'onboarding.city': '도시',
  'onboarding.cityPlaceholder': '도시를 입력하세요',

  'onboarding.budget': '예산',
  'onboarding.selectBudget': '예산 범위 선택',
  'onboarding.targetCustomers': '타겟 고객',
  'onboarding.selectTargetCustomers': '타겟 고객 선택',
  'onboarding.stage': '사업 단계',
  'onboarding.selectStage': '단계 선택',

  'budget.under5k': '$5,000 미만',
  'budget.5kTo25k': '$5,000 - $25,000',
  'budget.25kTo100k': '$25,000 - $100,000',
  'budget.over100k': '$100,000 초과',

  'customers.b2c': '소비자 (B2C)',
  'customers.b2b': '기업 (B2B)',
  'customers.both': '둘 다',

  'stage.idea': '아이디어 단계',
  'stage.planning': '계획',
  'stage.launching': '런칭',
  'stage.operating': '운영',

  // StepFour - Business Information
  'onboarding.stepFour.optionalNotice': '이 단계는 완전히 선택 사항입니다',
  'onboarding.stepFour.optionalDescription': '자발적 자기 식별은 관련 보조금 및 자금 지원 기회와 연결하는 데 도움이 됩니다. 모든 정보는 기밀로 유지됩니다.',
  'onboarding.stepFour.businessInfo': '사업 정보',
  'onboarding.stepFour.numberOfEmployees': '직원 수',
  'onboarding.stepFour.annualRevenue': '연간 수익 범위',
  'onboarding.stepFour.submit': '제출',

  // Employee count options
  'employees.justMe': '나 혼자 (0명)',
  'employees.1to5': '1-5명',
  'employees.6to25': '6-25명',
  'employees.26to100': '26-100명',
  'employees.100plus': '100명 이상',

  // Revenue range options
  'revenue.preRevenue': '수익 전',
  'revenue.under50k': '$5만 미만',
  'revenue.50kTo250k': '$5만 - $25만',
  'revenue.250kTo1m': '$25만 - $100만',
  'revenue.1mTo5m': '$100만 - $500만',
  'revenue.over5m': '$500만 이상',

  // Founder Demographics
  'onboarding.founderDemographics': '창업자 인구통계',
  'onboarding.founderDemographicsDesc': '보조금 자격을 위한 자발적 자기 식별',
  'onboarding.genderIdentity': '성별 정체성',
  'onboarding.indigenousIdentity': '원주민 정체성',
  'onboarding.immigrantStatus': '이민자 / 신규 이주자 상태',
  'onboarding.disabilityStatus': '장애 상태',
  'onboarding.veteranStatus': '초부 경력자 상태',
  'onboarding.youthEntrepreneur': '청년 기업가 (30세 미만)',

  // Gender options
  'gender.woman': '여성',
  'gender.man': '남성',
  'gender.nonBinary': '논바이너리',
  'gender.other': '기타',
  'gender.preferNotToSay': '답변하지 않겠습니다',

  // Indigenous options
  'indigenous.firstNations': '퍼스트 네이션스',
  'indigenous.metis': '메티스',
  'indigenous.inuit': '이누잇',
  'indigenous.none': '없음',
  'indigenous.preferNotToSay': '답변하지 않겠습니다',

  // Immigrant options
  'immigrant.newcomer': '신규 이주자 (5년 이내 도착)',
  'immigrant.immigrant': '이민자 (5년 이상 전 도착)',
  'immigrant.citizenBorn': '출생 캐나다 시민권자',
  'immigrant.preferNotToSay': '답변하지 않겠습니다',

  // Business Characteristics
  'onboarding.businessCharacteristics': '사업 특성',
  'onboarding.businessCharacteristicsDesc': '이 정보는 관련 자금 지원 프로그램을 찾는 데 도움이 됩니다',
  'onboarding.womanOwned': '여성 소유 사업입니까? (51% 이상 소유)',
  'onboarding.minorityOwned': '소수자 소유 사업입니까?',
  'onboarding.indigenousOwned': '원주민 소유 사업입니까?',
  'onboarding.ruralLocation': '사업체가 농촌 지역에 위치합니까?',
  'onboarding.techStartup': '테크 스타트업입니까?',
  'onboarding.sustainabilityFocus': '지속 가능성 또는 친환경 혁신에 중점을 둡니까?',

  // ═══════════════════════════════════════════════════════════════
  // VIABILITY SCAN
  // ═══════════════════════════════════════════════════════════════
  'viability.title': '실행 가능성 스캔',
  'viability.subtitle': '캐나다 시장에서 사업 아이디어의 잠재력을 분석합니다',
  'viability.runScan': '실행 가능성 스캔 실행',
  'viability.scanning': '사업 분석 중...',
  'viability.score': '실행 가능성 점수',
  'viability.verdict': '평결',
  'viability.risks': '주요 위험',
  'viability.opportunities': '주요 기회',
  'viability.nextSteps': '권장 다음 단계',
  'viability.marketInsights': '시장 인사이트',
  'viability.grantsAvailable': '이용 가능한 보조금',
  'viability.riskSeverity.high': '높음',
  'viability.riskSeverity.medium': '중간',
  'viability.riskSeverity.low': '낮음',
  'viability.runScanButton': '스캔 실행',
  'viability.runScanDescription': '프로필, 시장 상황 및 업계 벤치마크를 기반으로 사업 아이디어에 대한 AI 기반 평가를 받으세요.',
  'viability.runAgain': '다시 스캔 실행',
  'viability.loading.message1': '캐나다 시장 동향 분석 중...',
  'viability.loading.message2': '업계 경쟁 평가 중...',
  'viability.loading.message3': '생존 확률 계산 중...',
  'viability.loading.message4': 'AI 스타트업 전략 생성 중...',
  'viability.loading.wait': '잠시 기다려 주세요',
  'viability.results': '실행 가능성 결과',
  'viability.explainScore': '내 점수 설명하기',
  'viability.aiExplanation': 'AI 설명',
  'viability.revenueBenchmarks': '수익 벤치마크',
  'viability.revenueBenchmarksDesc': '해당 지역의 유사 업종 평균 예상 수익(CAD)',
  'viability.profileRequired': '프로필 필요',
  'viability.completeOnboarding': '실행 가능성 스캔을 실행하려면 온보딩을 완료하세요.',
  'viability.loadingProfile': '프로필 로딩 중...',
  'viability.scanFailed': '스캔 실패',
  'viability.retryScan': '스캔 재시도',
  'viability.addBusinessInfo': '스캔을 실행하려면 온보딩에서 사업 유형, 주, 사업 설명을 추가하세요.',
  'viability.editProfile': '프로필 수정',
  'viability.completeOnboardingButton': '온보딩 완료',

  // ═══════════════════════════════════════════════════════════════
  // LAUNCH ROADMAP
  // ═══════════════════════════════════════════════════════════════
  'roadmap.title': '런칭 로드맵',
  'roadmap.subtitle': '사업을 런칭하기 위한 개인화된 단계별 가이드',
  'roadmap.generate': '로드맵 생성',
  'roadmap.generating': '로드맵 생성 중...',
  'roadmap.progress': '진행률',
  'roadmap.completed': '완료됨',
  'roadmap.inProgress': '진행 중',
  'roadmap.notStarted': '시작 안 됨',
  'roadmap.markComplete': '완료로 표시',
  'roadmap.markIncomplete': '미완료로 표시',
  'roadmap.estimatedTime': '예상 시간',
  'roadmap.dependencies': '종속성',
  'roadmap.tools': '권장 도구',
  'roadmap.priority': '우선순위',
  'roadmap.difficulty': '난이도',
  'roadmap.category.legal': '법률',
  'roadmap.category.financial': '재무',
  'roadmap.category.product': '제품',
  'roadmap.category.marketing': '마케팅',
  'roadmap.category.operations': '운영',

  // ═══════════════════════════════════════════════════════════════
  // COMPLIANCE HUB
  // ═══════════════════════════════════════════════════════════════
  'compliance.cra.title': 'CRA 문서 허브',
  'compliance.cra.subtitle': '사업을 위한 세금 양식, 가이드 및 CRA 리소스',
  'compliance.licenses.title': '라이선스 네비게이터',
  'compliance.licenses.subtitle': '사업 유형 및 위치에 필요한 허가 및 라이선스',
  'compliance.hr.title': 'HR 온보딩',
  'compliance.hr.subtitle': '직원 설정, 급여 및 HR 규정 준수 체크리스트',

  'compliance.required': '필수',
  'compliance.recommended': '권장',
  'compliance.optional': '선택',
  'compliance.download': '다운로드',
  'compliance.viewDetails': '세부정보 보기',
  'compliance.status.complete': '완료',
  'compliance.status.pending': '보류 중',
  'compliance.status.notStarted': '시작 안 됨',

  // ═══════════════════════════════════════════════════════════════
  // GRANTS & FUNDING
  // ═══════════════════════════════════════════════════════════════
  'grants.title': '보조금 및 자금',
  'grants.subtitle': '사업을 위한 자금 지원 기회를 발견하세요',
  'grants.filter.all': '전체',
  'grants.filter.federal': '연방',
  'grants.filter.provincial': '주',
  'grants.filter.municipal': '시',
  'grants.apply': '지금 신청',
  'grants.deadline': '마감일',
  'grants.amount': '금액',
  'grants.eligibility': '자격',
  'grants.noResults': '귀하의 기준에 맞는 보조금을 찾을 수 없습니다',

  // ═══════════════════════════════════════════════════════════════
  // STOREFRONT BUILDER
  // ═══════════════════════════════════════════════════════════════
  'storefront.title': '스토어프론트 빌더',
  'storefront.subtitle': 'AI로 온라인 존재감 만들기',
  'storefront.website': '웹사이트',
  'storefront.appClip': '앱 클립',
  'storefront.generate': '생성',
  'storefront.generating': '생성 중...',
  'storefront.preview': '미리보기',
  'storefront.publish': '게시',
  'storefront.customize': '사용자 정의',

  // ═══════════════════════════════════════════════════════════════
  // ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  'analytics.title': '분석',
  'analytics.subtitle': '비즈니스 성과 및 인사이트 추적',
  'analytics.revenue': '수익',
  'analytics.customers': '고객',
  'analytics.growth': '성장',
  'analytics.benchmarks': '산업 벤치마크',
  'analytics.healthScore': '비즈니스 건강 점수',
  'analytics.insights': 'AI 인사이트',

  // ═══════════════════════════════════════════════════════════════
  // CALCULATOR
  // ═══════════════════════════════════════════════════════════════
  'calculator.title': '손익분기점 계산기',
  'calculator.subtitle': '사업이 언제 수익성을 갖게 될지 계산하세요',
  'calculator.fixedCosts': '고정 비용',
  'calculator.variableCosts': '단위당 변동 비용',
  'calculator.pricePerUnit': '단위당 가격',
  'calculator.breakEvenPoint': '손익분기점',
  'calculator.calculate': '계산',
  'calculator.reset': '재설정',

  // ═══════════════════════════════════════════════════════════════
  // TAX CALENDAR
  // ═══════════════════════════════════════════════════════════════
  'taxCalendar.title': '세금 캘린더',
  'taxCalendar.subtitle': '중요한 세금 마감일을 놓치지 마세요',
  'taxCalendar.upcoming': '다가오는 마감일',
  'taxCalendar.past': '지난 마감일',
  'taxCalendar.addReminder': '알림 추가',
  'taxCalendar.dueDate': '마감일',

  // ═══════════════════════════════════════════════════════════════
  // NAME GENERATOR
  // ═══════════════════════════════════════════════════════════════
  'nameGenerator.title': '비즈니스 이름 생성기',
  'nameGenerator.subtitle': '사업을 위한 AI 기반 이름 제안 받기',
  'nameGenerator.generate': '이름 생성',
  'nameGenerator.generating': '이름 생성 중...',
  'nameGenerator.save': '저장',
  'nameGenerator.saved': '저장됨',
  'nameGenerator.checkAvailability': '가용성 확인',

  // ═══════════════════════════════════════════════════════════════
  // COMPETITOR MAP
  // ═══════════════════════════════════════════════════════════════
  'competitorMap.title': '경쟁사 지도',
  'competitorMap.subtitle': '지역 내 경쟁사 찾기',
  'competitorMap.search': '경쟁사 검색',
  'competitorMap.searching': '검색 중...',
  'competitorMap.noCompetitors': '이 지역에서 경쟁사를 찾을 수 없습니다',
  'competitorMap.distance': '거리',
  'competitorMap.rating': '평점',

  // ═══════════════════════════════════════════════════════════════
  // AI CHAT
  // ═══════════════════════════════════════════════════════════════
  'chat.placeholder': 'AI 공동 창업자에게 무엇이든 물어보세요...',
  'chat.send': '보내기',
  'chat.thinking': '생각 중...',
  'chat.error': '문제가 발생했습니다. 다시 시도해 주세요.',
  'chat.retry': '다시 시도',

  // ═══════════════════════════════════════════════════════════════
  // COMMON UI ELEMENTS
  // ═══════════════════════════════════════════════════════════════
  'common.loading': '로딩 중...',
  'common.error': '오류가 발생했습니다',
  'common.success': '성공',
  'common.save': '저장',
  'common.cancel': '취소',
  'common.delete': '삭제',
  'common.edit': '편집',
  'common.view': '보기',
  'common.close': '닫기',
  'common.search': '검색',
  'common.searchPlaceholder': '검색...',
  'common.noResults': '결과를 찾을 수 없습니다',
  'common.retry': '다시 시도',
  'common.submit': '제출',
  'common.next': '다음',
  'common.previous': '이전',
  'common.yes': '예',
  'common.no': '아니오',
  'common.confirm': '확인',
  'common.all': '전체',
  'common.none': '없음',
  'common.filter': '필터',
  'common.sort': '정렬',
  'common.export': '내보내기',
  'common.import': '가져오기',
  'common.download': '다운로드',
  'common.upload': '업로드',
  'common.required': '필수',
  'common.optional': '선택',
  'common.select': '선택...',
  'common.back': '뒤로',
  'common.skip': '건너뛰기',
  'common.preferNotToSay': '답변하지 않겠습니다',

  // ═══════════════════════════════════════════════════════════════
  // ERROR MESSAGES
  // ═══════════════════════════════════════════════════════════════
  'error.generic': '문제가 발생했습니다. 다시 시도해 주세요.',
  'error.network': '네트워크 오류입니다. 연결을 확인해 주세요.',
  'error.notFound': '찾을 수 없습니다.',
  'error.unauthorized': '계속하려면 로그인해 주세요.',
  'error.validation': '입력을 확인해 주세요.',
  'error.required': '이 필드는 필수입니다.',
  'error.invalidEmail': '유효한 이메일 주소를 입력해 주세요.',
  'error.tryAgain': '다시 시도해 주세요.',

  // ═══════════════════════════════════════════════════════════════
  // SUCCESS MESSAGES
  // ═══════════════════════════════════════════════════════════════
  'success.saved': '저장되었습니다.',
  'success.deleted': '삭제되었습니다.',
  'success.updated': '업데이트되었습니다.',
  'success.created': '생성되었습니다.',
  'success.sent': '전송되었습니다.',

  // ═══════════════════════════════════════════════════════════════
  // PROVINCES
  // ═══════════════════════════════════════════════════════════════
  'province.on': '온타리오',
  'province.bc': '브리티시컬럼비아',
  'province.ab': '앨버타',
  'province.qc': '퀘벡',
  'province.mb': '매니토바',
  'province.sk': '서스캐처원',
  'province.ns': '노바스코샤',
  'province.nb': '뉴브런즈윅',
  'province.nl': '뉴펀들랜드 래브라도',
  'province.pe': '프린스에드워드아일랜드',
  'province.nt': '노스웨스트 준주',
  'province.yt': '유콘',
  'province.nu': '누나부트',
}
