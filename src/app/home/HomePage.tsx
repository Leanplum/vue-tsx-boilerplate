import Vue, { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

@Component
class HomePage extends Vue {
  render(): VNode {
    return (
      <div>
        <h1>Welcome to Leanplum's Vue TSX Boilerplate</h1>
      </div>
    );
  }
}

export { HomePage };
