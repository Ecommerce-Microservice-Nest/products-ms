import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule],
})
export class ProductsModule {}
