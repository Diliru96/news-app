import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { NewsByDate } from './schema/news-by-date.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsByDate.name)
    private newsByDateModel: Model<NewsByDate>,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(NewsService.name);

  /** Cron job to get latest trending news from News API each day at 6 am */
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async getTrendingNews() {
    const apiKey = this.configService.get('NEWS_API_KEY');
    const formattedDate = format(new Date(), 'yyyy-MM-dd');
    const url = `http://newsapi.org/v2/everything?q=rich&from=${formattedDate}&sortBy=publishedAt&apiKey=${apiKey}`;
    const todayNews = await axios.get(url);
    const createdNews = new this.newsByDateModel(todayNews.data);
    await createdNews.save();
    this.logger.log(
      `${format(new Date(), 'yyyy-MM-dd')} news fetched successfully`,
    );
  }

  /** Get Latest trending articles of the day from database */
  async getTodayNews(): Promise<NewsByDate> {
    return this.newsByDateModel.findOne().sort({ createdAt: -1 });
  }
}
