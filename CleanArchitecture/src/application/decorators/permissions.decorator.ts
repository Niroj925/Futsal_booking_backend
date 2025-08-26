import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key to store permissions requirement
 */
export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator to specify required permission codes on a route handler.
 * Usage: @Permissions('MANAGE_USERS', 'VIEW_REPORTS')
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
