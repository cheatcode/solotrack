import joystick, { accounts } from '@joystick.js/ui';
import Cookies from 'js-cookie';
import { navigation_bar } from '../../../lib/mod.esm.min.js';

const AppNavigation = joystick.component({
  lifecycle: {
    on_render: () => {
      navigation_bar('app-style-1');
    },
  },
  css: {
    min: {
      width: {
        0: `
          .mod-navigation-bar-app-style-1 {
            margin-bottom: 20px;
          }
        `,
        740: `
          .mod-navigation-bar-app-style-1 {
            margin-bottom: 30px;
          }
        `,
      },
    }
  },
  events: {
    'click .logout': async (event = {}, instance = {}) => {
      await accounts.logout();
      location.pathname = '/';
    },
    'change [name="theme"]': (event = {}, instance = {}) => {
      event.stopPropagation();
      event.preventDefault();
      Cookies.set('theme', event.currentTarget.checked ? 'dark' : 'light');
      location.reload();
    },
  },
  render: ({ props, state, data, each, when, user, methods, i18n }) => {
    return `
      <nav class="mod-navigation-bar-app-style-1">
        <div class="mod-navigation-bar-container">
          <a style="height: 20px;" class="mod-navigation-bar-logo" href="#">
            <img src="/logo_${props?.theme}.svg" alt="${i18n('app_navigation.logo.alt')}" />
          </a>
          ${when(user, () => `
            <div class="mod-navigation-bar-items">
              <ul>
                <li><a href="/projects">${i18n('app_navigation.links.projects')}</a></li>
              </ul>
              <div class="mod-navigation-bar-user">
                <div class="mod-navigation-bar-user-info">
                  <p>${user?.name?.first} ${user?.name?.last} <i class="mod-icon-chevron-right"></i></p>
                </div>
                <div class="mod-dropdown">
                  <section class="mod-dropdown-section">
                    <ul>
                      <li><a href="/profile"><i class="mod-icon-user"></i> ${i18n('app_navigation.user_menu.profile')} <span class="mod-dropdown-action"><i class="mod-icon-command"></i>P</span></a></li>
                      <li>
                        <a href="#"><i class="mod-icon-moon"></i> ${i18n('app_navigation.user_menu.dark_mode')}
                          <span class="mod-dropdown-action">
                            <div class="mod-toggle-switch">
                              <input type="checkbox" name="theme" ${props?.theme === 'dark' ? 'checked="true"' : ''} />
                              <div class="mod-toggle-switch-handle"></div>
                            </div>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </section>
                  <ul>
                    <li class="logout">${i18n('app_navigation.user_menu.logout')} <span class="mod-dropdown-action"><i class="mod-icon-command"></i>L</span></li>
                  </ul>        
                </div>      
              </div>
            </div>            
          `)}
          <i class="mod-icon-menu"></i>
        </div>
      </nav>
    `;
  },
});

export default AppNavigation;
