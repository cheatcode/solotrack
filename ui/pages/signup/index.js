import joystick, { accounts } from '@joystick.js/ui-canary';
import { password_input } from '../../../lib/mod.esm.min.js';
import toasts from '../../../lib/toasts.js';

const Signup = joystick.component({
  lifecycle: {
    on_mount: () => {
      password_input();
    },
  },
  css: {
    min: {
      width: {
        0: `
          .signup {
            max-width: 450px;
            margin: 40px auto;
          }

          .signup > header {
            text-align: center;
            margin-bottom: 40px;
          }

          .signup > header img {
            display: inline-block;
            height: 26px;
            margin-bottom: 10px;
          }

          .signup > header h1 {
            font-size: 24px;
          }
        `,
        1040: `
          .signup {
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
          first_name: {
            required: true,
          },
          last_name: {
            required: true,
          },
          email_address: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            min_length: 8,
          }
        },
        messages: {
          first_name: {
            required: instance.i18n('signup.validation.first_name_required'),
          },
          last_name: {
            required: instance.i18n('signup.validation.last_name_required'),
          },
          email_address: {
            required: instance.i18n('signup.validation.email_address_required'),
            email: instance.i18n('signup.validation.email_address_invalid'),
          },
          password: {
            required: instance.i18n('signup.validation.password_required'),
            min_length: instance.i18n('signup.validation.password_min_length'),
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
        accounts.signup({
          email_address: event.target.email_address.value,
          password: event.target.password.value,
          metadata: {
            name: {
              first: event.target.first_name.value,
              last: event.target.last_name.value,
            },
          },
        }).then(() => {
          location.pathname = '/projects';
        }).catch(({ errors }) => {
          toasts.danger({
            icon: 'user',
            title: instance.i18n('signup.error_toast.title'),
            message: errors?.[0]?.message,
          });
        });
      });
    },
  },
  render: ({ props, state, data, each, when, methods, i18n }) => {
    return `
      <div class="signup">
        <header>
          <img src="/logo_${props?.theme}.svg" alt="${i18n('signup.logo_alt')}" />
          <h1>${i18n('signup.title')}</h1>
          <p>${i18n('signup.already_have_account')} <a href="/login">${i18n('signup.log_in')}</a>.</p>
        </header>
        <form>
          <div class="mod-form-input">
            <div class="mod-grid">
              <div class="mod-grid-row">
                <div class="mod-grid-column-6">
                  <label class="mod-input-label">${i18n('signup.first_name_label')}</label>
                  <input type="text" class="mod-input" name="first_name" placeholder="${i18n('signup.first_name_placeholder')}" />
                </div>
                <div class="mod-grid-column-6">
                  <label class="mod-input-label">${i18n('signup.last_name_label')}</label>
                  <input type="text" class="mod-input" name="last_name" placeholder="${i18n('signup.last_name_placeholder')}" />
                </div>
              </div>
            </div>
          </div>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('signup.email_address_label')}</label>
            <input type="email" class="mod-input" name="email_address" placeholder="${i18n('signup.email_address_placeholder')}" />
          </div>
          <div class="mod-form-input">
            <label class="mod-input-label">${i18n('signup.password_label')}</label>
            <div class="mod-password-input-show-hide">
              <input type="password" class="mod-input" name="password" placeholder="${i18n('signup.password_placeholder')}" />
              <i class="mod-icon-eye"></i>
            </div>
            <p class="mod-input-hint">${i18n('signup.password_hint')}</p>
          </div>
          <button type="submit" class="mod-button mod-button-brand mod-button-block mod-margin-top-20">${i18n('signup.create_account_button')}</button>
        </form>
      </div>
    `;
  },
});

export default Signup;
