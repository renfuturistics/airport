import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRole } from 'src/role/role';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      // If no roles are required, allow access
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRoles = user.roles; // Assuming user.roles is an array of role objects

    // Check if the user has at least one of the required roles
    return requiredRoles.some((requiredRole) => {
      // Convert the role name to an ID

      const requiredRoleId = userRoles.find(
        (role: any) => role.name === requiredRole,
      )?._id;
      return (
        requiredRoleId &&
        userRoles.some((userRole: any) => userRole._id.equals(requiredRoleId))
      );
    });
  }
}
