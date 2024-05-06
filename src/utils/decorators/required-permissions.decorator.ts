import { SetMetadata } from '@nestjs/common';

export const RequiredPermissions = (...requiredPermissionKeys: string[]) =>
  SetMetadata('required-permissions', requiredPermissionKeys);
