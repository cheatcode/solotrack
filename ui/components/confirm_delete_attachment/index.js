import joystick from '@joystick.js/ui-canary';

const ConfirmDeleteAttachment = joystick.component({
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
      <div data-mod-dialog="confirm_delete_attachment" class="mod-dialog">
        <div class="mod-dialog-body">
          <div class="mod-dialog-icon">
            <i class="mod-icon-triangle-alert mod-text-warning"></i>
          </div>
          <div class="mod-dialog-content">
            <p class="mod-dialog-title">${i18n('confirm_delete_attachment.title')}</p>
            <p class="mod-dialog-subtitle">${i18n('confirm_delete_attachment.subtitle')}</p>
          </div>
          <div class="mod-dialog-actions">
            <button data-mod-dialog-no class="mod-button">${i18n('confirm_delete_attachment.action.cancel')}</button>
            <button data-mod-dialog-yes class="mod-button mod-button-danger">${i18n('confirm_delete_attachment.action.confirm')}</button>
          </div>
        </div>
      </div>
    `;
  },
});

export default ConfirmDeleteAttachment;