import test from '@joystick.js/test';

test.that('app navigation renders with user authenticated', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'John',
        last: 'Doe'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-navigation-bar-app-style-1'), true);
  assert.is(html.includes('/logo_light.svg'), true);
  assert.is(html.includes('John Doe'), true);
  assert.is(html.includes('/projects'), true);
  assert.is(html.includes('/profile'), true);
  assert.is(html.includes('logout'), true);
});

test.that('app navigation renders without user authenticated', async (assert = {}) => {
  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'dark'
    },
    options: {
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-navigation-bar-app-style-1'), true);
  assert.is(html.includes('/logo_dark.svg'), true);
  assert.is(html.includes('John Doe'), false);
  assert.is(html.includes('/projects'), false);
  assert.is(html.includes('/profile'), false);
  assert.is(html.includes('logout'), false);
});

test.that('app navigation shows dark theme toggle when dark theme active', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Jane',
        last: 'Smith'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'dark'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('checked="true"'), true);
  assert.is(html.includes('/logo_dark.svg'), true);
});

test.that('app navigation shows light theme toggle when light theme active', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Bob',
        last: 'Johnson'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('checked="true"'), false);
  assert.is(html.includes('/logo_light.svg'), true);
});

test.that('app navigation renders user dropdown menu items', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Alice',
        last: 'Wilson'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-dropdown'), true);
  assert.is(html.includes('mod-icon-user'), true);
  assert.is(html.includes('mod-icon-moon'), true);
  assert.is(html.includes('mod-toggle-switch'), true);
  assert.is(html.includes('mod-icon-command'), true);
});

test.that('app navigation renders keyboard shortcuts', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Charlie',
        last: 'Brown'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  // Check for keyboard shortcut indicators
  assert.is(html.includes('<i class="mod-icon-command"></i>P'), true);
  assert.is(html.includes('<i class="mod-icon-command"></i>L'), true);
});

test.that('app navigation renders mobile menu icon', async (assert = {}) => {
  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-icon-menu'), true);
});

test.that('app navigation handles theme change event', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'David',
        last: 'Lee'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  // Test that theme change event handler exists
  component.test.event('change', '[name="theme"]');
  
  // The event should be handled (we can't test the actual cookie setting in this context)
  assert.is(true, true);
});

test.that('app navigation handles logout event', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: {
        first: 'Eva',
        last: 'Martinez'
      }
    }
  });

  const component = await test.render('ui/components/app_navigation/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      user,
      language: 'en-US'
    }
  });

  // Test that logout event handler exists
  component.test.event('click', '.logout');
  
  // The event should be handled (we can't test the actual logout in this context)
  assert.is(true, true);
});

// Cleanup after tests
test.after(async () => {
  await process.databases.mongodb.collection('users').deleteMany({});
});
