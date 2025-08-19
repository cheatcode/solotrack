import joystick, { accounts } from '@joystick.js/ui';
import { password_input } from '../../../lib/mod.esm.min.js';
import toasts from '../../../lib/toasts.js';
import JoystickTeaser from '../../components/joystick_teaser/index.js';

const Login = joystick.component({
  lifecycle: {
    on_mount: () => {
      password_input();
    },
  },
  css: {
    min: {
      width: {
        0: `
          .login {
            max-width: 450px;
            margin: 40px auto;
          }

          .login > header {
            text-align: center;
            margin-bottom: 40px;
          }

          .login > header img {
            display: inline-block;
            height: 26px;
            margin-bottom: 10px;
          }

          .login > header h1 {
            font-size: 24px;
          }
        `,
        1040: `
          .login {
            margin: 60px auto;
          }
        `,
      },
    },
  },
  events: {
    'submit form': (event = {}, instance = {}) => {
      event.preventDefault();
      instance.validate_form(event.target, {
        rules: {
          email_address: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          }
        },
        messages: {
          email_address: {
            required: instance.i18n('login.validation.email_address_required'),
            email: instance.i18n('login.validation.email_address_invalid'),
          },
          password: {
            required: instance.i18n('login.validation.password_required'),
          },
        },
        on_render_error: (element = {}, message = '') => {
          const error = document.createElement('p');
          error.classList.add('mod-input-hint', 'mod-input-hint-error');
          error.setAttribute('id', `error-${element.name}`);
          error.innerText = message;
          return element?.after(error);
        },
      }).then(() => {
        accounts.login({
          email_address: event.target.email_address.value,
          password: event.target.password.value,
        }).then(() => {
          location.pathname = '/projects';
        }).catch(({ errors }) => {
          toasts.danger({
            icon: 'user',
            title: instance.i18n('login.error_toast.title'),
            message: errors?.[0]?.message,
          });
        });
      });
    },
  },
  render: ({ component, props, i18n }) => {
    return `
      <div class="login">
        <header>
          <img src="/logo_${props?.theme}.svg" alt="${i18n('login.logo_alt')}" />
          <h1>${i18n('login.title')}</h1>
          <p>${i18n('login.no_account')} <a href="/signup">${i18n('login.sign_up')}</a>.</p>
        </header>
        <form>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('login.email_address_label')}</label>
            <input type="email" class="mod-input" name="email_address" placeholder="${i18n('login.email_address_placeholder')}" />
          </div>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('login.password_label')} <a href="/recover-password">${i18n('login.forgot_password')}</a></label>
            <div class="mod-password-input-show-hide">
              <input type="password" class="mod-input" name="password" placeholder="${i18n('login.password_placeholder')}" />
              <i class="mod-icon-eye"></i>
            </div>
          </div>
          <button type="submit" class="mod-button mod-button-brand mod-button-block mod-margin-top-20">${i18n('login.log_in_button')}</button>
        </form>
        ${component(JoystickTeaser, props)}
      </div>
    `;
  },
});

export default Login;
