import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key to store roles requirement
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to specify required user roles (by systemName) on a route handler.
 * Usage: @Roles('SuperAdmin', 'TenantAdmin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
