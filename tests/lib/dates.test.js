import test from '@joystick.js/test';

test.that('timeago function returns relative time string', async (assert = {}) => {
  const { timeago } = await test.load('lib/dates.js');
  
  // Test with a recent timestamp
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const result = timeago(fiveMinutesAgo.toISOString());
  
  assert.is(typeof result, 'string');
  assert.is(result.includes('minutes ago'), true);
});

test.that('timeago function handles various time formats', async (assert = {}) => {
  const { timeago } = await test.load('lib/dates.js');
  
  // Test with different timestamp formats
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const result = timeago(yesterday.toISOString());
  assert.is(typeof result, 'string');
  assert.is(result.includes('day ago'), true);
});

test.that('timeago function handles empty string', async (assert = {}) => {
  const { timeago } = await test.load('lib/dates.js');
  
  const result = timeago('');
  assert.is(typeof result, 'string');
});

test.after(async () => {
  // Cleanup after all tests in this file
});
