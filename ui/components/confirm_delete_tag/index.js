import joystick from '@joystick.js/ui';

const ConfirmDeleteTag = joystick.component({
  css: {
    min: {
      width: {
        0: `
        `,
      },
    },
  },
  render: ({ i18n }) => {
    return `
      <div data-mod-dialog="confirm_delete_tag" class="mod-dialog">
        <div class="mod-dialog-body">
          <div class="mod-dialog-icon">
            <i class="mod-icon-triangle-alert mod-text-warning"></i>
          </div>
          <div class="mod-dialog-content">
            <p class="mod-dialog-title">${i18n('confirm_delete_tag.title')}</p>
            <p class="mod-dialog-subtitle">${i18n('confirm_delete_tag.subtitle')}</p>
          </div>
          <div class="mod-dialog-actions">
            <button data-mod-dialog-no class="mod-button">${i18n('confirm_delete_tag.action.cancel')}</button>
            <button data-mod-dialog-yes class="mod-button mod-button-danger">${i18n('confirm_delete_tag.action.confirm')}</button>
          </div>
        </div>
      </div>
    `;
  },
});

export default ConfirmDeleteTag;