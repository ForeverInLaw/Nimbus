import { z } from 'zod';

/**
 * User Role Enum
 */
export const userRoles = ['user', 'admin'];

/**
 * Login Schema
 */
export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(50, 'Username must be less than 50 characters'),
  
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
});

/**
 * User Schema for creation
 */
export const createUserSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
  role: z.enum(userRoles, {
    errorMap: () => ({ message: 'Role must be either user or admin' }),
  }).default('user'),
  
  apiKey: z.string().optional(),
});

/**
 * User Schema for updates
 */
export const updateUserSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores')
    .optional(),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .optional(),
  
  role: z.enum(userRoles).optional(),
  
  apiKey: z.string().optional(),
});

/**
 * Full User Schema (includes server-generated fields)
 */
export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  role: z.enum(userRoles),
  apiKey: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/**
 * User Filter Schema
 */
export const userFilterSchema = z.object({
  role: z.enum([...userRoles, 'all']).optional(),
  search: z.string().optional(),
});
