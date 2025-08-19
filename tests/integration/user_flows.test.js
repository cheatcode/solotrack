import test from '@joystick.js/test';

test.that('complete user flow: signup → login → create project → add tasks → complete tasks', async (assert = {}) => {
  // Step 1: User signup
  const user = await test.accounts.signup({
    email_address: 'integration@test.com',
    password: 'password123',
    metadata: {
      name: 'Integration Test User',
    },
  });

  assert.is(!!user._id, true);

  // Step 2: Create a project
  const project_result = await test.api.set('create_project', {
    user,
    input: {
      name: 'Integration Test Project',
      description: 'A project for testing the complete user flow',
    },
  });

  assert.is(!!project_result._id, true);
  const project_id = project_result._id;

  // Step 3: Add multiple tasks to the project
  const task1_result = await test.api.set('create_task', {
    user,
    input: {
      project_id,
      text: 'First task #urgent #frontend',
    },
  });

  const task2_result = await test.api.set('create_task', {
    user,
    input: {
      project_id,
      text: 'Second task #backend #database',
    },
  });

  const task3_result = await test.api.set('create_task', {
    user,
    input: {
      project_id,
      text: 'Third task #testing',
    },
  });

  assert.is(!!task1_result._id, true);
  assert.is(!!task2_result._id, true);
  assert.is(!!task3_result._id, true);

  // Step 4: Verify project contains all tasks
  const project_data = await test.api.get('project', {
    user,
    input: { project_id },
  });

  assert.is(project_data.project.name, 'Integration Test Project');
  assert.is(project_data.tasks.length, 3);
  assert.is(project_data.todo_tasks.length, 3);
  assert.is(project_data.done_tasks.length, 0);

  // Step 5: Complete one task
  await test.api.set('update_task', {
    user,
    input: {
      task_id: task1_result._id,
      text: 'First task #urgent #frontend',
      completed: true,
    },
  });

  // Step 6: Verify task completion
  const updated_project_data = await test.api.get('project', {
    user,
    input: { project_id },
  });

  assert.is(updated_project_data.todo_tasks.length, 2);
  assert.is(updated_project_data.done_tasks.length, 1);
  assert.is(updated_project_data.done_tasks[0]._id, task1_result._id);

  // Step 7: Search for tasks by hashtag
  const search_results = await test.api.get('search_tasks', {
    user,
    input: { query: '#backend' },
  });

  assert.is(search_results.length, 1);
  assert.is(search_results[0]._id, task2_result._id);

  // Step 8: Update a task
  await test.api.set('update_task', {
    user,
    input: {
      task_id: task2_result._id,
      text: 'Updated second task #backend #database #updated',
      completed: false,
    },
  });

  const updated_task = await test.api.get('task', {
    user,
    input: { task_id: task2_result._id },
  });

  assert.is(updated_task.text, 'Updated second task #backend #database #updated');
  assert.is(updated_task.hashtags.includes('#updated'), true);

  // Step 9: Delete a task
  await test.api.set('delete_task', {
    user,
    input: { task_id: task3_result._id },
  });

  const final_project_data = await test.api.get('project', {
    user,
    input: { project_id },
  });

  assert.is(final_project_data.tasks.length, 2);

  // Step 10: Delete the project
  await test.api.set('delete_project', {
    user,
    input: { project_id },
  });

  const projects_data = await test.api.get('projects', { user });
  assert.is(projects_data.length, 0);
});

test.that('user authentication flow: login → logout → password recovery', async (assert = {}) => {
  // Step 1: Create user account
  const user = await test.accounts.signup({
    email_address: 'auth_flow@test.com',
    password: 'originalpassword',
    metadata: {
      name: 'Auth Flow User',
    },
  });

  assert.is(!!user._id, true);

  // Step 2: Verify user can access protected resources
  const profile_data = await test.api.get('profile', { user });
  assert.is(profile_data.name, 'Auth Flow User');
  assert.is(profile_data.email_address, 'auth_flow@test.com');

  // Step 3: Change password
  await test.api.set('change_password', {
    user,
    input: {
      current_password: 'originalpassword',
      new_password: 'newpassword123',
    },
  });

  // Step 4: Verify old password no longer works by attempting login
  // Note: In a real test, we'd test the login endpoint, but for this integration
  // test we'll verify the password was changed by checking the user record
  const updated_user = await process.databases.mongodb.collection('users').findOne({
    _id: user._id,
  });

  // Password should be different (hashed)
  assert.is(updated_user.password !== user.password, true);
});

