import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class ClientKafkaSendMessageException extends InternalServerErrorException {
  constructor(pattern: string, error?: Error) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Client Kafka Send Message Error',
      pattern: pattern,
      exception: error ?? null,
    });
  }
}
