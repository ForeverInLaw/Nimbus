import { z } from 'zod';

/**
 * DNS Record Type Enum
 */
export const dnsRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV'];

/**
 * Location Schema
 */
export const locationSchema = z.object({
  country: z.string()
    .min(2, 'Country code must be at least 2 characters')
    .max(2, 'Country code must be 2 characters')
    .toUpperCase(),
  
  region: z.string()
    .min(1, 'Region is required')
    .max(100, 'Region must be less than 100 characters'),
  
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
});

/**
 * GeoDNS Schema for creation
 */
export const createGeoDnsSchema = z.object({
  domain: z.string()
    .min(1, 'Domain is required')
    .max(255, 'Domain must be less than 255 characters')
    .regex(
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
      'Invalid domain format'
    ),
  
  recordType: z.enum(dnsRecordTypes, {
    errorMap: () => ({ message: `Record type must be one of: ${dnsRecordTypes.join(', ')}` }),
  }),
  
  target: z.string()
    .min(1, 'Target is required')
    .max(500, 'Target must be less than 500 characters'),
  
  location: locationSchema,
  
  anycast: z.boolean().default(false),
  
  routes: z.array(z.string()).optional().default([]),
  
  agents: z.array(z.string()).optional().default([]),
});

/**
 * GeoDNS Schema for updates
 */
export const updateGeoDnsSchema = createGeoDnsSchema.partial();

/**
 * Full GeoDNS Schema (includes server-generated fields)
 */
export const geoDnsSchema = createGeoDnsSchema.extend({
  _id: z.string(),
  owner: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/**
 * GeoDNS Filter Schema
 */
export const geoDnsFilterSchema = z.object({
  recordType: z.enum([...dnsRecordTypes, 'all']).optional(),
  anycast: z.enum(['true', 'false', 'all']).optional(),
  country: z.string().optional(),
  search: z.string().optional(),
});
