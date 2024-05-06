import { SetMetadata } from '@nestjs/common';

// Public guard
export const Public = () => SetMetadata('public', true);
