import { style } from 'typestyle';
import Vue, { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

const containerStyle: string = style({
  $debugName: 'basePage',
  padding: 20
});

const navStyle: string = style({
  $debugName: 'nav',
  margin: '20px 0 40px'
});

const navItemStyle: string = style({
  $debugName: 'navItem',
  marginRight: 12
});

@Component
class BasePage extends Vue {
  render(): VNode {
    return (
      <div class={containerStyle}>
        <div class={navStyle}>
          <router-link class={navItemStyle} to="/">
            Home
          </router-link>
          <router-link class={navItemStyle} to="/1234">
            User Details
          </router-link>
        </div>
        <div>
          <router-view />
        </div>
      </div>
    );
  }
}

export { BasePage };
