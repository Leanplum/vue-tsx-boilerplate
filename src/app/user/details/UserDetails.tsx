import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { User } from '../../../proto';

@Component
export default class UserDetails extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  user!: User;

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  get showVerifyLink(): boolean {
    return !this.user.isEmailVerified;
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.user.firstName}!</h1>
        <pre>{`
Full Name: ${this.fullName}
Email Address: ${this.user.email}
        `}</pre>
        {this.showVerifyLink ? (
          <div>
            <button>Verify your email</button>
          </div>
        ) : null}
      </div>
    );
  }
}
