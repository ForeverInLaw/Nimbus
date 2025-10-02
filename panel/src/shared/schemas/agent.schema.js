import { z } from 'zod';

/**
 * Agent Capabilities Schema
 */
export const capabilitiesSchema = z.object({
  http: z.boolean().default(false),
  https: z.boolean().default(false),
  tcp: z.boolean().default(false),
  udp: z.boolean().default(false),
  dns: z.boolean().default(false),
});

/**
 * Agent Schema for creation
 */
export const createAgentSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Name can only contain letters, numbers, hyphens, and underscores'),
  
  ip: z.string()
    .min(1, 'IP address is required')
    .regex(
      /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
      'Invalid IPv4 address'
    ),
  
  port: z.coerce.number()
    .int('Port must be an integer')
    .min(1, 'Port must be at least 1')
    .max(65535, 'Port must be at most 65535'),
  
  capabilities: capabilitiesSchema,
});

/**
 * Agent Schema for updates
 */
export const updateAgentSchema = createAgentSchema.partial();

/**
 * Full Agent Schema (includes server-generated fields)
 */
export const agentSchema = createAgentSchema.extend({
  _id: z.string(),
  status: z.enum(['connected', 'disconnected']).default('disconnected'),
  lastHeartbeat: z.coerce.date(),
  owner: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/**
 * Agent Filter Schema
 */
export const agentFilterSchema = z.object({
  status: z.enum(['connected', 'disconnected', 'all']).optional(),
  capability: z.enum(['http', 'https', 'tcp', 'udp', 'dns', 'all']).optional(),
  search: z.string().optional(),
});
