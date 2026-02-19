'use strict';

class TreeViewNavigation {
  constructor(node) {
    if (!node) return;

    this.treeNode = node;
    this.navNode = node.parentElement;
    this.iframe = document.getElementById('contentFrame');

    // bind once
    this.onKeydownBound = this.onKeydown.bind(this);
    this.onLinkClickBound = this.onLinkClick.bind(this);
    this.onIconClickBound = this.onIconClick.bind(this);
    this.onBodyFocusinBound = this.onBodyFocusin.bind(this);

    document.body.addEventListener('focusin', this.onBodyFocusinBound);
    document.body.addEventListener('mousedown', this.onBodyFocusinBound);

    this.initTreeitems();

    /* auto load first page */
    const first = this.getAllTreeitems()[0];
    if (first && this.iframe && !this.iframe.src) {
      this.loadPage(first);
    }
  }

  /* ---------- INIT ---------- */

  initTreeitems() {
    this.getAllTreeitems().forEach((ti, i) => {
      ti.removeEventListener('keydown', this.onKeydownBound);
      ti.removeEventListener('click', this.onLinkClickBound);

      ti.addEventListener('keydown', this.onKeydownBound);
      ti.addEventListener('click', this.onLinkClickBound);

      ti.tabIndex = i === 0 ? 0 : -1;

      const groupNode = this.getGroupNode(ti);
      if (groupNode) {
        const icon = ti.querySelector('.icon');
        if (icon) {
          icon.removeEventListener('click', this.onIconClickBound);
          icon.addEventListener('click', this.onIconClickBound);
        }
      }
    });
  }

  /* ---------- HELPERS ---------- */

  getAllTreeitems() {
    return Array.from(this.treeNode.querySelectorAll('[role="treeitem"]'));
  }

  getVisibleTreeitems() {
    return this.getAllTreeitems().filter((item) => {
      let parent = item.parentElement;

      while (parent && parent !== this.treeNode) {
        if (parent.getAttribute('role') === 'group') {
          const owner = this.treeNode.querySelector(
            '[aria-owns="' + parent.id + '"]'
          );

          if (owner && owner.getAttribute('aria-expanded') !== 'true') {
            return false;
          }
        }
        parent = parent.parentElement;
      }
      return true;
    });
  }

  getGroupNode(treeitem) {
    const id = treeitem.getAttribute('aria-owns');
    return id ? document.getElementById(id) : null;
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
    this.getAllTreeitems().forEach((item) => {
      if (item.href === url) {
        item.setAttribute('aria-current', 'page');
        this.setTabIndex(item);
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  setTabIndex(treeitem) {
    this.getAllTreeitems().forEach((item) => (item.tabIndex = -1));
    treeitem.tabIndex = 0;
  }

  loadPage(treeitem) {
    if (!this.iframe) return;

    this.iframe.src = treeitem.href;
    this.updateAriaCurrent(treeitem.href);

    this.setTabIndex(treeitem);
    treeitem.focus();
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

    this.setTabIndex(treeitem);
    treeitem.focus();

    event.preventDefault();
    event.stopPropagation();
  }

  onLinkClick(event) {
    const item = event.currentTarget;

    // if expandable → toggle
    if (this.isExpandable(item)) {
      if (this.isExpanded(item)) {
        this.collapseTreeitem(item);
      } else {
        this.expandTreeitem(item);
      }

      this.setTabIndex(item);
      item.focus();
      event.preventDefault();
      return;
    }

    // normal leaf → load page
    if (this.iframe) {
      this.loadPage(item);
      event.preventDefault();
    }
  }

  onKeydown(event) {
    const tgt = event.currentTarget;
    let handled = false;

    const visible = this.getVisibleTreeitems();
    const index = visible.indexOf(tgt);

    switch (event.key) {
      case 'ArrowUp':
        if (index > 0) this.setFocusToTreeitem(visible[index - 1]);
        handled = true;
        break;

      case 'ArrowDown':
        if (index !== -1 && index < visible.length - 1) {
          this.setFocusToTreeitem(visible[index + 1]);
        }
        handled = true;
        break;

      case 'ArrowRight':
        if (this.isExpandable(tgt)) {
          if (!this.isExpanded(tgt)) {
            this.expandTreeitem(tgt);
          } else if (index < visible.length - 1) {
            this.setFocusToTreeitem(visible[index + 1]);
          }
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
        this.setFocusToTreeitem(visible[0]);
        handled = true;
        break;

      case 'End':
        this.setFocusToTreeitem(visible[visible.length - 1]);
        handled = true;
        break;

      case 'Enter':
      case ' ':
        this.loadPage(tgt);
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  setFocusToTreeitem(item) {
    if (!item) return;
    this.setTabIndex(item);
    item.focus();
  }
}

/* INIT */
window.addEventListener('load', () => {
  document.querySelectorAll('nav [role="tree"]').forEach((tree) => {
    new TreeViewNavigation(tree);
  });
});

function autoResizeIframe() {
  const iframe = document.getElementById("contentFrame");
  if (!iframe) return;

  iframe.addEventListener("load", () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      const contentHeight = Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight
      );

      iframe.style.height = contentHeight + "px";
    } catch (e) {}
  });
}

window.addEventListener("load", autoResizeIframe);
