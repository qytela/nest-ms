import { ConsumerConfig, KafkaConfig } from 'kafkajs';
import { uuid } from 'uuidv4';

const { KAFKA_ANONYMOUS, KAFKA_BROKERS, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env;

const IS_KAFKA_ANONYMOUS = KAFKA_ANONYMOUS == 'true';

interface IOptions {
  clientId?: string | undefined;
  groupId: string;
  uniqueGroupId?: boolean;
}

export class ClientKafkaOpts {
  private clientId: string | undefined;
  private groupId: string;
  private uniqueGroupId: boolean;

  constructor(options: IOptions) {
    this.clientId = options.clientId;
    this.groupId = options.groupId;
    this.uniqueGroupId = options.uniqueGroupId ?? true;
  }

  getOptions(): Record<string, any> {
    let options = {
      client: <KafkaConfig>{
        ...(this.clientId && { clientId: this.clientId }),
        brokers: () => (KAFKA_BROKERS as string).split(','),
        ...(!IS_KAFKA_ANONYMOUS && {
          sasl: {
            mechanism: 'plain',
            username: KAFKA_USERNAME,
            password: KAFKA_PASSWORD,
          },
        }),
      },
      consumer: <ConsumerConfig>{},
    };

    if (this.uniqueGroupId) {
      options.consumer = {
        groupId: `${this.groupId}-${uuid()}`,
      };
    } else {
      options.consumer = {
        groupId: this.groupId,
      };
    }

    return options;
  }
}
