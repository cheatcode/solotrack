import test from '@joystick.js/test';

test.that('parse_hashtags extracts hashtags from text', async (assert = {}) => {
  const parse_hashtags = await test.load('lib/parse_hashtags.js', { default: true });
  
  const input = 'This is a task with #urgent and #bug tags';
  const result = parse_hashtags(input);
  
  assert.is(typeof result, 'object');
  assert.is(result.task, 'This is a task with  and  tags');
  assert.is(Array.isArray(result.tags), true);
  assert.is(result.tags.length, 2);
  assert.is(result.tags.includes('urgent'), true);
  assert.is(result.tags.includes('bug'), true);
});

test.that('parse_hashtags handles text without hashtags', async (assert = {}) => {
  const parse_hashtags = await test.load('lib/parse_hashtags.js', { default: true });
  
  const input = 'This is a task without any tags';
  const result = parse_hashtags(input);
  
  assert.is(result.task, 'This is a task without any tags');
  assert.is(Array.isArray(result.tags), true);
  assert.is(result.tags.length, 0);
});

test.that('parse_hashtags handles empty string', async (assert = {}) => {
  const parse_hashtags = await test.load('lib/parse_hashtags.js', { default: true });
  
  const result = parse_hashtags('');
  
  assert.is(result.task, '');
  assert.is(Array.isArray(result.tags), true);
  assert.is(result.tags.length, 0);
});

test.that('parse_hashtags handles multiple hashtags', async (assert = {}) => {
  const parse_hashtags = await test.load('lib/parse_hashtags.js', { default: true });
  
  const input = 'Fix #bug in #frontend #ui component #asap';
  const result = parse_hashtags(input);
  
  assert.is(result.tags.length, 4);
  assert.is(result.tags.includes('bug'), true);
  assert.is(result.tags.includes('frontend'), true);
  assert.is(result.tags.includes('ui'), true);
  assert.is(result.tags.includes('asap'), true);
});

test.after(async () => {
  // Cleanup after all tests in this file
});
