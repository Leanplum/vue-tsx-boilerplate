import { injectable } from 'inversify';
import { User } from '../../../proto';

@injectable()
abstract class UserFetcher {
  abstract async fetch(userId: string): Promise<User>;
}

export { UserFetcher };
