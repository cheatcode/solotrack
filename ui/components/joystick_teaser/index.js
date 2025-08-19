import joystick from "@joystick.js/ui";

const JoystickTeaser = joystick.component({
  css: {
    min: {
      width: {
        0: `
          .joystick-teaser {
            background: #f5f5f5;
            padding: 30px;
            border-radius: 10px;
            margin-top: 40px;
            text-align: left;
          }

          .joystick-teaser > img {
            height: 25px;
            display: inline-block;
            margin-bottom: 10px;
          }
          
          .joystick-teaser > p {
            font-size: 15px;
            line-height: 23px;
            margin-bottom: 20px;
            color: var(--mod-neutral-3);
          }
        `,
        1040: `
          .joystick-teaser {
            position: fixed;
            right: 20px;
            bottom: 20px;
            max-width: 425px;
          }
        `,
      },
    }
  },
  render: ({ props }) => {
    return `
      <div class="joystick-teaser">
        <img src="/joystick_logo_${props?.theme}.svg" alt="Joystick" />
        <p><strong>This is a demo app built with Joystick, the JavaScript framework for SaaS apps</strong>—Building your own SaaS? Tired of time-wasting tools and frustrating frameworks?</p>
        <a href="https://cheatcode.co/joystick?utm_source=solotrack&utm_medium=demo&utm_campaign=solotrack" class="mod-button mod-button-brand mod-button-block mod-button-icon-prefixed"><i class="mod-icon-rocket"></i> Test Drive Joystick</a>
      </div>
    `;
  },
});

export default JoystickTeaser;
