import test from '@joystick.js/test';

test.that('profile getter returns user data', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Test',
        last: 'User'
      }
    }
  });

  const profile = await test.api.get('profile', {
    user,
  });

  assert.is(typeof profile, 'object');
  assert.is(profile.emailAddress, 'test@example.com');
  assert.is(profile.name.first, 'Test');
  assert.is(profile.name.last, 'User');
});

test.that('projects getter returns user projects', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'projects@example.com',
    password: 'password123'
  });

  // Create a test project
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'test_project_1',
    name: 'Test Project',
    user_id: user._id
  });

  const projects = await test.api.get('projects', {
    user,
  });

  assert.is(Array.isArray(projects), true);
  assert.is(projects.length >= 1, true);
  
  const testProject = projects.find(p => p._id === 'test_project_1');
  assert.is(!!testProject, true);
  assert.is(testProject.name, 'Test Project');
});

test.that('project getter returns project with tasks', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'project@example.com',
    password: 'password123'
  });

  // Create test project and task
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'test_project_2',
    name: 'Test Project 2',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'test_task_1',
    project_id: 'test_project_2',
    user_id: user._id,
    task: 'Test task',
    complete: false,
    created_at: new Date().toISOString()
  });

  const project = await test.api.get('project', {
    user,
    input: {
      project_id: 'test_project_2',
      complete: false,
      page: 1
    }
  });

  assert.is(typeof project, 'object');
  assert.is(project.name, 'Test Project 2');
  assert.is(Array.isArray(project.tasks), true);
  assert.is(project.tasks.length >= 1, true);
  assert.is(typeof project.totals, 'object');
  assert.is(typeof project.totals.todo, 'number');
  assert.is(typeof project.totals.done, 'number');
});

test.that('task getter returns task with parsed notes', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'task@example.com',
    password: 'password123'
  });

  // Create test project and task with notes
  await process.databases.mongodb.collection('projects').insertOne({
    _id: 'test_project_3',
    name: 'Test Project 3',
    user_id: user._id
  });

  await process.databases.mongodb.collection('tasks').insertOne({
    _id: 'test_task_2',
    project_id: 'test_project_3',
    user_id: user._id,
    task: 'Test task with notes',
    notes: '# Task Notes\n\nThis is a **markdown** note.',
    complete: false,
    created_at: new Date().toISOString()
  });

  const task = await test.api.get('task', {
    user,
    input: {
      project_id: 'test_project_3',
      task_id: 'test_task_2'
    }
  });

  assert.is(typeof task, 'object');
  assert.is(task.task, 'Test task with notes');
  assert.is(typeof task.notes_html, 'string');
  assert.is(task.notes_html.includes('<h1>'), true);
  assert.is(task.notes_html.includes('<strong>'), true);
});

test.that('search_projects getter returns filtered results', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'search@example.com',
    password: 'password123'
  });

  // Create test projects
  await process.databases.mongodb.collection('projects').insertMany([
    {
      _id: 'search_project_1',
      name: 'Frontend Development',
      user_id: user._id
    },
    {
      _id: 'search_project_2',
      name: 'Backend API',
      user_id: user._id
    }
  ]);

  const results = await test.api.get('search_projects', {
    user,
    input: {
      query: 'frontend'
    }
  });

  assert.is(Array.isArray(results), true);
});

test.after_each(async () => {
  // Clean up test data after each test
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: { $regex: /@example\.com$/ }
  });
  await process.databases.mongodb.collection('projects').deleteMany({
    _id: { $regex: /^test_project/ }
  });
  await process.databases.mongodb.collection('tasks').deleteMany({
    _id: { $regex: /^test_task/ }
  });
});
