import joystick, { set, upload } from '@joystick.js/ui-canary';
import { timeago } from '../../../lib/dates.js';
import toasts from '../../../lib/toasts.js';
import ConfirmDeleteAttachment from '../../components/confirm_delete_attachment/index.js';
import { autoresize, dialog } from '../../../lib/mod.esm.min.js';
import ConfirmDeleteTag from '../../components/confirm_delete_tag/index.js';

const EditTask = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      task: await api.get('task', {
        input: {
          project_id: req?.params?.project_id,
          task_id: req?.params?.task_id,
        },
      })
    };
  },
  state: {
    editing_title: false,
    editing_notes: false,
    upload_progress: 0,
  },
  lifecycle: {
    on_render: () => {
      autoresize();
    },
  },
  css: {
    min: {
      width: {
        0: `
          .edit-task {
            max-width: 900px;
            margin: 0 auto;
            padding-bottom: 40px;
          }

          .edit-task .back-to-tasks {
            text-decoration: none;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            margin-top: 40px;
          }

          .edit-task .back-to-tasks i {
            margin-right: 5px;
            color: var(--mod-neutral-8);
            font-weight: 600;
          }

          .edit-task .back-to-tasks:hover i {
            color: var(--mod-brand);
          }

          .edit-task > header {
            margin-bottom: 40px;
          }

          .edit-task > header > h1 {
            display: flex;
            align-items: flex-start;
            font-size: 32px;
            line-height: 42px;
            margin: 30px 0 0 -60px;
          }

          .edit-task > header > h1 [type="checkbox"],
          .edit-task > header > .edit-task [type="checkbox"] {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            display: inline-block;
            margin-right: 20px;
          }

          .edit-task.is-complete > header > h1 {
            text-decoration: line-through;
            opacity: 0.7;
          }

          .edit-task > header > .edit-task {
            display: flex;
            margin: 30px 0 0 0;
          }

          .edit-task > header > .edit-task [type="checkbox"] {
            margin-left: -60px;
          }

          .edit-task > header > .edit-task [type="text"] {
            margin-bottom: 5px;
          }

          .edit-task > header > p {
            font-size: 16px;
            line-height: 26px;
            margin: 5px 0 0 0;
            color: var(--mod-neutral-8);
          }

          .edit-task > header > .mod-tag-cloud {
            margin-top: 20px;
          }

          .edit-task-section:not(:last-child) {
            margin-bottom: 40px;
          }

          .edit-task-section > h2 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }

          .notes > *:not(:last-child) {
            margin-bottom: 10px;
          }

          .notes pre {
            padding: 20px;
            border-radius: 10px;
          }
        `,
      },
    },
  },
  events: {
    'click h1 [type="checkbox"]': (event = {}, instance = {}) => {
      // NOTE: Prevents checkbox click triggering the click event on the h1.
      event.stopPropagation();
    },
    'click h1': (event = {}, instance = {}) => {
      instance.set_state({ editing_title: true }, () => {
        instance.DOMNode.querySelector('[name="task"]').focus();
      });
    },
    'change [name="complete"]': (event = {}, instance = {}) => {
      set('update_task', {
        input: {
          project_id: instance?.url?.params?.project_id,
          task_id: instance?.url?.params?.task_id,
          update: {
            complete: event.target.checked,
          }
        },
      }).then(() => {
        instance.data.refetch();
      }).catch(({ errors }) => {
        toasts.danger({
          title: 'Update Task Error',
          message: errors?.[0]?.message,
        });
      });
    },
    'blur [name="task"]': (event = {}, instance = {}) => {
      const new_task = event.target.value;

      set('update_task', {
        input: {
          project_id: instance?.url?.params?.project_id,
          task_id: instance?.url?.params?.task_id,
          update: {
            task: new_task,
          }
        },
      }).then(() => {
        instance.set_state({ editing_title: false }, () => {
          instance.data.refetch();
        });
      }).catch(({ errors }) => {
        toasts.danger({
          title: 'Update Task Error',
          message: errors?.[0]?.message,
        });
      });

    },
    'click .edit-notes': (event = {}, instance = {}) => {
      instance.set_state({ editing_notes: true }, () => {
        instance.DOMNode.querySelector('[name="notes"]').focus();
      });
    },
    'blur [name="notes"]': (event = {}, instance = {}) => {
      if (event.target.value !== '') {
        set('update_task', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task_id: instance?.url?.params?.task_id,
            update: {
              notes: event.target.value,
            }
          },
        }).then(() => {
          instance.set_state({ editing_notes: false }, () => {
            instance.data.refetch();
          });
        }).catch(({ errors }) => {
          toasts.danger({
            title: 'Update Task Error',
            message: errors?.[0]?.message,
          });
        });
      } else {
        instance.set_state({ editing_notes: false }, () => {
          instance.data.refetch();
        });
      }
    },
    'change [name="attachments"]': (event = {}, instance = {}) => {
      upload('attachments', {
        files: event.target.files,
        input: {
          task_id: instance?.url?.params?.task_id,
        },
        on_progress: (percentage = 0) => {
          instance.set_state({ upload_progress: percentage }); 
        },
      }).then(() => {
        instance.set_state({ upload_progress: 0 }, () => {
          instance.data.refetch();
        }); 
      });
    },
    'click .delete-attachment': async (event = {}, instance = {}) => {
      const attachment_id = event.currentTarget.getAttribute('data-attachment-id');

      if (await dialog('confirm_delete_attachment')) {
        set('delete_attachment', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task_id: instance?.url?.params?.task_id,
            attachment_id,
          },
        }).then(() => {
          instance.data.refetch();
        }).catch(({ errors }) => {
          toasts.danger({
            title: 'Delete Attachment Error',
            message: errors?.[0]?.message,
          });
        });
      }
    },
    'click .delete-tag': async (event = {}, instance = {}) => {
      const tag = event.currentTarget.getAttribute('data-tag');

      if (await dialog('confirm_delete_tag')) {
        set('delete_tag', {
          input: {
            project_id: instance?.url?.params?.project_id,
            task_id: instance?.url?.params?.task_id,
            tag,
          },
        }).then(() => {
          instance.data.refetch();
        }).catch(({ errors }) => {
          toasts.danger({
            title: 'Delete Tag Error',
            message: errors?.[0]?.message,
          });
        });
      }
    },
  },
  render: ({ component, url, data, state, when, each }) => {
    return `
      <div class="edit-task ${data?.task?.complete ? 'is-complete' : ''}">
        <header>
          <a class="back-to-tasks" href="/projects/${url?.params?.project_id}"><i class="mod-icon-arrow-left"></i> Back to Tasks</a>
          ${state?.editing_title ?
            `<div class="edit-task">
              <input type="checkbox" name="complete" class="mod-input" ${data?.task?.complete ? 'checked="true"' : ''} />
              <input type="text" class="mod-input" name="task" placeholder="Task" value="${data?.task?.task}" />
            </div>` : `<h1>
              <input type="checkbox" name="complete" class="mod-input" ${data?.task?.complete ? 'checked="true"' : ''} />
              <span>${data?.task?.task}</span>
            </h1>`}
          <p>Created ${timeago(data?.task?.created_at)}</p>
          ${when(data?.task?.tags?.length > 0, () => `
            <div class="mod-tag-cloud">
              ${each(data?.task?.tags, (tag = '') => `<div class="mod-tag">${tag} <i data-tag="${tag}" class="mod-icon-x delete-tag"></i></div>`)}
            </div>
          `)}
        </header>
        <section class="edit-task-section description">
          <h2>Notes</h2>
          ${when(state?.editing_notes, () => `
            <textarea data-default-height="100" class="mod-input mod-input-large mod-autoresize" name="notes" placeholder="Type notes for this task here...">${data?.task?.notes || ''}</textarea>
          `)}
          ${when(!state?.editing_notes && !data?.task?.notes, () => `
            <div class="mod-blank-state-opaque edit-notes">
              <div class="mod-blank-state-opaque-icon">
                <i class="mod-icon-pencil"></i>
              </div>            
              <h2 class="mod-blank-state-opaque-title">No Notes</h2>
              <p class="mod-blank-state-opaque-subtitle">To add notes, click here.</p>
            </div>
          `)}
          ${when(!state?.editing_notes && data?.task?.notes, () => `
            <div class="notes edit-notes">
              ${data?.task?.notes_html || ''}
            </div>
          `)}
        </section>
        <section class="edit-task-section attachments">
          <h2>Attachments</h2>
          ${when(state?.upload_progress === 0, () => `
            <div class="mod-upload-target">
              <div class="mod-upload-target-uploader">
                <input type="file" name="attachments" />
                <header>
                  <i class="mod-icon-cloud-upload"></i>
                  <p>Drag and Drop a File or <span>Choose a File</span></p>
                </header>
              </div>
              <footer class="mod-upload-target-footer">
                <p>Allowed: Any</p>
                <p>Max File Size: 10MB</p>
              </footer>
            </div>
          `)}
          ${when(state?.upload_progress > 0, () => `
            <div class="mod-upload-target">
              <div class="mod-upload-target-uploader">
                <div class="mod-progress-bar">
                  <header class="mod-progress-bar-header">
                    <p>Uploading...</p>
                    <p>${state?.upload_progress}%</p>
                  </header>      
                  <div class="mod-progress-bar-progress">
                    <div class="mod-progress-bar-fill" style="width: ${state?.upload_progress}%;"></div>
                  </div>
                </div>    
              </div>
              <footer class="mod-upload-target-footer">
                <p>Allowed: Any</p>
                <p>Max File Size: 10MB</p>
              </footer>
            </div>
          `)}
        </section>
        ${when(data?.task?.attachments?.length > 0, () => `
          <section class="edit-task-section attachments">
            ${each(data?.task?.attachments, (attachment = {}) => {
              return `<div class="mod-panel">
                <div class="mod-panel-center">
                  <p class="mod-panel-title">${attachment?.file_name}</p>
                </div>
                <div class="mod-panel-right">
                  <div class="mod-button-grid">
                    <a href="/attachments/download/${attachment?.id}" class="mod-button"><i class="mod-icon-download"></i></a>
                    <button data-attachment-id="${attachment?.id}" class="mod-button delete-attachment"><i class="mod-icon-x"></i></button>
                  </div>
                </div>
              </div>`;
            })}
          </section>
        `)}        
      </div>
      ${component(ConfirmDeleteTag)}
      ${component(ConfirmDeleteAttachment)}
    `;
  },
});

export default EditTask;