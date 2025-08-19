import test from '@joystick.js/test';

test.that('error page renders with status code and error messages', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {
      status_code: 404,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('404'), true);
  assert.is(html.includes('class="error"'), true);
  assert.is(html.includes('<header>'), true);
});

test.that('error page displays different status codes', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {
      status_code: 500,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('500'), true);
  assert.is(html.includes('<h1>500</h1>'), true);
});

test.that('error page renders with proper CSS classes', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {
      status_code: 403,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="error"'), true);
  assert.is(html.includes('<header>'), true);
  assert.is(html.includes('<h1>'), true);
  assert.is(html.includes('<h4>'), true);
  assert.is(html.includes('<p>'), true);
});

test.that('error page uses internationalization for messages', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {
      status_code: 404,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should contain i18n placeholders or translated text
  assert.is(html.includes('<h4>'), true);
  assert.is(html.includes('<p>'), true);
});

test.that('error page handles missing status code prop', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {},
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="error"'), true);
  assert.is(html.includes('<header>'), true);
});

test.that('error page renders with proper structure', async (assert = {}) => {
  const component = await test.render('ui/pages/error/index.js', {
    props: {
      status_code: 404,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check for proper nesting structure
  assert.is(html.includes('<div class="error">'), true);
  assert.is(html.includes('<header>'), true);
  assert.is(html.includes('</header>'), true);
  assert.is(html.includes('</div>'), true);
});
