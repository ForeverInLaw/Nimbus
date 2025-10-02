import { z } from 'zod';

/**
 * Rule Type Enum
 */
export const ruleTypes = ['http', 'https', 'tcp', 'udp', 'dns'];

/**
 * Rule Action Enum
 */
export const ruleActions = ['proxy', 'redirect', 'block'];

/**
 * Rule Schema for creation
 */
export const createRuleSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  type: z.enum(ruleTypes, {
    errorMap: () => ({ message: 'Type must be one of: http, https, tcp, udp, dns' }),
  }),
  
  match: z.string()
    .min(1, 'Match pattern is required')
    .max(500, 'Match pattern must be less than 500 characters'),
  
  action: z.enum(ruleActions, {
    errorMap: () => ({ message: 'Action must be one of: proxy, redirect, block' }),
  }),
  
  target: z.string()
    .min(1, 'Target is required')
    .max(500, 'Target must be less than 500 characters'),
  
  agent: z.string()
    .min(1, 'Agent is required'),
});

/**
 * Rule Schema for updates
 */
export const updateRuleSchema = createRuleSchema.partial().required({ agent: true });

/**
 * Full Rule Schema (includes server-generated fields)
 */
export const ruleSchema = createRuleSchema.extend({
  _id: z.string(),
  owner: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/**
 * Rule Filter Schema
 */
export const ruleFilterSchema = z.object({
  type: z.enum([...ruleTypes, 'all']).optional(),
  action: z.enum([...ruleActions, 'all']).optional(),
  agent: z.string().optional(),
  search: z.string().optional(),
});
