import test from '@joystick.js/test';

// Test user fixtures
export const create_test_user = async (suffix = '') => {
  return await test.accounts.signup({
    email_address: `test_user${suffix}@test.com`,
    password: 'password123',
    metadata: {
      name: `Test User${suffix ? ` ${suffix}` : ''}`,
    },
  });
};

export const create_admin_user = async () => {
  return await test.accounts.signup({
    email_address: 'admin@test.com',
    password: 'adminpassword123',
    metadata: {
      name: 'Admin User',
      roles: ['admin'],
    },
  });
};

// Project fixtures
export const create_test_project = async (user, overrides = {}) => {
  const default_project = {
    name: 'Test Project',
    description: 'A test project for testing purposes',
  };

  return await test.api.set('create_project', {
    user,
    input: { ...default_project, ...overrides },
  });
};

export const create_multiple_projects = async (user, count = 3) => {
  const projects = [];
  for (let i = 1; i <= count; i++) {
    const project = await create_test_project(user, {
      name: `Test Project ${i}`,
      description: `Description for test project ${i}`,
    });
    projects.push(project);
  }
  return projects;
};

// Task fixtures
export const create_test_task = async (user, project_id, overrides = {}) => {
  const default_task = {
    project_id,
    text: 'Test task #testing',
  };

  return await test.api.set('create_task', {
    user,
    input: { ...default_task, ...overrides },
  });
};

export const create_multiple_tasks = async (user, project_id, count = 5) => {
  const tasks = [];
  const task_templates = [
    'Frontend development task #frontend #ui',
    'Backend API implementation #backend #api',
    'Database optimization #database #performance',
    'Testing and QA #testing #qa',
    'Documentation update #docs #writing',
    'Bug fix for login issue #bug #auth',
    'Feature implementation #feature #enhancement',
    'Code review and refactoring #review #refactor',
    'Deployment and DevOps #deploy #devops',
    'User experience improvements #ux #design',
  ];

  for (let i = 0; i < count; i++) {
    const template = task_templates[i % task_templates.length];
    const task = await create_test_task(user, project_id, {
      text: `${template} ${i + 1}`,
    });
    tasks.push(task);
  }
  return tasks;
};

export const create_completed_tasks = async (user, project_id, count = 3) => {
  const tasks = [];
  for (let i = 1; i <= count; i++) {
    const task = await create_test_task(user, project_id, {
      text: `Completed task ${i} #done #completed`,
    });
    
    // Mark task as completed
    await test.api.set('update_task', {
      user,
      input: {
        task_id: task._id,
        text: task.text,
        completed: true,
      },
    });
    
    tasks.push({ ...task, completed: true });
  }
  return tasks;
};

// Complex project with tasks fixture
export const create_project_with_tasks = async (user, options = {}) => {
  const {
    project_name = 'Full Test Project',
    todo_count = 3,
    done_count = 2,
    hashtags = ['#frontend', '#backend', '#testing'],
  } = options;

  const project = await create_test_project(user, {
    name: project_name,
    description: 'A complete project with various tasks',
  });

  const todo_tasks = [];
  const done_tasks = [];

  // Create todo tasks
  for (let i = 1; i <= todo_count; i++) {
    const hashtag = hashtags[(i - 1) % hashtags.length];
    const task = await create_test_task(user, project._id, {
      text: `Todo task ${i} ${hashtag}`,
    });
    todo_tasks.push(task);
  }

  // Create completed tasks
  for (let i = 1; i <= done_count; i++) {
    const hashtag = hashtags[(i - 1) % hashtags.length];
    const task = await create_test_task(user, project._id, {
      text: `Completed task ${i} ${hashtag}`,
    });
    
    await test.api.set('update_task', {
      user,
      input: {
        task_id: task._id,
        text: task.text,
        completed: true,
      },
    });
    
    done_tasks.push({ ...task, completed: true });
  }

  return {
    project,
    todo_tasks,
    done_tasks,
    all_tasks: [...todo_tasks, ...done_tasks],
  };
};

// Search test data fixture
export const create_search_test_data = async (user) => {
  const projects = [];
  const tasks = [];

  // Create projects with searchable names
  const project_names = [
    'Frontend Development',
    'Backend Services',
    'Mobile Application',
    'Data Analytics',
    'User Interface Design',
  ];

  for (const name of project_names) {
    const project = await create_test_project(user, {
      name,
      description: `Project for ${name.toLowerCase()}`,
    });
    projects.push(project);

    // Add tasks with various hashtags
    const project_tasks = await create_multiple_tasks(user, project._id, 3);
    tasks.push(...project_tasks);
  }

  return { projects, tasks };
};

