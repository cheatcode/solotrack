import joystick, { set } from '@joystick.js/ui-canary';
import { password_input } from '../../../lib/mod.esm.min.js';
import toasts from '../../../lib/toasts.js';

const Profile = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      profile: await api.get('profile')
    };
  },
  state: {},
  lifecycle: {
    on_render: () => {
      password_input();
    }
  },
  css: {
    min: {
      width: {
        0: ({ props }) => `
          .profile {
            max-width: 700px;
            margin: 0 auto;
            padding: 20px 0 40px;
          }

          .profile > header {
            margin-bottom: 40px;
          }

          .profile-section {
            border: 1px solid ${props?.theme === 'light' ? 'var(--mod-neutral-e)' : '#000'};
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.03);
          }

          .profile-section:not(:last-child) {
            margin-bottom: 40px;
          }

          .profile-section > header {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            border-bottom: 1px solid ${props?.theme === 'light' ? 'var(--mod-neutral-e)' : '#000'};
          }

          .profile-section > header > h2 {
            font-size: 15px;
            font-weight: 500;
          }

          .profile-section > header > p {
            margin-left: auto;
            display: flex;
            align-items: center;
          }

          .profile-section > header > p i {
            margin-left: 5px;
            position: relative;
            top: 1px;
          }

          .profile-section > .profile-section-body {
            padding: 20px;
          }
        `,
      },
    },
  },
  events: {
    'submit form.account': (event = {}, instance = {}) => {
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
        },
        messages: {
          first_name: {
            required: 'First name is required.',
          },
          last_name: {
            required: 'Last name is required.',
          },
          email_address: {
            required: 'Email address is required.',
            email: 'Must be a valid email address.',
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
        set('update_profile', {
          input: {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email_address: event.target.email_address.value,
          },
        });
      }).then(() => {
        toasts.success({
          title: 'Update Profile',
          message: 'Profile successfully updated!',
        });
        
        setTimeout(() => {
          // NOTE: Cheap way to refetch the user at the app layout level.
          location.reload();
        }, 3000);
      }).catch(({ errors }) => {
        toasts.danger({
          title: 'Update Profile Error',
          message: errors?.[0]?.message,
        });
      });
    },
    'submit form.password': (event = {}, instance = {}) => {
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
            required: 'New password is required.',
            min_length: 'Must use at least 8 characters.',
          },
          repeat_new_password: {
            required: 'Must repeat new password.',
            matches: 'Passwords must match.',
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
        set('change_password', {
          input: {
            new_password: event.target.new_password.value,
          },
        });
      }).then(() => {
        toasts.success({
          title: 'Change Password',
          message: 'Password successfully changed!',
        });
      }).catch(({ errors }) => {
        toasts.danger({
          title: 'Change Password Error',
          message: errors?.[0]?.message,
        });
      });
    },
  },
  render: ({ data }) => {
    return `
      <div class="profile">
        <section class="profile-section">
          <header>
            <h2>Account</h2>
          </header>
          <div class="profile-section-body">
            <form class="account">
              <div class="mod-form-input">
                <div class="mod-grid">
                  <div class="mod-grid-row">
                    <div class="mod-grid-column-6">
                      <label class="mod-input-label">First Name</label>
                      <input type="text" class="mod-input" name="first_name" placeholder="First Name" value="${data?.profile?.name?.first || ''}" />
                    </div>
                    <div class="mod-grid-column-6">
                      <label class="mod-input-label">Last Name</label>
                      <input type="text" class="mod-input" name="last_name" placeholder="Last Name" value="${data?.profile?.name?.last || ''}" />
                    </div>
                  </div>
                </div>
              </div>            
              <div class="mod-form-input">
                <label class="mod-input-label">Email Address</label>
                <input type="email" class="mod-input" name="email_address" placeholder="Email Address" value="${data?.profile?.emailAddress || ''}" />
              </div>
              <button class="mod-button mod-button-brand mod-margin-top-10">Save Profile</button>
            </form>
          </div>
        </section>
        <section class="profile-section">
          <header>
            <h2>Password</h2>
          </header>
          <div class="profile-section-body">    
            <form class="password">  
              <div class="mod-form-input">
                <label class="mod-input-label">New Password</label>
                <div class="mod-password-input-show-hide">
                  <input type="password" class="mod-input" name="new_password" placeholder="New Password" />
                  <i class="mod-icon-eye"></i>
                </div>
              </div>
              <div class="mod-form-input">
                <label class="mod-input-label">Repeat New Password</label>
                <div class="mod-password-input-show-hide">
                  <input type="password" class="mod-input" name="repeat_new_password" placeholder="Repeat New Password" />
                  <i class="mod-icon-eye"></i>
                </div>
              </div>
              <button class="mod-button mod-button-brand mod-margin-top-10">Change Password</button>
            </form>
          </div>
        </section>
      </div>
    `;
  },
});

export default Profile;