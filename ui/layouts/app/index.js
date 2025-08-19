import joystick from "@joystick.js/ui";
import AppNavigation from "../../components/app_navigation/index.js";

const App = joystick.component({
  render: ({ props, component }) => {
    return `
      <div class="app">
        ${component(AppNavigation, props)}
        <div class="mod-container">
          ${component(props.page, props)}
        </div>
      </div>
    `;
  },
});

export default App;
