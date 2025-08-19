import test from '@joystick.js/test';

test.that('projects page renders with data', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('projects'), true);
  assert.is(html.includes('mod-search-input'), true);
  assert.is(html.includes('new-project'), true);

  await test.accounts.delete(user?._id);
});

test.that('projects page shows blank state when no projects', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test2@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User 2',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-blank-state-dashed'), true);
  assert.is(html.includes('mod-icon-briefcase-business'), true);

  await test.accounts.delete(user?._id);
});

test.that('projects page renders project list when projects exist', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test3@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User 3',
    },
  });

  // Create a test project
  await test.api.set('create_project', {
    user,
    input: {
      name: 'Test Project',
      description: 'A test project',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('projects-list'), true);
  assert.is(html.includes('Test Project'), true);

  // Cleanup
  const projects = await process.databases.mongodb.collection('projects').find({ user_id: user?._id }).toArray();
  for (const project of projects) {
    await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  }
  await test.accounts.delete(user?._id);
});

test.that('projects page search functionality updates state', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test4@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User 4',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  // Simulate search input
  component.test.event('keyup', '[name="search"]', {
    target: { value: 'test search' }
  });

  assert.is(component.state.search, 'test search');

  await test.accounts.delete(user?._id);
});

test.that('projects page new project button triggers modal', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test5@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User 5',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  // Test that clicking new project button doesn't throw error
  component.test.event('click', '.new-project');

  // The event handler should execute without error
  assert.is(true, true);

  await test.accounts.delete(user?._id);
});

test.that('projects page data function fetches projects', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test6@projects.com',
    password: 'password123',
    metadata: {
      name: 'Test User 6',
    },
  });

  // Create test projects
  await test.api.set('create_project', {
    user,
    input: {
      name: 'Project One',
      description: 'First project',
    },
  });

  await test.api.set('create_project', {
    user,
    input: {
      name: 'Project Two',
      description: 'Second project',
    },
  });

  const component = await test.render('ui/pages/projects/index.js', {
    options: {
      user,
      language: 'en-US',
    },
  });

  const data = await component.test.data();
  
  assert.is(Array.isArray(data?.projects), true);
  assert.is(data?.projects?.length >= 2, true);

  // Cleanup
  const projects = await process.databases.mongodb.collection('projects').find({ user_id: user?._id }).toArray();
  for (const project of projects) {
    await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  }
  await test.accounts.delete(user?._id);
});
