import joystick from "@joystick.js/ui-canary";

const Account = joystick.component({
  render: ({ props, component }) => {
    return `
      <div class="account">
        <div class="mod-container">
          ${component(props.page, props)}
        </div>
      </div>
    `;
  },
});

export default Account;
