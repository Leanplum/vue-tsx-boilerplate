import { Container } from 'inversify';
import { FakeUserFetcher } from './app/user/userFetcher/FakeUserFetcher';
import { UserFetcher } from './app/user/userFetcher/UserFetcher';

const container: Container = new Container();

container.bind(UserFetcher).to(FakeUserFetcher);

export { container };
