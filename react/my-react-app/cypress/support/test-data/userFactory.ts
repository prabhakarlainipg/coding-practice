import users from '../../fixtures/users.json'

export type ApiUser = (typeof users)[number]

type UserOverrides = Partial<Omit<ApiUser, 'address' | 'company'>> & {
  address?: Partial<Omit<ApiUser['address'], 'geo'>> & {
    geo?: Partial<ApiUser['address']['geo']>
  }
  company?: Partial<ApiUser['company']>
}

export function buildUser(overrides: UserOverrides = {}): ApiUser {
  const baseUser = users[0]

  return {
    ...baseUser,
    ...overrides,
    address: {
      ...baseUser.address,
      ...overrides.address,
      geo: {
        ...baseUser.address.geo,
        ...overrides.address?.geo,
      },
    },
    company: {
      ...baseUser.company,
      ...overrides.company,
    },
  }
}
