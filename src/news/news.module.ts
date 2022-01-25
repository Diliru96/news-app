import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news-v1.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsByDate, NewsByDateSchema } from './schema/news-by-date.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsByDate.name, schema: NewsByDateSchema },
    ]),
    ConfigModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