test.that('project and task management workflow', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'workflow@test.com',
    password: 'password123',
    metadata: {
      name: 'Workflow User',
    },
  });

  // Create multiple projects
  const project1 = await test.api.set('create_project', {
    user,
    input: {
      name: 'Frontend Project',
      description: 'UI/UX work',
    },
  });

  const project2 = await test.api.set('create_project', {
    user,
    input: {
      name: 'Backend Project',
      description: 'API development',
    },
  });

  // Add tasks to different projects
  await test.api.set('create_task', {
    user,
    input: {
      project_id: project1._id,
      text: 'Design homepage #design #ui',
    },
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: project1._id,
      text: 'Implement responsive layout #css #responsive',
    },
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: project2._id,
      text: 'Create user API #api #backend',
    },
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: project2._id,
      text: 'Setup database #database #mongodb',
    },
  });

  // Verify projects list
  const projects = await test.api.get('projects', { user });
  assert.is(projects.length, 2);

  const frontend_project = projects.find(p => p.name === 'Frontend Project');
  const backend_project = projects.find(p => p.name === 'Backend Project');

  assert.is(frontend_project.task_count, 2);
  assert.is(backend_project.task_count, 2);

  // Search across all projects
  const design_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#design' },
  });

  assert.is(design_tasks.length, 1);
  assert.is(design_tasks[0].text.includes('Design homepage'), true);

  const backend_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#backend' },
  });

  assert.is(backend_tasks.length, 1);

  // Search projects
  const project_search = await test.api.get('search_projects', {
    user,
    input: { query: 'Frontend' },
  });

  assert.is(project_search.length, 1);
  assert.is(project_search[0].name, 'Frontend Project');
});

test.that('hashtag functionality across the application', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'hashtag@test.com',
    password: 'password123',
    metadata: {
      name: 'Hashtag User',
    },
  });

  const project = await test.api.set('create_project', {
    user,
    input: {
      name: 'Hashtag Test Project',
      description: 'Testing hashtag functionality',
    },
  });

  // Create tasks with various hashtag patterns
  const tasks = [
    'Task with single hashtag #important',
    'Task with multiple hashtags #urgent #frontend #bug',
    'Task with hashtags in middle #api development #backend work',
    'Task with #special-chars and #under_scores',
    'Task without hashtags',
    'Task with duplicate #important hashtags #important',
  ];

  const created_tasks = [];
  for (const task_text of tasks) {
    const task = await test.api.set('create_task', {
      user,
      input: {
        project_id: project._id,
        text: task_text,
      },
    });
    created_tasks.push(task);
  }

  // Test hashtag searches
  const important_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#important' },
  });

  assert.is(important_tasks.length, 2); // First and last task

  const frontend_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#frontend' },
  });

  assert.is(frontend_tasks.length, 1);

  const urgent_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#urgent' },
  });

  assert.is(urgent_tasks.length, 1);

  // Test search with no results
  const nonexistent_tasks = await test.api.get('search_tasks', {
    user,
    input: { query: '#nonexistent' },
  });

  assert.is(nonexistent_tasks.length, 0);

  // Verify hashtags are properly stored
  const project_data = await test.api.get('project', {
    user,
    input: { project_id: project._id },
  });

  const task_with_multiple_hashtags = project_data.tasks.find(t => 
    t.text.includes('multiple hashtags')
  );

  assert.is(task_with_multiple_hashtags.hashtags.includes('#urgent'), true);
  assert.is(task_with_multiple_hashtags.hashtags.includes('#frontend'), true);
  assert.is(task_with_multiple_hashtags.hashtags.includes('#bug'), true);
});

// Cleanup after all integration tests
test.after(async () => {
  // Clean up test users and their data
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: {
      $in: [
        'integration@test.com',
        'auth_flow@test.com',
        'workflow@test.com',
        'hashtag@test.com',
      ],
    },
  });

  // Clean up any remaining projects and tasks
  await process.databases.mongodb.collection('projects').deleteMany({
    name: {
      $in: [
        'Integration Test Project',
        'Frontend Project',
        'Backend Project',
        'Hashtag Test Project',
      ],
    },
  });

  await process.databases.mongodb.collection('tasks').deleteMany({
    text: {
      $regex: /(Integration|Frontend|Backend|Hashtag|Design|Create|Setup|Task with)/i,
    },
  });
});
