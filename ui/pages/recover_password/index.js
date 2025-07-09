import joystick, { accounts } from '@joystick.js/ui-canary';
import toasts from '../../../lib/toasts.js';

const RecoverPassword = joystick.component({
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
        },
        messages: {
          email_address: {
            required: instance.i18n('recover_password.validation.email_address_required'),
            email: instance.i18n('recover_password.validation.email_address_invalid'),
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
        accounts.recover_password({
          email_address: event.target.email_address.value,
        }).then(() => {
          toasts.success({
            icon: 'mail',
            title: instance.i18n('recover_password.success_toast.title'),
            message: instance.i18n('recover_password.success_toast.message'),
          });
        }).catch(({ errors }) => {
          toasts.danger({
            icon: 'user',
            title: instance.i18n('recover_password.error_toast.title'),
            message: errors?.[0]?.message,
          });
        });
      });
    },
  },
  render: ({ props, state, data, each, when, methods, i18n }) => {
    return `
      <div class="login">
        <header>
          <img src="/logo_${props?.theme}.svg" alt="${i18n('recover_password.logo_alt')}" />
          <h1>${i18n('recover_password.title')}</h1>
          <p>${i18n('recover_password.remember_password')} <a href="/login">${i18n('recover_password.log_in')}</a>.</p>
        </header>
        <form>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('recover_password.email_address_label')}</label>
            <input type="email" class="mod-input" name="email_address" placeholder="${i18n('recover_password.email_address_placeholder')}" />
          </div>
          <button type="submit" class="mod-button mod-button-brand mod-button-block mod-margin-top-20">${i18n('recover_password.send_reset_link_button')}</button>
        </form>
      </div>
    `;
  },
});

export default RecoverPassword;
