import { z } from 'zod';

/**
 * Route Protocol Enum
 */
export const routeProtocols = ['http', 'https', 'tcp', 'udp'];

/**
 * Route Schema for creation
 */
export const createRouteSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  source: z.string()
    .min(1, 'Source is required')
    .max(500, 'Source must be less than 500 characters'),
  
  destination: z.string()
    .min(1, 'Destination is required')
    .max(500, 'Destination must be less than 500 characters'),
  
  protocol: z.enum(routeProtocols, {
    errorMap: () => ({ message: 'Protocol must be one of: http, https, tcp, udp' }),
  }),
  
  agents: z.array(z.string())
    .min(1, 'At least one agent is required')
    .max(50, 'Maximum 50 agents allowed'),
  
  rules: z.array(z.string()).optional().default([]),
});

/**
 * Route Schema for updates
 */
export const updateRouteSchema = createRouteSchema.partial().required({ agents: true });

/**
 * Full Route Schema (includes server-generated fields)
 */
export const routeSchema = createRouteSchema.extend({
  _id: z.string(),
  owner: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/**
 * Route Filter Schema
 */
export const routeFilterSchema = z.object({
  protocol: z.enum([...routeProtocols, 'all']).optional(),
  agent: z.string().optional(),
  search: z.string().optional(),
});
