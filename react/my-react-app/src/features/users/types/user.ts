import { z } from 'zod'

const geoSchema = z.object({
  lat: z.string().min(1),
  lng: z.string().min(1),
})

const addressSchema = z.object({
  street: z.string().min(1),
  suite: z.string().min(1),
  city: z.string().min(1),
  zipcode: z.string().min(1),
  geo: geoSchema,
})

const companySchema = z.object({
  name: z.string().min(1),
  catchPhrase: z.string().min(1),
  bs: z.string().min(1),
})

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.email(),
  address: addressSchema,
  phone: z.string().min(1),
  website: z.string().min(1),
  company: companySchema,
})

export const usersSchema = z.array(userSchema)

export type User = z.infer<typeof userSchema>
