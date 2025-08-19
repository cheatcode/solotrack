import test from '@joystick.js/test';

test.that('confirm delete project renders dialog elements', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog="confirm_delete_project"'), true);
  assert.is(html.includes('class="mod-dialog"'), true);
  assert.is(html.includes('class="mod-dialog-body"'), true);
  assert.is(html.includes('class="mod-dialog-icon"'), true);
  assert.is(html.includes('mod-icon-triangle-alert'), true);
  assert.is(html.includes('mod-text-warning'), true);
  assert.is(html.includes('class="mod-dialog-content"'), true);
  assert.is(html.includes('class="mod-dialog-title"'), true);
  assert.is(html.includes('class="mod-dialog-subtitle"'), true);
  assert.is(html.includes('class="mod-dialog-actions"'), true);
});

test.that('confirm delete project renders action buttons', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog-no'), true);
  assert.is(html.includes('data-mod-dialog-yes'), true);
  assert.is(html.includes('mod-button-danger'), true);
  assert.is(html.includes('<button'), true);
});

test.that('confirm delete project uses internationalization', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check that i18n keys are being used (they should be replaced with actual text)
  assert.is(html.includes('confirm_delete_project.title'), false);
  assert.is(html.includes('confirm_delete_project.subtitle'), false);
  assert.is(html.includes('confirm_delete_project.action.cancel'), false);
  assert.is(html.includes('confirm_delete_project.action.confirm'), false);
});

test.that('confirm delete project has warning styling', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-text-warning'), true);
  assert.is(html.includes('mod-button-danger'), true);
  assert.is(html.includes('mod-icon-triangle-alert'), true);
});

test.that('confirm delete project renders with proper dialog structure', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check proper nesting structure
  assert.is(html.includes('<div data-mod-dialog="confirm_delete_project" class="mod-dialog">'), true);
  assert.is(html.includes('<div class="mod-dialog-body">'), true);
  assert.is(html.includes('<div class="mod-dialog-icon">'), true);
  assert.is(html.includes('<div class="mod-dialog-content">'), true);
  assert.is(html.includes('<div class="mod-dialog-actions">'), true);
});

test.that('confirm delete project has accessible button attributes', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_project/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check that buttons have proper data attributes for dialog functionality
  assert.is(html.includes('data-mod-dialog-no'), true);
  assert.is(html.includes('data-mod-dialog-yes'), true);
  
  // Check button classes
  assert.is(html.includes('class="mod-button"'), true);
  assert.is(html.includes('class="mod-button mod-button-danger"'), true);
});
