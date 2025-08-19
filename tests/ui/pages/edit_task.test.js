import test from '@joystick.js/test';

test.that('edit task page renders with task data', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@edittask.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Test task #urgent',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Test task'), true);
  assert.is(html.includes('back-to-tasks'), true);
  assert.is(html.includes('Created'), true);
  assert.is(html.includes('urgent'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page shows completed task styling', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@completedtask.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Completed task',
    },
  });

  // Mark task as complete
  await test.api.set('update_task', {
    user,
    input: {
      project_id: project._id,
      task_id: task._id,
      update: { complete: true },
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('is-complete'), true);
  assert.is(html.includes('checked="true"'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page handles title editing state', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@titleedit.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Original task title',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    state: { editing_title: true },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('edit-task'), true);
  assert.is(html.includes('name="task"'), true);
  assert.is(html.includes('Original task title'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page handles notes editing state', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@notesedit.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Task with notes',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    state: { editing_notes: true },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('name="notes"'), true);
  assert.is(html.includes('mod-autoresize'), true);
  assert.is(html.includes('Type notes for this task here'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page shows blank state for notes', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@blanknotes.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Task without notes',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-blank-state-opaque'), true);
  assert.is(html.includes('No Notes'), true);
  assert.is(html.includes('To add notes, click here'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page shows upload progress', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@uploadprogress.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Task with upload',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    state: { upload_progress: 75 },
    options: { user, language: 'en-US' },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-progress-bar'), true);
  assert.is(html.includes('Uploading...'), true);
  assert.is(html.includes('75%'), true);
  assert.is(html.includes('width: 75%'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page handles task completion toggle', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@togglecomplete.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Task to toggle',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  // Simulate checkbox change event
  component.test.event('change', '[name="complete"]');

  // Verify the event handler exists
  const html = component.instance.render_to_html();
  assert.is(html.includes('name="complete"'), true);
  assert.is(html.includes('type="checkbox"'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page handles title click for editing', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@titleclick.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Clickable title',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  // Simulate h1 click event
  component.test.event('click', 'h1');

  // Verify state change would occur
  assert.is(component.state.editing_title, true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.that('edit task page data fetching works correctly', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@datafetch.com',
    password: 'password123',
    metadata: { name: 'Test User' },
  });

  const project = await test.api.set('create_project', {
    user,
    input: { name: 'Test Project', description: 'A test project' },
  });

  const task = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      task: 'Data fetch task #test',
    },
  });

  const component = await test.render('ui/pages/edit_task/index.js', {
    props: {
      url: {
        params: {
          project_id: project._id,
          task_id: task._id,
        },
      },
    },
    options: { user, language: 'en-US' },
  });

  const data = await component.test.data();

  assert.is(typeof data?.task, 'object');
  assert.is(data?.task?.task, 'Data fetch task');
  assert.is(data?.task?.tags?.includes('test'), true);

  // Cleanup
  await process.databases.mongodb.collection('tasks').deleteOne({ _id: task._id });
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user?._id);
});

test.after(async () => {
  // Clean up any remaining test data
  await process.databases.mongodb.collection('tasks').deleteMany({
    task: { $regex: /test|Test/ }
  });
  await process.databases.mongodb.collection('projects').deleteMany({
    name: { $regex: /test|Test/ }
  });
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: { $regex: /@.*test.*\.com$/ }
  });
});
