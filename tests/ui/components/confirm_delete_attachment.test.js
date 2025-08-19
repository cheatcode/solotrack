import test from '@joystick.js/test';

test.that('confirm delete attachment renders dialog elements', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog="confirm_delete_attachment"'), true);
  assert.is(html.includes('mod-dialog'), true);
  assert.is(html.includes('mod-dialog-body'), true);
});

test.that('confirm delete attachment renders warning icon and styling', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-icon-triangle-alert'), true);
  assert.is(html.includes('mod-text-warning'), true);
  assert.is(html.includes('mod-dialog-icon'), true);
});

test.that('confirm delete attachment renders internationalized text', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should contain i18n function calls for title and subtitle
  assert.is(html.includes('confirm_delete_attachment.title'), true);
  assert.is(html.includes('confirm_delete_attachment.subtitle'), true);
  assert.is(html.includes('confirm_delete_attachment.action.cancel'), true);
  assert.is(html.includes('confirm_delete_attachment.action.confirm'), true);
});

test.that('confirm delete attachment renders action buttons', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog-no'), true);
  assert.is(html.includes('data-mod-dialog-yes'), true);
  assert.is(html.includes('mod-button'), true);
  assert.is(html.includes('mod-button-danger'), true);
});

test.that('confirm delete attachment has proper dialog structure', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check for proper dialog structure
  assert.is(html.includes('<div class="mod-dialog-content">'), true);
  assert.is(html.includes('<div class="mod-dialog-actions">'), true);
  assert.is(html.includes('mod-dialog-title'), true);
  assert.is(html.includes('mod-dialog-subtitle'), true);
});

test.that('confirm delete attachment renders with proper button styling', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_attachment/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Cancel button should be basic mod-button
  assert.is(html.includes('data-mod-dialog-no class="mod-button"'), true);
  // Confirm button should have danger styling
  assert.is(html.includes('data-mod-dialog-yes class="mod-button mod-button-danger"'), true);
});
