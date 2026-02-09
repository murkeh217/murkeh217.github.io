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

    // highlight current page
    this.updateAriaCurrent(window.location.href);
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
        this.showTreeitem(item);
        this.setTabIndex(item);
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  showTreeitem(treeitem) {
    let parent = this.getParentTreeitem(treeitem);
    while (parent) {
      parent.setAttribute('aria-expanded', 'true');
      parent = this.getParentTreeitem(parent);
    }
  }

  setTabIndex(treeitem) {
    this.treeitems.forEach((item) => (item.tabIndex = -1));
    treeitem.tabIndex = 0;
  }

  getParentTreeitem(treeitem) {
    let node = treeitem.parentNode;
    if (node) node = node.parentNode;
    if (node) node = node.previousElementSibling;
    if (node && node.getAttribute('role') === 'treeitem') return node;
    return false;
  }

  /* ---------- VISIBILITY ---------- */

  isInSubtree(treeitem) {
    return (
      treeitem.parentNode &&
      treeitem.parentNode.parentNode &&
      treeitem.parentNode.parentNode.getAttribute('role') === 'group'
    );
  }

  isVisible(treeitem) {
    if (this.isInSubtree(treeitem)) {
      const parent = this.getParentTreeitem(treeitem);
      if (!parent || parent.getAttribute('aria-expanded') === 'false') {
        return false;
      }
    }
    return true;
  }

  getVisibleTreeitems() {
    return Array.from(this.treeitems).filter((ti) => this.isVisible(ti));
  }

  /* ---------- FOCUS ---------- */

  setFocusToTreeitem(item) {
    item.focus();
  }

  setFocusToNextTreeitem(item) {
    const list = this.getVisibleTreeitems();
    const index = list.indexOf(item);
    if (index < list.length - 1) this.setFocusToTreeitem(list[index + 1]);
  }

  setFocusToPreviousTreeitem(item) {
    const list = this.getVisibleTreeitems();
    const index = list.indexOf(item);
    if (index > 0) this.setFocusToTreeitem(list[index - 1]);
  }

  setFocusToParentTreeitem(item) {
    if (this.isInSubtree(item)) {
      const parent = item.parentNode.parentNode.previousElementSibling;
      if (parent) this.setFocusToTreeitem(parent);
    }
  }

  /* ---------- EVENTS ---------- */

  onBodyFocusin(event) {
    if (this.treeNode.contains(event.target)) {
      this.navNode.classList.add('focus');
    } else {
      this.navNode.classList.remove('focus');
    }
  }

  // icon expands only
  onIconClick(event) {
    const treeitem = event.currentTarget.closest('[role="treeitem"]');

    if (this.isExpanded(treeitem)) this.collapseTreeitem(treeitem);
    else this.expandTreeitem(treeitem);

    event.preventDefault();
    event.stopPropagation();
  }

  // allow normal navigation
  onLinkClick(event) {
    // DO NOT preventDefault → page will open
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
        } else {
          this.setFocusToParentTreeitem(tgt);
        }
        handled = true;
        break;

      case 'Home':
        this.setFocusToTreeitem(this.treeitems[0]);
        handled = true;
        break;

      case 'End':
        const list = this.getVisibleTreeitems();
        this.setFocusToTreeitem(list[list.length - 1]);
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

/* INIT */
window.addEventListener('load', () => {
  const trees = document.querySelectorAll('nav [role="tree"]');
  trees.forEach((t) => new TreeViewNavigation(t));
});
