import joystick, { set } from '@joystick.js/ui-canary';
import toasts from '../../../lib/toasts.js';

const NewProjectModal = joystick.component({
  events: {
    'submit form': (event = {}, instance = {}) => {
      event.preventDefault();
      instance.validate_form(event.target, {
        rules: {
          name: {
            required: true,
          }
        },
        messages: {
          name: {
            required: 'Project name is required.',
          }
        },
        on_render_error: (element = {}, message = '') => {
          const error = document.createElement('p');
          error.classList.add('mod-input-hint', 'mod-input-hint-error');
          error.setAttribute('id', `error-${element.name}`);
          error.innerText = message;
          return element?.after(error);
        },        
      }).then(() => {
        set('create_project', {
          input: {
            name: event.target.name.value,
          },
        }).then((project_id = '') => {
          location.pathname = `/projects/${project_id}`;
        }).catch(({ errors }) => {
          toasts.danger({
            title: 'Create Project Error',
            message: errors?.[0]?.message,
          });
        });
      });
    },
  },
  render: () => {
    return `
      <div data-mod-modal="new_project" class="mod-modal">
        <div class="mod-modal-body">
          <header class="mod-modal-header">
            <p class="mod-modal-title">Create a New Project</p>
            <i data-mod-modal-close class="mod-icon-x"></i>
          </header>
          <form>
            <div class="mod-modal-content">
              <label class="mod-input-label">Project Name</label>
              <input type="text" class="mod-input" name="name" placeholder="Chores" />
            </div>
            <footer class="mod-modal-actions">
              <button type="button" data-mod-modal-close class="mod-button">Cancel</button>
              <button type="submit" class="mod-button mod-button-brand">Create Project</button>
            </footer>
          </form>
        </div>
      </div>
    `;
  },
});

export default NewProjectModal;