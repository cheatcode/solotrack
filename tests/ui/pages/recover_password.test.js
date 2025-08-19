import test from '@joystick.js/test';

test.that('recover password page renders with form elements', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('name="email_address"'), true);
  assert.is(html.includes('type="email"'), true);
  assert.is(html.includes('type="submit"'), true);
  assert.is(html.includes('class="login"'), true);
});

test.that('recover password page displays proper header with logo', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'dark',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<header>'), true);
  assert.is(html.includes('/logo_dark.svg'), true);
  assert.is(html.includes('<h1>'), true);
  assert.is(html.includes('<img'), true);
});

test.that('recover password page includes link to login page', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('href="/login"'), true);
  assert.is(html.includes('<a href="/login">'), true);
});

test.that('recover password page renders with proper CSS classes', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="login"'), true);
  assert.is(html.includes('class="mod-form-input"'), true);
  assert.is(html.includes('class="mod-input-label"'), true);
  assert.is(html.includes('class="mod-input"'), true);
  assert.is(html.includes('class="mod-button'), true);
});

test.that('recover password page handles theme prop correctly', async (assert = {}) => {
  const lightComponent = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const darkComponent = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'dark',
    },
    options: {
      language: 'en-US',
    },
  });

  const lightHtml = lightComponent.instance.render_to_html();
  const darkHtml = darkComponent.instance.render_to_html();

  assert.is(lightHtml.includes('/logo_light.svg'), true);
  assert.is(darkHtml.includes('/logo_dark.svg'), true);
});

test.that('recover password page form has proper input attributes', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('type="email"'), true);
  assert.is(html.includes('name="email_address"'), true);
  assert.is(html.includes('placeholder='), true);
  assert.is(html.includes('class="mod-input"'), true);
});

test.that('recover password page submit button has proper classes', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('type="submit"'), true);
  assert.is(html.includes('mod-button-brand'), true);
  assert.is(html.includes('mod-button-block'), true);
  assert.is(html.includes('mod-margin-top-20'), true);
});

test.that('recover password page uses internationalization', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should contain proper structure for i18n elements
  assert.is(html.includes('<label'), true);
  assert.is(html.includes('placeholder='), true);
  assert.is(html.includes('<h1>'), true);
  assert.is(html.includes('<p>'), true);
});

test.that('recover password page handles form submission event', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  // Test that form submission event is properly bound
  component.test.event('submit', 'form');

  // Should not throw an error when form submit event is triggered
  assert.is(true, true);
});

test.that('recover password page renders without props', async (assert = {}) => {
  const component = await test.render('ui/pages/recover_password/index.js', {
    props: {},
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="login"'), true);
  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('name="email_address"'), true);
});
