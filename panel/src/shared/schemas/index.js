/**
 * Central export for all schemas
 */

// Agent schemas
export {
  capabilitiesSchema,
  createAgentSchema,
  updateAgentSchema,
  agentSchema,
  agentFilterSchema,
} from './agent.schema';

// Rule schemas
export {
  ruleTypes,
  ruleActions,
  createRuleSchema,
  updateRuleSchema,
  ruleSchema,
  ruleFilterSchema,
} from './rule.schema';

// Route schemas
export {
  routeProtocols,
  createRouteSchema,
  updateRouteSchema,
  routeSchema,
  routeFilterSchema,
} from './route.schema';

// GeoDNS schemas
export {
  dnsRecordTypes,
  locationSchema,
  createGeoDnsSchema,
  updateGeoDnsSchema,
  geoDnsSchema,
  geoDnsFilterSchema,
} from './geodns.schema';

// User schemas
export {
  userRoles,
  loginSchema,
  createUserSchema,
  updateUserSchema,
  userSchema,
  userFilterSchema,
} from './user.schema';