// Hashtag test data fixture
export const create_hashtag_test_data = async (user) => {
  const project = await create_test_project(user, {
    name: 'Hashtag Test Project',
    description: 'For testing hashtag functionality',
  });

  const hashtag_tasks = [
    'Task with single hashtag #important',
    'Task with multiple hashtags #urgent #frontend #bug',
    'Task with hashtags in middle #api development #backend work',
    'Task with #special-chars and #under_scores',
    'Task without hashtags at all',
    'Task with duplicate #important hashtags #important again',
    'Complex task #javascript #react #frontend #ui #responsive',
    'Backend task #nodejs #express #database #mongodb',
    'Testing task #jest #testing #automation #ci-cd',
    'Design task #figma #design #ux #ui #prototyping',
  ];

  const tasks = [];
  for (const text of hashtag_tasks) {
    const task = await create_test_task(user, project._id, { text });
    tasks.push(task);
  }

  return { project, tasks };
};

// Performance test data fixture
export const create_large_dataset = async (user, options = {}) => {
  const {
    project_count = 10,
    tasks_per_project = 20,
  } = options;

  const projects = [];
  const all_tasks = [];

  for (let i = 1; i <= project_count; i++) {
    const project = await create_test_project(user, {
      name: `Performance Test Project ${i}`,
      description: `Large dataset project ${i} for performance testing`,
    });
    projects.push(project);

    const tasks = await create_multiple_tasks(user, project._id, tasks_per_project);
    all_tasks.push(...tasks);

    // Mark some tasks as completed (roughly 30%)
    const completed_count = Math.floor(tasks_per_project * 0.3);
    for (let j = 0; j < completed_count; j++) {
      await test.api.set('update_task', {
        user,
        input: {
          task_id: tasks[j]._id,
          text: tasks[j].text,
          completed: true,
        },
      });
    }
  }

  return { projects, tasks: all_tasks };
};

// Date-based test data fixture
export const create_date_test_data = async (user) => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last_week = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last_month = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const projects = [];

  // Create projects with different creation dates
  const date_projects = [
    { name: 'Recent Project', date: now },
    { name: 'Yesterday Project', date: yesterday },
    { name: 'Last Week Project', date: last_week },
    { name: 'Last Month Project', date: last_month },
  ];

  for (const { name, date } of date_projects) {
    // Create project directly in database with custom date
    const project_id = `date_test_${Date.now()}_${Math.random()}`;
    await process.databases.mongodb.collection('projects').insertOne({
      _id: project_id,
      name,
      description: `Project created on ${date.toISOString()}`,
      user_id: user._id,
      created_at: date.toISOString(),
      updated_at: date.toISOString(),
    });

    projects.push({
      _id: project_id,
      name,
      created_at: date.toISOString(),
    });
  }

  return { projects };
};

// Cleanup helper
export const cleanup_test_data = async (user_emails = []) => {
  // Clean up users
  if (user_emails.length > 0) {
    await process.databases.mongodb.collection('users').deleteMany({
      emailAddress: { $in: user_emails },
    });
  }

  // Clean up projects with test names
  await process.databases.mongodb.collection('projects').deleteMany({
    name: { $regex: /test|Test|performance|Performance|date|Date/i },
  });

  // Clean up tasks with test content
  await process.databases.mongodb.collection('tasks').deleteMany({
    text: { $regex: /test|Test|todo|Todo|completed|Completed/i },
  });
};

// Assertion helpers
export const assert_project_structure = (assert, project) => {
  assert.is(!!project._id, true);
  assert.is(typeof project.name, 'string');
  assert.is(typeof project.description, 'string');
  assert.is(!!project.user_id, true);
  assert.is(!!project.created_at, true);
  assert.is(!!project.updated_at, true);
};

export const assert_task_structure = (assert, task) => {
  assert.is(!!task._id, true);
  assert.is(typeof task.text, 'string');
  assert.is(!!task.project_id, true);
  assert.is(!!task.user_id, true);
  assert.is(typeof task.completed, 'boolean');
  assert.is(Array.isArray(task.hashtags), true);
  assert.is(!!task.created_at, true);
  assert.is(!!task.updated_at, true);
};

export const assert_user_structure = (assert, user) => {
  assert.is(!!user._id, true);
  assert.is(typeof user.emailAddress, 'string');
  assert.is(!!user.password, true); // Should be hashed
};

// Component test helpers
export const create_mock_component_props = (overrides = {}) => {
  return {
    theme: 'light',
    user: {
      _id: 'mock_user_id',
      emailAddress: 'mock@test.com',
      name: 'Mock User',
    },
    ...overrides,
  };
};

export const create_mock_page_component = (content = 'Mock Page Content') => {
  return {
    render: () => `<div class="mock-page">${content}</div>`,
  };
};

// API test helpers
export const assert_api_error = (assert, error, expected_message = null) => {
  assert.is(!!error, true);
  if (expected_message) {
    assert.is(error.message.includes(expected_message), true);
  }
};

export const assert_api_success = (assert, result) => {
  assert.is(!!result, true);
  assert.is(typeof result, 'object');
};
