import UserDetails from './UserDetails';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { User } from '../../../proto';

describe('UserDetails', (): void => {
  it('should render using all the props', (): void => {
    const userDetails: Wrapper<UserDetails> = shallowMount(UserDetails, {
      propsData: {
        user: new User({
          id: '1234',
          firstName: 'Sanket',
          lastName: 'Parab',
          email: 'sanket@leanplum.com',
          isEmailVerified: false
        })
      }
    });

    expect(userDetails.contains(UserDetails)).toBeTruthy();
  });
});
