import { accounts } from '@joystick.js/node-canary';
import fs from 'fs/promises';
import parse_markdown from "../lib/node/parse_markdown.js";
import parse_hashtags from "../lib/parse_hashtags.js";
import search_index from "../lib/search_index.js";
import { can_access_project, user_exists } from "./authorizations/index.js";

const api = {
  getters: {
    profile: {
      authorized: user_exists,
      get: (_input, context = {}) => {
        // NOTE: Safe as we're validating the user exists above.
        return context?.user;
      },
    },
    project: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        complete: {
          type: 'boolean',
        },
        page: {
          type: 'number',
          required: true,
        },
      },
      authorized: can_access_project,
      get: async (input, context = {}) => {
        const project = await process.databases.mongodb.collection('projects').findOne({
          _id: input?.project_id,
        });

        const tasks = await process.databases.mongodb.collection('tasks').find({
          project_id: project?._id,
          complete: input?.complete,
        }).sort(
            input?.complete ? { completed_at: -1 } : { created_at: -1 }
          )
          .skip((input?.page - 1) * 20)
          .limit(20)
          .toArray();

        return {
          ...project,
          totals: {
            todo: await process.databases.mongodb.collection('tasks').countDocuments({
              project_id: project?._id,
              complete: false,
            }),
            done: await process.databases.mongodb.collection('tasks').countDocuments({
              project_id: project?._id,
              complete: true,
            }),
          },
          tasks,
        };
      },
    },
    projects: {
      authorized: user_exists,
      get: (_input, context = {}) => {
        return process.databases.mongodb.collection('projects').find({
          user_id: context?.user?._id,
        }).toArray();
      },
    },
    search_projects: {
      input: {
        query: {
          type: 'string',
        },
      },
      authorized: user_exists,
      get: (input = {}, context = {}) => {
        return search_index(`projects_${context?.user?._id}`, input?.query, {
          threshold: -5000,
          limit: 20,
          keys: ['name'],
        });
      },
    },
    search_tasks: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        list: {
          type: 'string',
          required: true,
        },
        query: {
          type: 'string',
        }
      },
      authorized: can_access_project,
      get: (input = {}, context = {}) => {
        const complete = input?.list === 'todo' ? false : true;
        return search_index(`tasks_${context?.user?._id}`, input?.query, {
          modifiers: [(item = {}) => {
            return {
              ...item,
              searchable_tags: item?.tags?.map((tag) => `#${tag}`).join(', '),
            };
          }],
          filters: [(item) => {
            return item?.project_id === input?.project_id && item?.complete === complete;
          }],
          threshold: -5000,
          limit: 20,
          keys: ['task', 'searchable_tags', 'complete'],
        });
      },
    },
    task: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task_id: {
          type: 'string',
          required: true,
        },
      },
      authorized: can_access_project,
      get: async (input = {}) => {
        const task = await process.databases.mongodb.collection('tasks').findOne({
          _id: input?.task_id,
        });

        return {
          ...(task || {}),
          notes_html: task?.notes ? await parse_markdown(task?.notes || '') : '',
        };
      },
    },
  },
  setters: {
    change_password: {
      input: {
        new_password: {
          type: 'string',
          required: true,
        },
      },
      authorized: user_exists,
      set: (input = {}, context = {}) => {
        return accounts.set_password({
          user_id: context?.user?._id,
          password: input?.new_password,
        });
      },
    },
    create_project: {
      input: {
        name: {
          type: 'string',
          required: true,
        }
      },
      authorized: user_exists,
      set: async (input = {}, context = {}) => {
        const project_id = joystick.id();

        await process.databases.mongodb.collection('projects').insertOne({
          _id: project_id,
          name: input?.name,
          user_id: context?.user?._id,
        });

        return project_id;
      },
    },
    create_task: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task: {
          type: 'string',
          required: true,
        }
      },
      authorized: can_access_project,
      set: async (input = {}, context = {}) => {
        const parsed_task = parse_hashtags(input?.task);

        return process.databases.mongodb.collection('tasks').insertOne({
          _id: joystick.id(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          complete: false,
          user_id: context?.user?._id,
          project_id: input?.project_id,
          task: parsed_task?.task,
          tags: parsed_task?.tags,
        });
      },
    },
    delete_attachment: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task_id: {
          type: 'string',
          required: true,
        },
        attachment_id: {
          type: 'string',
          required: true,
        }
      },
      authorized: can_access_project,
      set: async (input = {}) => {
        const task = await process.databases.mongodb.collection('tasks').findOne({
          _id: input?.task_id,
        });

        const attachment = task?.attachments?.find((attachment) => {
          return attachment?.id === input?.attachment_id;
        });

        if (attachment) {
          await fs.unlink(attachment?.url);

          return process.databases.mongodb.collection('tasks').updateOne({
            _id: input?.task_id,
          }, {
            $pull: {
              attachments: { id: input?.attachment_id },
            },
          });
        }
      },
    },
    delete_project: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
      },
      authorized: can_access_project,
      set: async (input = {}) => {
        await process.databases.mongodb.collection('tasks').deleteMany({
          project_id: input?.project_id,
        });

        return process.databases.mongodb.collection('projects').deleteOne({
          _id: input?.project_id,
        });
      },
    },
    delete_tag: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task_id: {
          type: 'string',
          required: true,
        },
        tag: {
          type: 'string',
          required: true,
        }
      },
      authorized: can_access_project,
      set: (input = {}) => {
        return process.databases.mongodb.collection('tasks').updateOne({
          _id: input?.task_id,
        }, {
          $pull: {
            tags: input?.tag,
          },
        });
      },
    },
    delete_task: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task_id: {
          type: 'string',
          required: true,
        }
      },
      authorized: can_access_project,
      set: (input = {}) => {
        return process.databases.mongodb.collection('tasks').deleteOne({
          _id: input?.task_id,
        });
      },
    },
    update_profile: {
      input: {
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        email_address: {
          type: 'string',
          required: true,
        },
      },
      authorized: user_exists,
      set: (input = {}, context = {}) => {
        return process.databases.mongodb.collection('users').updateOne({
          _id: context?.user?._id,
        }, {
          $set: {
            emailAddress: input?.email_address,
            name: {
              first: input?.first_name,
              last: input?.last_name,
            },
          },
        });
      },
    },
    update_project: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        name: {
          type: 'string',
          required: true,
        },
      },
      authorized: can_access_project,
      set: (input = {}, context = {}) => {
        return process.databases.mongodb.collection('projects').updateOne({
          _id: input?.project_id,
        }, {
          $set: {
            name: input?.name,
          }
        });
      },
    },
    update_task: {
      input: {
        project_id: {
          type: 'string',
          required: true,
        },
        task_id: {
          type: 'string',
          required: true,
        },
        update: {
          type: 'object',
          required: true,
        },
      },
      authorized: can_access_project,
      set: (input = {}, context = {}) => {
        const update = {};

        if (typeof input?.update?.task !== 'undefined' && input?.update?.task) {
          update.$set = {
            task: input?.update?.task,
            updated_at: new Date().toISOString(),
          };
        }

        if (typeof input?.update?.notes !== 'undefined' && input?.update?.notes) {
          update.$set = {
            notes: input?.update?.notes,
            updated_at: new Date().toISOString(),
          };
        }

        if (typeof input?.update?.complete !== 'undefined' && input?.update?.complete) {
          update.$set = {
            complete: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        }

        if (typeof input?.update?.complete !== 'undefined' && !input?.update?.complete) {
          update.$set = {
            complete: false,
            updated_at: new Date().toISOString(),
          };

          update.$unset = { completed_at: '' };
        }

        return process.databases.mongodb.collection('tasks').updateOne({
          _id: input?.task_id,
        }, update);
      },
    },
  },
};

export default api;