import {LitElement} from '/@polymer/lit-element/lit-element.js';
import { html, svg, render } from '/lit-html/lit-html.js';

class FileListElement extends LitElement {
  static get properties() {
    return {
      items: Array
    };
  }
  constructor() {
      super();
      this.items = new Array();
  }

  _render({items}) {
    return html`
      <style>
        th {background-color: #aaaaaa}
        .file td {background-color: #dddddd}
        .dir td {background-color: #bbbbbb}
      </style>
      <a onclick="loadJson('${items[0].path}' + '/' + '..')">up</a>
      <a href="/csv/${items[0].path}">csv</a>
      <table>
        <tr>
          <th>name</th>
          <th>path</th>
          <th>size</th>
          <th>mtime</th>
          <th>isDirectory</th>
        </tr>
        ${items.map((i) => html`
        <tr class="${i.isDirectory ? 'dir' : 'file'}">
          <td>${i.name}</td>
          <td>${i.path}</td>
          <td>${i.size}</td>
          <td>${i.mtime}</td>
          ${i.isDirectory ?
            html`<td><div onclick="loadJson('${i.path}' + '/' + '${i.name}')">${i.isDirectory}</div></td>`:
            html`<td>${i.isDirectory}</td>`
          }
        </tr>`
      )}
      </table>`;""
  }
}

customElements.define('fm-list', FileListElement)
