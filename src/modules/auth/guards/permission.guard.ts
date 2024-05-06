import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { chain, difference } from 'lodash';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const requiredPermissionKeys: string[] =
      this.reflector.getAllAndOverride('required-permissions', [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!requiredPermissionKeys.length) {
      return true;
    }

    const data = req.user as Staff;
    const staffPermissionKeys = chain(data.roles)
      .flatMap<Permission>('permissions')
      .map('key')
      .value();

    const isSuperadmin = staffPermissionKeys.includes('superadmin');

    if (isSuperadmin) {
      return true;
    }

    const missingPermissions = difference(
      requiredPermissionKeys,
      staffPermissionKeys,
    );

    if (!missingPermissions.length) {
      return true;
    }

    throw new ForbiddenException('Missing Permission');
  }
}
