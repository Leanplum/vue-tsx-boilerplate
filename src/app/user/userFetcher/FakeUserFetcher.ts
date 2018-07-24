import { injectable } from 'inversify';
import { User } from '../../../proto';
import { UserFetcher } from './UserFetcher';

@injectable()
class FakeUserFetcher implements UserFetcher {
  async fetch(userId: string): Promise<User> {
    return new Promise<User>(
      (resolve: (user: User) => void): void => {
        setTimeout((): void => {
          resolve(
            new User({
              id: userId,
              firstName: 'Sanket',
              lastName: 'Parab',
              email: 'sanket@leanplum.com',
              isEmailVerified: false
            })
          );
        }, 1000);
      }
    );
  }
}

export { FakeUserFetcher };
