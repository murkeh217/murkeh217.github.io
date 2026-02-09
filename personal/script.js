'use strict';

class TreeViewNavigation {
  constructor(node) {
    if (typeof node !== 'object') return;

    this.treeNode = node;
    this.navNode = node.parentElement;
    this.contentNode = document.querySelector('#content'); // where pages load

    this.treeitems = this.treeNode.querySelectorAll('[role="treeitem"]');

    document.body.addEventListener('focusin', this.onBodyFocusin.bind(this));

    for (let i = 0; i < this.treeitems.length; i++) {
      let ti = this.treeitems[i];

      ti.tabIndex = i === 0 ? 0 : -1;

      ti.addEventListener('click', this.onLinkClick.bind(this));
      ti.addEventListener('keydown', this.onKeydown.bind(this));

      const groupNode = this.getGroupNode(ti);
      if (groupNode) {
        const icon = ti.querySelector('.icon');
        if (icon) icon.addEventListener('click', this.onIconClick.bind(this));
      }
    }

    // load page based on URL
    this.loadPage(window.location.href);
    this.updateAriaCurrent(window.location.href);

    window.addEventListener('popstate', () => {
      this.loadPage(window.location.href, false);
      this.updateAriaCurrent(window.location.href);
    });
  }

  /* ---------- PAGE LOADING ---------- */

  async loadPage(url, push = false) {
    if (!this.contentNode) return;

    try {
      const res = await fetch(url);
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const newContent =
        doc.querySelector('#content') || doc.querySelector('main') || doc.body;

      this.contentNode.innerHTML = newContent.innerHTML;

      if (push) history.pushState({}, '', url);
    } catch (e) {
      this.contentNode.innerHTML = '<h2>Page not found</h2>';
    }
  }

  /* ---------- TREE ---------- */

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
    if (this.treeNode.contains(event.target))
      this.navNode.classList.add('focus');
    else this.navNode.classList.remove('focus');
  }

  onIconClick(event) {
    const treeitem = event.currentTarget.closest('[role="treeitem"]');

    if (this.isExpanded(treeitem)) this.collapseTreeitem(treeitem);
    else this.expandTreeitem(treeitem);

    event.preventDefault();
    event.stopPropagation();
  }

  onLinkClick(event) {
    const tgt = event.currentTarget;
    event.preventDefault();

    this.loadPage(tgt.href, true);
    this.updateAriaCurrent(tgt.href);
  }

  onKeydown(event) {
    const tgt = event.currentTarget;
    let handled = false;

    switch (event.key) {
      case 'Enter':
      case ' ':
        this.loadPage(tgt.href, true);
        this.updateAriaCurrent(tgt.href);
        handled = true;
        break;

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
        if (this.isExpandable(tgt) && this.isExpanded(tgt))
          this.collapseTreeitem(tgt);
        else this.setFocusToParentTreeitem(tgt);
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
