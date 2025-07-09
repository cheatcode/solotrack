import joystick from '@joystick.js/ui-canary';

const Index = joystick.component({
  css: {
    min: {
      width: {
        0: `
        `,
      },
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div>
      </div>
    `;
  },
});

export default Index;