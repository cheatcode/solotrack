const generate_pagination = (total_items = 0, per_page = 25, current_page = 1) => {
  const total_pages = Math.ceil(total_items / per_page);
  
  if (total_pages <= 1) {
    return '';
  }
  
  const get_visible_pages = (current, total) => {
    const pages = [];

    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }
    
    pages.push(total);
    
    return pages;
  };
  
  const visible_pages = get_visible_pages(current_page, total_pages);
  
  let html = '';
  
  const prev_disabled = current_page === 1 ? 'disabled="true"' : '';
  html += `<button class="mod-button mod-pagination-previous" ${prev_disabled}><i class="mod-icon-chevron-left"></i> Newer</button>`;

  visible_pages.forEach(page => {
    if (page === '...') {
      let data_page = '';
      if (visible_pages[visible_pages.indexOf(page) - 1] !== undefined && visible_pages[visible_pages.indexOf(page) - 1] !== '...') {
        data_page = visible_pages[visible_pages.indexOf(page) - 1] + 1;
      } else if (visible_pages[visible_pages.indexOf(page) + 1] !== undefined && visible_pages[visible_pages.indexOf(page) + 1] !== '...') {
        data_page = visible_pages[visible_pages.indexOf(page) + 1] - 1;
      }
      html += `<button class="mod-button" disabled data-page="${data_page}"><i class="mod-icon-ellipsis"></i></button>`;
    } else {
      const active_class = page === current_page ? ' is-active' : '';
      html += `<button class="mod-button${active_class}" data-page="${page}">${page}</button>`;
    }
  });

  const next_disabled = current_page === total_pages ? 'disabled="true"' : '';
  html += `<button class="mod-button mod-pagination-next" ${next_disabled}>Older <i class="mod-icon-chevron-right"></i></button>`;
  
  return html;
};

export default generate_pagination;
