import joystick, { get } from '@joystick.js/ui-canary';
import NewProjectModal from '../../components/new_project_modal/index.js';
import { modal } from '../../../lib/mod.esm.min.js';
import debounce from '../../../lib/debounce.js';

const Projects = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      projects: await api.get('projects')
    };
  },
  state: {
    search: '',
    search_results: [],
  },
  css: {
    min: {
      width: {
        0: ({ props }) => `
          .projects > header {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
          }

          .projects .projects-list li:not(:last-child) {
            margin-bottom: 10px;
          }

          .projects .projects-list li {
            display: flex;
            flex-direction: column;
            border: 1px solid ${props?.theme === 'light' ? 'var(--mod-neutral-e)' : '#000'};
            padding: 20px;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
          }

          .projects .projects-list li > a {
            position: absolute;
            z-index: 2;
            inset: 0;
          }

          .projects .projects-list li h2 {
            font-size: 15px;
            line-height: 15px;
            font-weight: 500;
            margin: 0;
          }

          .projects .projects-list li p {
            font-size: 15px;
            line-height: 15px;
            margin: 9px 0 0;
            color: var(--mod-neutral-8);
          }

          .projects .projects-list li:hover h2 {
            color: var(--mod-brand);
          }
        `,
        740: `
          .projects > header {
            flex-direction: row;
            gap: 20px;
            margin-bottom: 40px;
          }    

          .projects > header .mod-search-input {
            max-width: 300px;
          }

          .projects > header .mod-button {
            margin-left: auto;
          }
            
          .projects .projects-list li {
            flex-direction: row;
          }

          .projects .projects-list li h2 {
            margin: 0;
          }

          .projects .projects-list li p {
            margin: 0 0 0 auto;
          }          
        `,
      },
    },
  },
  events: {
    'keyup [name="search"]': (event = {}, instance = {}) => {
      instance.set_state({ search: event.target.value }, () => {
        debounce(() => {
          get('search_projects', {
            input: {
              query: event.target.value,
            },
          }).then((search_results = []) => {
            instance.set_state({ search_results });
          }).catch(({ errors }) => {
            toasts.danger({
              title: 'Search Projects Error',
              message: errors?.[0]?.message,
            });
          });
        }, 250);
      });
    },    
    'click .new-project': (event = {}, instance = {}) => {
      modal('new_project').open();
    },
  },
  render: ({ component, data, each, when, i18n, state }) => {
    const projects_to_render = state?.search ? state?.search_results : data?.projects;

    return `
      <div class="projects">
        <header>
          <div class="mod-search-input">
            <i class="mod-icon-search"></i>
            <input type="text" class="mod-input" name="search" placeholder="${i18n('projects.header.search.placeholder')}" />
          </div>
          <button class="mod-button mod-button-brand new-project">${i18n('projects.header.action.label')}</button>
        </header>
        ${when(projects_to_render?.length > 0, () => `
          <ul class="projects-list">
            ${each(projects_to_render, (project = {}) => `
              <li>
                <a href="/projects/${project?._id}"></a>
                <h2>${project?.name}</h2>
                <p>No current tasks</p>
              </li>
            `)}
          </ul>
        `)}
        ${when(!state?.search && projects_to_render?.length === 0, () => `
          <div class="mod-blank-state-dashed">
            <div class="mod-blank-state-dashed-icon">
              <i class="mod-icon-briefcase-business"></i>
            </div>
            <h2 class="mod-blank-state-dashed-title">${i18n('projects.blank_state.no_projects.title')}</h2>
            <p class="mod-blank-state-dashed-subtitle">${i18n('projects.blank_state.no_projects.subtitle')}</p>
            <div class="mod-blank-state-dashed-actions">
              <button class="mod-button mod-button-brand new-project">${i18n('projects.blank_state.no_projects.action.label')}</button>
            </div>
          </div>  
        `)}
        ${component(NewProjectModal)}
      </div>
    `;
  },
});

export default Projects;
