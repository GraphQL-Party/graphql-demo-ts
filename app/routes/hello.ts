import { Controller, Get, Param } from 'routing-controllers';
import logger from '../utils/logger';

@Controller('')
export default class HelloController {
  @Get('/hello/:id')
  helloworld (@Param('id') id: number) {
    logger.warn(id);
    return 'hello';
  }
}
