// Web stand-in for react-native-purchases (RevenueCat).
// The demo treats Nyxo Coaching as already purchased so the coaching program
// is unlocked. "Buying" a package in the paywall succeeds instantly and
// nothing is charged.
const ENTITLEMENT = 'Nyxo Coaching'

const entitlement = {
  identifier: ENTITLEMENT,
  isActive: true,
  willRenew: true,
  periodType: 'NORMAL',
  latestPurchaseDate: new Date().toISOString(),
  originalPurchaseDate: new Date().toISOString(),
  expirationDate: null,
  store: 'WEB_DEMO',
  productIdentifier: 'nyxo_coaching_monthly',
  isSandbox: true
}

const purchaserInfo = {
  entitlements: {
    all: { [ENTITLEMENT]: entitlement },
    active: { [ENTITLEMENT]: entitlement }
  },
  activeSubscriptions: ['nyxo_coaching_monthly'],
  allPurchasedProductIdentifiers: ['nyxo_coaching_monthly'],
  latestExpirationDate: null,
  originalAppUserId: 'web-demo',
  requestDate: new Date().toISOString()
}

const product = (identifier, title, price, priceString) => ({
  identifier,
  description: title,
  title,
  price,
  price_string: priceString,
  currency_code: 'EUR',
  introPrice: null,
  discounts: null
})

const monthly = {
  identifier: '$rc_monthly',
  packageType: 'MONTHLY',
  offeringIdentifier: 'default',
  product: product('nyxo_coaching_monthly', 'Nyxo Coaching', 9.99, '€9.99')
}

const annual = {
  identifier: '$rc_annual',
  packageType: 'ANNUAL',
  offeringIdentifier: 'default',
  product: product('nyxo_coaching_annual', 'Nyxo Coaching', 59.99, '€59.99')
}

const offerings = {
  current: {
    identifier: 'default',
    serverDescription: 'Web demo offering',
    availablePackages: [monthly, annual],
    monthly,
    annual,
    lifetime: null,
    sixMonth: null,
    threeMonth: null,
    twoMonth: null,
    weekly: null
  },
  all: {}
}
offerings.all.default = offerings.current

const Purchases = {
  setup: () => undefined,
  setDebugLogsEnabled: () => undefined,
  addPurchaserInfoUpdateListener: () => undefined,
  removePurchaserInfoUpdateListener: () => undefined,
  addShouldPurchasePromoProductListener: () => undefined,
  removeShouldPurchasePromoProductListener: () => undefined,
  getPurchaserInfo: async () => purchaserInfo,
  getOfferings: async () => offerings,
  purchasePackage: async (pkg) => ({
    productIdentifier: pkg && pkg.product && pkg.product.identifier,
    purchaserInfo
  }),
  restoreTransactions: async () => purchaserInfo,
  identify: async () => purchaserInfo,
  reset: async () => purchaserInfo,
  setEmail: () => undefined,
  PACKAGE_TYPE: {
    MONTHLY: 'MONTHLY',
    ANNUAL: 'ANNUAL'
  }
}

export default Purchases
