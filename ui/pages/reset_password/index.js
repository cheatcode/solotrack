import joystick, { accounts } from '@joystick.js/ui-canary';
import { password_input } from '../../../lib/mod.esm.min.js';
import toasts from '../../../lib/toasts.js';

const ResetPassword = joystick.component({
  lifecycle: {
    on_mount: () => {
      password_input();
    },
  },
  css: {
    min: {
      width: {
        0: `
          .reset-password {
            max-width: 450px;
            margin: 40px auto;
          }

          .reset-password > header {
            text-align: center;
            margin-bottom: 40px;
          }

          .reset-password > header img {
            display: inline-block;
            height: 26px;
            margin-bottom: 10px;
          }

          .reset-password > header h1 {
            font-size: 24px;
          }
        `,
        1040: `
          .reset-password {
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
          new_password: {
            required: true,
            min_length: 8,
          },
          repeat_new_password: {
            required: true,
            matches: (value, form) => {
              return value === form.querySelector('[name="new_password"]').value;
            },
          },
        },
        messages: {
          new_password: {
            required: instance.i18n('reset_password.validation.new_password_required'),
            min_length: instance.i18n('reset_password.validation.new_password_min_length'),
          },
          repeat_new_password: {
            required: instance.i18n('reset_password.validation.repeat_new_password_required'),
            matches: instance.i18n('reset_password.validation.passwords_must_match'),
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
        accounts.reset_password({
          token: instance?.url?.params?.token,
          password: event.target.new_password.value,
        }).then(() => {
          location.pathname = '/projects';
        }).catch(({ errors }) => {
          toasts.danger({
            icon: 'user',
            title: instance.i18n('reset_password.error_toast.title'),
            message: errors?.[0]?.message,
          });
        });
      });
    },
  },
  render: ({ props, state, data, each, when, methods, i18n }) => {
    return `
      <div class="reset-password">
        <header>
          <img src="/logo_${props?.theme}.svg" alt="${i18n('reset_password.logo_alt')}" />
          <h1>${i18n('reset_password.title')}</h1>
        </header>
        <form>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('reset_password.new_password_label')}</label>
            <div class="mod-password-input-show-hide">
              <input type="password" class="mod-input" name="new_password" placeholder="${i18n('reset_password.new_password_placeholder')}" />
              <i class="mod-icon-eye"></i>
            </div>
          </div>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('reset_password.repeat_new_password_label')}</label>
            <div class="mod-password-input-show-hide">
              <input type="password" class="mod-input" name="repeat_new_password" placeholder="${i18n('reset_password.repeat_new_password_placeholder')}" />
              <i class="mod-icon-eye"></i>
            </div>
          </div>
          <button type="submit" class="mod-button mod-button-brand mod-button-block mod-margin-top-20">${i18n('reset_password.reset_password_button')}</button>
        </form>
      </div>
    `;
  },
});

export default ResetPassword;
