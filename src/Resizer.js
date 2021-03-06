module.exports = function (tableComponent, resizeObj, columnWidths) {

  function getSizeOfElements(ids) {
    if (!(ids && ids.length)) return 0;
    let total = 0;
    ids.forEach(id => {
      let elem = document.getElementById(id);
      if (elem && elem.offsetHeight) {
        total += elem.offsetHeight;
      }
    });
    return total;
  }

  function setHeaderWidths() {
    let widths = [];
    let tbody = document.getElementById(tableComponent.bodyId);
    let thead = document.getElementById(tableComponent.headerId);
    if (!(tbody && thead)) return;
    if (!(thead.rows.length && tbody.rows.length)) return;

    let cellWidths = [];
    for (let i = 0; i < tbody.rows[0].cells.length; i++) {
      let width = tbody.rows[0].cells[i].offsetWidth;
      cellWidths.push(width);
    }
    for (let i = 0; i < thead.rows[0].cells.length; i++) {
      let width = cellWidths[i];
      let th = thead.rows[0].cells[i];
      th.style.width = '' + width + 'px';
    }
  }

  var id = tableComponent.id;
  let extra = 0;
  let minSize = 0

  if (typeof resizeObj.minSize === 'number') {
    minSize = resizeObj.minSize;
  }

  if (typeof resizeObj.extra === 'number') {
    extra = resizeObj.extra;
  }
  if (resizeObj.elements && resizeObj.elements.length) {
    extra = extra + getSizeOfElements(resizeObj.elements);
  }
  if (extra) {
    let headerElement = document.getElementById(tableComponent.headerId);
    if (headerElement) {
      extra = extra + headerElement.offsetHeight;
    }
  }

  function resize() {
    let h = window.innerHeight;
    let table = document.getElementById(tableComponent.id);
    let tableBody = document.getElementById(tableComponent.bodyId);
    let tableHeader = document.getElementById(tableComponent.headerId);

    if (!table) {
      return;
    }

    let th = table.offsetHeight;
    let tw = table.offsetWidth;
    if (extra) {
      th = h - extra;
    }
    if (th < minSize) {
      th = minSize;
    }
    tableBody.style.height = '' + th + 'px';
    setHeaderWidths();
  }

  this.addHandler = function () {
    window.addEventListener('resize', resize);
    resize();
  };

  this.removeHandler = function() {
    document.body.removeEventListener('resize', resize);
  }
}
