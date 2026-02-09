'use strict';

class TreeViewNavigation {
  constructor(node) {
    if (typeof node !== 'object') return;

    this.keyCode = { SPACE: 32, RETURN: 13 };

    document.body.addEventListener('focusin', this.onBodyFocusin.bind(this));
    document.body.addEventListener('mousedown', this.onBodyFocusin.bind(this));

    this.treeNode = node;
    this.navNode = node.parentElement;

    this.treeitems = this.treeNode.querySelectorAll('[role="treeitem"]');
    this.iframe = document.getElementById('contentFrame');

    for (let i = 0; i < this.treeitems.length; i++) {
      let ti = this.treeitems[i];

      ti.addEventListener('keydown', this.onKeydown.bind(this));
      ti.addEventListener('click', this.onLinkClick.bind(this));

      ti.tabIndex = i === 0 ? 0 : -1;

      const groupNode = this.getGroupNode(ti);
      if (groupNode) {
        const icon = ti.querySelector('span.icon');
        if (icon) icon.addEventListener('click', this.onIconClick.bind(this));
      }
    }

    /* load first page automatically */
    if (this.treeitems.length && this.iframe && !this.iframe.src) {
      this.iframe.src = this.treeitems[0].href;
      this.updateAriaCurrent(this.treeitems[0].href);
    }
  }

  /* ---------- CORE ---------- */

  getGroupNode(treeitem) {
    const id = treeitem.getAttribute('aria-owns');
    return id ? document.getElementById(id) : false;
  }

  isExpandable(treeitem) {
    return treeitem.hasAttribute('aria-expanded');
  }

  isExpanded(treeitem) {
    return treeitem.getAttribute('aria-expanded') === 'true';
  }

  expandTreeitem(treeitem) {
    treeitem.setAttribute('aria-expanded', 'true');
  }

  collapseTreeitem(treeitem) {
    treeitem.setAttribute('aria-expanded', 'false');
  }

  /* ---------- CURRENT PAGE ---------- */

  updateAriaCurrent(url) {
    this.treeitems.forEach((item) => {
      if (item.href === url) {
        item.setAttribute('aria-current', 'page');
        this.setTabIndex(item);
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  setTabIndex(treeitem) {
    this.treeitems.forEach((item) => (item.tabIndex = -1));
    treeitem.tabIndex = 0;
  }

  /* ---------- EVENTS ---------- */

  onBodyFocusin(event) {
    if (this.treeNode.contains(event.target)) {
      this.navNode.classList.add('focus');
    } else {
      this.navNode.classList.remove('focus');
    }
  }

  onIconClick(event) {
    const treeitem = event.currentTarget.closest('[role="treeitem"]');

    if (this.isExpanded(treeitem)) this.collapseTreeitem(treeitem);
    else this.expandTreeitem(treeitem);

    event.preventDefault();
    event.stopPropagation();
  }

  onLinkClick(event) {
    const link = event.currentTarget;

    /* load in iframe */
    if (this.iframe) {
      this.iframe.src = link.href;
      this.updateAriaCurrent(link.href);
      event.preventDefault();
    }
  }

  onKeydown(event) {
    const tgt = event.currentTarget;
    let handled = false;

    switch (event.key) {
      case 'ArrowUp':
        this.setFocusToPreviousTreeitem(tgt);
        handled = true;
        break;

      case 'ArrowDown':
        this.setFocusToNextTreeitem(tgt);
        handled = true;
        break;

      case 'ArrowRight':
        if (this.isExpandable(tgt)) {
          if (!this.isExpanded(tgt)) this.expandTreeitem(tgt);
          else this.setFocusToNextTreeitem(tgt);
        }
        handled = true;
        break;

      case 'ArrowLeft':
        if (this.isExpandable(tgt) && this.isExpanded(tgt)) {
          this.collapseTreeitem(tgt);
        }
        handled = true;
        break;

      case 'Home':
        this.setFocusToTreeitem(this.treeitems[0]);
        handled = true;
        break;

      case 'End':
        this.setFocusToTreeitem(this.treeitems[this.treeitems.length - 1]);
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  setFocusToTreeitem(item) {
    item.focus();
  }

  setFocusToNextTreeitem(item) {
    const list = Array.from(this.treeitems);
    const index = list.indexOf(item);
    if (index < list.length - 1) list[index + 1].focus();
  }

  setFocusToPreviousTreeitem(item) {
    const list = Array.from(this.treeitems);
    const index = list.indexOf(item);
    if (index > 0) list[index - 1].focus();
  }
}

/* INIT */
window.addEventListener('load', () => {
  const trees = document.querySelectorAll('nav [role="tree"]');
  trees.forEach((t) => new TreeViewNavigation(t));
});
