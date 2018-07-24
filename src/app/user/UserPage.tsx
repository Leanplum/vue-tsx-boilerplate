import { Container } from 'inversify';
import Vue, { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { User } from '../../proto';
import UserDetails from './details/UserDetails';
import { UserFetcher } from './userFetcher/UserFetcher';

@Component({
  inject: ['container']
})
class UserPage extends Vue {
  @Prop({
    type: String,
    required: true
  })
  userId!: string;

  container!: Container;

  user: User | null = null;

  async created(): Promise<void> {
    try {
      this.user = await this.container.get<UserFetcher>(UserFetcher).fetch(this.userId);
    } catch (_e) {
      this.$emit('notFound');
    }
  }

  render(): VNode | null {
    if (!this.user) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <UserDetails user={this.user} />
      </div>
    );
  }
}

export { UserPage };
