import joystick from "@joystick.js/node-canary";
import api from "./api/index.js";
import tasks_cache from "./caches/tasks.js";
import projects_cache from "./caches/projects.js";
import get_seo_metadata from "./lib/get_seo_metadata.js";

joystick.app({
  api,
  caches: async () => {
    const users = await process.databases.mongodb.collection('users').find().project({ _id: 1 }).toArray();
    for (let i = 0; i < users?.length; i += 1) {
      const user = users[i];
      tasks_cache(user?._id);
      projects_cache(user?._id);
    }
  },
  routes: {
    "/": (req = {}, res = {}) => {
      res.redirect('/projects');
    },
    "/login": (req = {}, res = {}) => {
      req.context.ifLoggedIn('/projects', () => {
        res.render("ui/pages/login/index.js", {
          layout: "ui/layouts/account/index.js",
          head: get_seo_metadata({
            page_title: 'Login',
            page_description: 'Login to your Solotrack account.',
          }),
        });
      });
    },
    "/signup": (req = {}, res = {}) => {
      req.context.ifLoggedIn('/projects', () => {
        res.render("ui/pages/signup/index.js", {
          layout: "ui/layouts/account/index.js",
          head: get_seo_metadata({
            page_title: 'Sign Up',
            page_description: 'Sign up for a Solotrack account.',
          }),
        });
      });
    },
    "/recover-password": (req = {}, res = {}) => {
      req.context.ifLoggedIn('/projects', () => {
        res.render("ui/pages/recover_password/index.js", {
          layout: "ui/layouts/account/index.js",
          head: get_seo_metadata({
            page_title: 'Recover Password',
            page_description: 'Request a password reset for your Solotrack account.',
          }),          
        });
      });
    },
    "/reset-password/:token": (req = {}, res = {}) => {
      req.context.ifLoggedIn('/projects', () => {
        res.render("ui/pages/reset_password/index.js", {
          layout: "ui/layouts/account/index.js",
          head: get_seo_metadata({
            page_title: 'Reset Password',
            page_description: 'Reset the password for your Solotrack account.',
          }), 
        });
      });
    },
    "/profile": (req = {}, res = {}) => {
      req.context.ifNotLoggedIn('/login', () => {
        res.render("ui/pages/profile/index.js", {
          layout: "ui/layouts/app/index.js",
          head: get_seo_metadata({
            page_title: 'Profile',
            page_description: 'Manage your Solotrack profile.',
          }),
        });
      });
    },
    "/projects": (req = {}, res = {}) => {
      req.context.ifNotLoggedIn('/login', () => {
        res.render("ui/pages/projects/index.js", {
          layout: "ui/layouts/app/index.js",
          head: get_seo_metadata({
            page_title: 'Projects',
            page_description: 'Your projects on Solotrack.',
          }),
        });
      });
    },
    "/projects/:project_id": (req = {}, res = {}) => {
      req.context.ifNotLoggedIn('/login', () => {
        res.render("ui/pages/project/index.js", {
          layout: "ui/layouts/app/index.js",
          head: get_seo_metadata({
            page_title: 'Project',
            page_description: 'A project on Solotrack.',
          }),
        });
      });
    },
    "/projects/:project_id/tasks/:task_id": (req = {}, res = {}) => {
      req.context.ifNotLoggedIn('/login', () => {
        res.render("ui/pages/edit_task/index.js", {
          layout: "ui/layouts/app/index.js",
          head: get_seo_metadata({
            page_title: 'Task',
            page_description: 'A project task on Solotrack.',
          }),
        });
      });
    },
    "/attachments/download/:attachment_id": (req = {}, res = {}) => {
      req.context.ifNotLoggedIn('/login', async () => {
        const task = await process.databases.mongodb.collection('tasks').findOne({
          'attachments.id': req?.params?.attachment_id,
        });

        if (task?.user_id !== req?.context?.user?._id) {
          return res.status(403).send('Sorry, you\'re not allowed to download this.');
        }

        const attachment = task?.attachments?.find((attachment) => {
          return attachment.id === req?.params?.attachment_id;
        });

        res.download(attachment?.url, attachment?.file_name, (error = {}) => {
          if (error) {
            res.status(500).send('Sorry, there was a problem downloading this file.');
          }
        });
      });
    },
    "*": (req = {}, res = {}) => {
      res.render("ui/pages/error/index.js", {
        layout: "ui/layouts/app/index.js",
        props: {
          status_code: 404,
        },
      });
    },
  },
  uploaders: {
    attachments: {
      providers: ['local'],
      local: { path: 'uploads' },
      max_size_in_megabytes: 10,
      on_after_upload: async (options = {}) => {
        await process.databases.mongodb.collection('tasks').updateOne({
          _id: options?.input?.task_id,
        }, {
          $addToSet: {
            // NOTE: We only expect one at a time so this is safe.
            attachments: options?.uploads?.[0],
          }
        });
      },
    },
  },
});
