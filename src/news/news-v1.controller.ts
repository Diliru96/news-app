import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsByDate } from './schema/news-by-date.schema';

@Controller({ path: 'news', version: '1' })
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  /**
   * Get latest trending news
   * @returns Latest Trending News Object
   */
  @Get()
  async getNews(): Promise<NewsByDate> {
    return this.newsService.getTodayNews();
  }
}
