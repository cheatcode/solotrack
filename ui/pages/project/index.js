import joystick, { set, get } from '@joystick.js/ui-canary';
import toasts from '../../../lib/toasts.js';
import { timeago } from '../../../lib/dates.js';
import generate_pagination from '../../../lib/generate_pagination.js';
import debounce from '../../../lib/debounce.js';
import { dialog, dropdown_button } from '../../../lib/mod.esm.min.js';
import ConfirmDeleteTask from '../../components/confirm_delete_task/index.js';
import ConfirmDeleteProject from '../../components/confirm_delete_project/index.js';

const Project = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      project: await api.get('project', {
        input: {
          project_id: req?.params?.project_id,
          complete: (!input?.list || input?.list === 'todo') ? false : true,
          page: instance?.state?.page || 1,
        },
      }),
    };
  },
  state: ({ data }) => ({
    tasks: data?.project?.tasks || [],
    search: '',
    search_results: [],
    list: 'todo',
    page: 1,
  }),
  lifecycle: {
    on_render: () => {
      dropdown_button();
    },
  },
  css: {
    min: {
      width: {
        0: ({ props }) => `
          .project > footer {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            width: calc(100% - 40px);
            max-width: 1300px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
            z-index: 40;
          }

          .project > footer .mod-input {
            padding: 20px !important;
            max-height: 100%;
            font-size: 16px;
            line-height: 16px;
          }

          .project > .mod-breadcrumbs {
            margin-bottom: 15px;
          }

          .project > header > h1 {
            display: flex;
            align-items: center;
            font-size: 22px;
            margin-bottom: 20px;
          }

          .project > header > h1 .mod-dropdown-button {
            font-weight: normal;
          }

          .project > header > h1 .mod-dropdown-button .mod-button {
            padding: 0;
            background: transparent;
            border: none;
          }

          .project > header > h1 .mod-dropdown-button .mod-dropdown {
            left: 0;
            right: auto;
          }

          .project > header > h1 .mod-icon-settings {
            font-weight: 400;
            font-size: 18px;
            margin-left: 7px;
            position: relative;
            top: 1px;
            color: var(--mod-neutral-8);
          }

          .project > header > .mod-input {
            margin-bottom: 20px;
          }

          .project > header > nav {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .project > header > nav .mod-tabs-well {
            width: auto;
            align-self: flex-start;
          }                    

          .project .tasks {
            margin-top: 20px;
            padding-bottom: 120px;
          }

          .project .tasks > ul > li {
            display: flex;
            align-items: center;
            border: 1px solid ${props?.theme === 'light' ? 'var(--mod-neutral-e)' : '#000'};
            border-radius: 5px;
          }

          .project .tasks > ul > li .task-title-checkbox {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 20px;
            font-size: 15px;
          }

          .project .tasks > ul > li .task-title-checkbox .task-title {
            display: flex;
            flex-direction: column;
          }

          .project .tasks > ul > li .task-title-checkbox .task-title > ul {
            display: flex;
            gap: 7px;
            margin-left: 0;
          }

          .project .tasks > ul > li .task-title-checkbox .task-title > ul > li > a {
            display: inline-block;
            text-decoration: none;
            color: var(--mod-neutral-8);
          }
  
          .project .tasks > ul > li .task-title-checkbox .task-title > ul > li > a:hover {
            color: var(--mod-brand);
          }

          .project .tasks > ul > li .task-title-checkbox input {
            margin-right: 15px;
            width: 20px;
            min-width: 20px;
            height: 20px;
            min-height: 20px;
          }

          .project .tasks > ul > li .task-title-checkbox .task-tags {
            display: inline-flex;
            gap: 5px;
            margin: 10px 0 0 0;
          }

          .project .tasks > ul > li .task-title-checkbox .task-tags + .task-completed-at {
            margin: 10px 0 0 0;
          }

          .project .tasks > ul > li .task-title-checkbox .task-tags .mod-badge {
            align-self: center;
          }

          .project .tasks > ul > li .mod-dropdown-button {
            margin-right: 15px;
          }

          .project .tasks > ul > li .mod-dropdown-button > .mod-button {
            background: transparent;
            border: none;
            padding: 5px;
          }

          .project .tasks > ul > li:not(:last-child) {
            margin-bottom: 10px;
          }

          .project .tasks > ul > li.is-complete .task-title-checkbox {
            text-decoration: line-through;
            opacity: 0.5;
          }
        `,
        740: `
          .project > header > h1 {
            font-size: 26px;
          }     
            
          .project > header > h1 .mod-icon-settings {
            font-size: 20px;
          }         

          .project > header > nav {
            flex-direction: row;
            gap: 15px;
          }          

          .project > header > nav .mod-tabs-well {
            flex-shrink: 0;
            margin-left: auto;
          }          

          .project > header > nav .mod-search-input {
            max-width: 300px;
          }          
        `,
        1040: `
          .project > footer {
            position: fixed;
            bottom: 20px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            width: calc(100% - 80px);
          }

          .project .tasks > ul > li .task-title-checkbox .task-title {
            flex-direction: row;
            width: 100%;
          }          

          .project .tasks > ul > li .task-title-checkbox .task-title > ul {
            margin-left: 10px;
          }          

          .project .tasks > ul > li .task-title-checkbox .task-tags {
            margin: 0 0 0 auto;
          }

          .project .tasks > ul > li .task-title-checkbox .task-tags + .task-completed-at {
            margin: 0 0 0 10px;
          }

          .project .tasks > ul > li .task-title-checkbox:not(:has(.task-tags)) .task-completed-at {
            margin: 0 0 0 auto;
          }
        `,
        1280: `
          .project > footer {
            max-width: 1220px;
            width: calc(100% - 80px);
          }
        `,
        1380: `
          .project > footer {
            max-width: 1300px;
            width: calc(100% - 80px);
          }
        `,
      },
    },
  },
  events: {
    'click .edit-project-name': (event = {}, instance = {}) => {
      instance.set_state({ editing_project_name: true }, () => {
        instance.DOMNode.querySelector('[name="project_name"]').focus();
      });
    },
    'blur [name="project_name"]': (event = {}, instance = {}) => {
      set('update_project', {
        input: {
          project_id: instance?.url?.params?.project_id,
          name: event.target.value,
        },
      }).then(() => {
        instance.set_state({ editing_project_name: false }, () => {
          instance.data.refetch();
          dropdown_button();
        });
      }).catch(({ errors }) => {
        toasts.danger({
          title: instance.i18n('project.toasts.update_project_error'),
          message: errors?.[0]?.message,
        });
      });
    },
    'click .delete-project': async (event = {}, instance = {}) => {
      if (await dialog('confirm_delete_project')) {
        set('delete_project', {
          input: {
            project_id: instance?.url?.params?.project_id,
          },
        }).then(() => {
          location.pathname = '/projects';
        }).catch(({ errors }) => {
          toasts.danger({
            title: instance.i18n('project.toasts.delete_project_error'),
            message: errors?.[0]?.message,
          });
        });
      }
    },
    'keyup [name="search"]': (event = {}, instance = {}) => {
      instance.set_state({ search: event.target.value }, () => {
        debounce(() => {
          get('search_tasks', {
            input: {
              project_id: instance?.url?.params?.project_id,
              list: instance?.state?.list,
              query: event.target.value,
            },
          }).then((search_results = []) => {
            instance.set_state({ search_results });
          }).catch(({ errors }) => {
            toasts.danger({
              title: 'Search Tasks Error',
              message: errors?.[0]?.message,
            });
          });
        }, 250);
      });
    },
    'click [data-list]': (event = {}, instance = {}) => {
      const list = event.currentTarget.getAttribute('data-list');
      instance.data.refetch({ list }).then((response = {}) => {
        instance.set_state({ list, tasks: response?.project?.tasks, search: '', search_results: [] });
      });
    },
    'keyup [name="task"]': (event = {}, instance = {}) => {
      if (event.key === 'Enter') {
        set('create_task', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task: event.target.value,
          },
        }).then(() => {
          instance.data.refetch().then((response) => {
            instance.set_state({
              list: 'todo',
              search: '',
              search_results: [],
              tasks: response?.project?.tasks,
            });
          });

          event.target.value = '';

          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }).catch(({ errors }) => {
          toasts.danger({
            title: instance.i18n('project.toasts.create_post_error'),
            message: errors?.[0]?.message,
          });
        });;
      }
    },
    'change [data-task-id] [name="complete"]': (event = {}, instance = {}) => {
      const task_id = event.currentTarget.closest('[data-task-id]').getAttribute('data-task-id');
      const complete = event.currentTarget.checked;
      const updated_tasks = [...(instance?.state?.tasks || [])];
      const task_to_update = updated_tasks?.find((task) => task?._id === task_id);

      if (task_to_update) {
        task_to_update.complete = complete;
      }

      instance.set_state({ tasks: updated_tasks }, () => {
        set('update_task', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task_id,
            update: {
              complete,
            }
          },
        }).then(() => {
          // NOTE: Intentional for UX. Ensures that the "cross out" effect runs
          // against search results before refetch.
          instance.set_state({
            search_results: instance?.state?.search_results?.map((task = {}) => {
              const search_result = { ...task };
              
              if (task._id === task_id) {
                search_result.complete = complete;
              }

              return search_result;
            }),
          }, () => {
            setTimeout(() => {
              instance.data.refetch({ list: instance?.state?.list }).then((response = {}) => {
                instance.set_state({ search: '', search_results: [], tasks: response?.project?.tasks });
              });
            }, 500);
          });
        }).catch(({ errors }) => {
          toasts.danger({
            title: instance.i18n('project.toasts.update_task_error'),
            message: errors?.[0]?.message,
          });
        });
      });
    },
    'click .mod-pagination-previous': (event = {}, instance = {}) => {
      instance.set_state({ page: instance?.state?.page - 1 }, () => {
        instance.data.refetch({ list: instance?.state?.list }).then((response = {}) => {
          instance.set_state({ tasks: response?.project?.tasks });
        });
      });
    },
    'click .mod-pagination-next': (event = {}, instance = {}) => {
      instance.set_state({ page: instance?.state?.page + 1 }, () => {
        instance.data.refetch({ list: instance?.state?.list }).then((response = {}) => {
          instance.set_state({ tasks: response?.project?.tasks });
        });
      });
    },
    'click [data-page]': (event = {}, instance = {}) => {
      instance.set_state({ page: parseInt(event.currentTarget.getAttribute('data-page'), 10) }, () => {
        instance.data.refetch({ list: instance?.state?.list }).then((response = {}) => {
          instance.set_state({ tasks: response?.project?.tasks });
        });
      });
    },
    'click .delete-task': async (event = {}, instance = {}) => {
      const task_id = event.currentTarget.getAttribute('data-task-id');

      if (await dialog('confirm_delete_task')) {
        set('delete_task', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task_id,
          },
        }).then(async () => {
          instance.data.refetch({ list: instance?.state?.list }).then((response = {}) => {
            instance.set_state({
              list: 'todo',
              search: '',
              search_results: [],
              tasks: response?.project?.tasks,
            });
          });
          
          toasts.success({
            title: instance.i18n('project.toasts.delete_task'),
            message: instance.i18n('project.toasts.delete_task_success'),
          });
        }).catch(({ errors }) => {
            toasts.danger({
              title: instance.i18n('project.toasts.search_tasks_error'),
              message: errors?.[0]?.message,
            });
        });
      }
    },
  },
  render: ({ component, data, i18n, when, each, state }) => {
    const tasks_to_render = state?.search ? state?.search_results : state?.tasks;
    const todo_pagination = generate_pagination(data?.project?.totals?.todo, 20, state?.page);
    const done_pagination = generate_pagination(data?.project?.totals?.done, 20, state?.page);

    return `
      <div class="project">
        <div class="mod-breadcrumbs">
          <ol>
            <li><a href="/projects">${i18n('project.breadcrumbs.projects')}</a></li>
            <li>${data?.project?.name}</li>
          </ol>
        </div>      
        <header>
          ${when(state?.editing_project_name, () => `
            <input type="text" class="mod-input" name="project_name" placeholder="Project Name" value="${data?.project?.name}" />  
          `)}
          ${when(!state?.editing_project_name, () => `            
            <h1>${data?.project?.name} <div class="mod-dropdown-button">
              <button class="mod-button"><i class="mod-icon-settings"></i></button>
              <div class="mod-dropdown">
                <section class="mod-dropdown-section">
                  <ul>
                    <li class="edit-project-name"><a href="#"><i class="mod-icon-pencil"></i> ${i18n('project.menu.edit_name')}</a></li>
                    <li class="delete-project"><a href="#"><i class="mod-icon-trash"></i> ${i18n('project.menu.delete_project')}</a></li>
                  </ul>
                </section>      
              </div>
            </div></h1>  
          `)}
          <nav>
            <div class="mod-search-input">
              <i class="mod-icon-search"></i>
              <input type="text" class="mod-input" name="search" placeholder="${i18n('project.header.search.placeholder')}" value="${state?.search}" />
            </div>          
            <div class="mod-tabs-well">
              <ul>
                <li data-list="todo" ${state?.list === 'todo' ? 'class="is-active"' : ''}><i class="mod-icon-x"></i> ${i18n('project.tabs.todo')} <span class="mod-tabs-well-badge">${data?.project?.totals.todo}</span></li>
                <li data-list="done" ${state?.list === 'done' ? 'class="is-active"' : ''}><i class="mod-icon-check"></i> ${i18n('project.tabs.done')} <span class="mod-tabs-well-badge">${data?.project?.totals.done}</span></li>
              </ul>
            </div>          
          </nav>
        </header>
        ${when(tasks_to_render?.length > 0, () => `
          <div class="tasks">
            <ul>
              ${each(tasks_to_render, (task = {}) => `
                <li data-task-id="${task?._id}" ${task?.complete ? 'class="is-complete"' : ''}>
                  <div class="task-title-checkbox">
                    <input type="checkbox" name="complete" class="mod-input" ${task?.complete ? 'checked="true"' : ''} />
                    <span class="task-title">
                      <a href="/projects/${task?.project_id}/tasks/${task?._id}">${task?.task}</a>
                      ${when(task?.notes || task?.attachments?.length > 0, () => `
                        <ul>
                          ${when(task?.notes, () => `<li><a href="/projects/${task?.project_id}/tasks/${task?._id}"><i class="has-notes mod-icon-notebook-text"></i></a></li>`)}
                          ${when(task?.attachments?.length > 0, () => `<li><a href="/projects/${task?.project_id}/tasks/${task?._id}"><i class="has-attachments mod-icon-paperclip"></i></a></li>`)}
                        </ul>
                      `)}
                      ${when(task?.tags?.length > 0, () => `              
                        <span class="task-tags">
                          ${each(task?.tags, (tag = '') => `<span class="mod-badge">${tag}</span>`)}
                        </span>
                      `)}
                      ${when(!state?.search && task?.completed_at, () => `
                        <span class="task-completed-at">${timeago(task?.completed_at)}</span>
                      `)}
                    </span>
                  </div>
                  <div class="mod-dropdown-button">
                    <button class="mod-button"><i class="mod-icon-ellipsis"></i></button>
                    <div class="mod-dropdown">
                      <section class="mod-dropdown-section">
                        <ul>
                          <li><a href="/projects/${task?.project_id}/tasks/${task?._id}"><i class="mod-icon-pencil"></i> ${i18n('project.tasks.edit_task')}</a></li>
                          <li data-task-id="${task?._id}" class="delete-task"><a href="#"><i class="mod-icon-trash"></i> ${i18n('project.tasks.delete_task')}</a></li>
                        </ul>
                      </section>      
                    </div>
                  </div>
                </li>
              `)}
            </ul>
            ${when(!state?.search && data?.project.totals?.[state?.list] > 20, () => `            
              <div class="mod-pagination mod-margin-top-20">
                ${state?.list === 'todo' ? todo_pagination : done_pagination }
              </div>          
            `)}
          </div>
        `)}
        ${when(!state?.search && data?.project?.tasks?.length === 0, () => `
          <div class="mod-blank-state-opaque mod-margin-top-40" style="padding: 50px;">
            <div class="mod-blank-state-opaque-icon">
              <i class="mod-icon-check"></i>
            </div>
            <h2 class="mod-blank-state-opaque-title">${state?.list === 'todo' ? i18n('project.blank_state.todo.title') : i18n('project.blank_state.done.title')}</h2>
            <p class="mod-blank-state-opaque-subtitle">${state?.list === 'todo' ? i18n('project.blank_state.todo.subtitle') : i18n('project.blank_state.done.subtitle')}</p>
          </div>          
        `)}
        <footer>
          <input type="text" class="task-input mod-input mod-input-large" name="task" placeholder="${i18n('project.task.placeholder')}" />
        </footer>
      </div>
      ${component(ConfirmDeleteTask)}
      ${component(ConfirmDeleteProject)}
    `;
  },
});

export default Project;
