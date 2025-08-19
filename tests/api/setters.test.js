import test from '@joystick.js/test';

test.that('create_project setter creates a new project', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'create_project@example.com',
    password: 'password123'
  });

  const project_id = await test.api.set('create_project', {
    user,
    input: {
      name: 'New Test Project'
    }
  });

  assert.is(typeof project_id, 'string');

  const project = await process.databases.mongodb.collection('projects').findOne({
    _id: project_id
  });

  assert.is(!!project, true);
  assert.is(project.name, 'New Test Project');
  assert.is(project.user_id, user._id);
});

test.that('create_task setter creates a new task with hashtags', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'create_task@example.com',
    password: 'password123'
  });

  // Create test project first
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'task_project_1',
    name: 'Task Project',
    user_id: user._id
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: 'task_project_1',
      task: 'Fix the #bug in #frontend component'
    }
  });

  const task = await process.databases.mongodb.collection('tasks').findOne({
    project_id: 'task_project_1'
  });

  assert.is(!!task, true);
  assert.is(task.task, 'Fix the  in  component');
  assert.is(Array.isArray(task.tags), true);
  assert.is(task.tags.includes('bug'), true);
  assert.is(task.tags.includes('frontend'), true);
  assert.is(task.complete, false);
  assert.is(task.user_id, user._id);
});

test.that('update_task setter updates task properties', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'update_task@example.com',
    password: 'password123'
  });

  // Create test project and task
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'update_project_1',
    name: 'Update Project',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'update_task_1',
    project_id: 'update_project_1',
    user_id: user._id,
    task: 'Original task',
    complete: false,
    created_at: new Date().toISOString()
  });

  // Update task to complete
  await test.api.set('update_task', {
    user,
    input: {
      project_id: 'update_project_1',
      task_id: 'update_task_1',
      update: {
        complete: true
      }
    }
  });

  const updatedTask = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'update_task_1'
  });

  assert.is(updatedTask.complete, true);
  assert.is(typeof updatedTask.completed_at, 'string');
  assert.is(typeof updatedTask.updated_at, 'string');
});

test.that('update_profile setter updates user profile', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'update_profile@example.com',
    password: 'password123'
  });

  await test.api.set('update_profile', {
    user,
    input: {
      first_name: 'Updated',
      last_name: 'Name',
      email_address: 'updated@example.com'
    }
  });

  const updatedUser = await process.databases.mongodb.collection('users').findOne({
    _id: user._id
  });

  assert.is(updatedUser.emailAddress, 'updated@example.com');
  assert.is(updatedUser.name.first, 'Updated');
  assert.is(updatedUser.name.last, 'Name');
});

test.that('delete_task setter removes task from database', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'delete_task@example.com',
    password: 'password123'
  });

  // Create test project and task
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'delete_project_1',
    name: 'Delete Project',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'delete_task_1',
    project_id: 'delete_project_1',
    user_id: user._id,
    task: 'Task to delete',
    complete: false
  });

  await test.api.set('delete_task', {
    user,
    input: {
      project_id: 'delete_project_1',
      task_id: 'delete_task_1'
    }
  });

  const deletedTask = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'delete_task_1'
  });

  assert.is(deletedTask, null);
});

test.that('delete_project setter removes project and associated tasks', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'delete_project@example.com',
    password: 'password123'
  });

  // Create test project and task
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'delete_project_2',
    name: 'Project to Delete',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'delete_task_2',
    project_id: 'delete_project_2',
    user_id: user._id,
    task: 'Associated task',
    complete: false
  });

  await test.api.set('delete_project', {
    user,
    input: {
      project_id: 'delete_project_2'
    }
  });

  const deletedProject = await process.databases.mongodb.collection('projects').findOne({
    _id: 'delete_project_2'
  });

  const associatedTask = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'delete_task_2'
  });

  assert.is(deletedProject, null);
  assert.is(associatedTask, null);
});

test.that('delete_tag setter removes tag from task', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'delete_tag@example.com',
    password: 'password123'
  });

  // Create test project and task with tags
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'tag_project_1',
    name: 'Tag Project',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'tag_task_1',
    project_id: 'tag_project_1',
    user_id: user._id,
    task: 'Task with tags',
    tags: ['urgent', 'bug', 'frontend'],
    complete: false
  });

  await test.api.set('delete_tag', {
    user,
    input: {
      project_id: 'tag_project_1',
      task_id: 'tag_task_1',
      tag: 'bug'
    }
  });

  const updatedTask = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'tag_task_1'
  });

  assert.is(Array.isArray(updatedTask.tags), true);
  assert.is(updatedTask.tags.includes('urgent'), true);
  assert.is(updatedTask.tags.includes('frontend'), true);
  assert.is(updatedTask.tags.includes('bug'), false);
});

test.after_each(async () => {
  // Clean up test data after each test
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: { $regex: /@example\.com$/ }
  });
  await process.databases.mongodb.collection('projects').deleteMany({
    _id: { $regex: /^(task_project|update_project|delete_project|tag_project)/ }
  });
  await process.databases.mongodb.collection('tasks').deleteMany({
    _id: { $regex: /^(update_task|delete_task|tag_task)/ }
  });
});
