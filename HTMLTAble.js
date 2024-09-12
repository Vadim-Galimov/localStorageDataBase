

class HTMLTable {
  constructor(table) {
    this.tablePlace = table.tablePlace;
    this.tableKey = table.tableKey;

    this.headers = table.headers;
    this.items = table.items;
    this.itemTag = table.itemTag;

    this.rowButtons = table.rowButtons;
    this.columnButtons = table.columnButtons;
    this.divButtons = table.divButtons;
   
    this.input = table.input;

    let element = document.createElement("div");
    table.tablePlace.append(element);
    this.div = element;

    this.#innerMethods.tableObject = this;
  }
  createTable() {
    this.#innerMethods.addInputText();
    this.#innerMethods.createMainTable();
    this.#innerMethods.addRowButtons();
    this.#innerMethods.addColumnHeaders();
  }
  createEditor() {
    this.#innerMethods.addDivButtons();
    this.#innerMethods.addInputText();
    this.#innerMethods.createMainTable();
    this.#innerMethods.addRowButtons();
    this.#innerMethods.addColumnButtons();
  }
  buttonMethods = {
    getRowKey(event) {
      return  event.target.parentNode.parentNode.getAttribute("data-row-key");
    },
    getTableAfterAddRow() {

      let length = list.items[0].length;
      let newArr = [];
      for (let i = 0; i < length; i++) newArr.push("");
      list.items.push(newArr);

      return list.items;
    },

    getTableAfterAddColumn() {

      list.items.map((item) => {
        item.push("");
      });

      return list.items;
    },

    
    getTableAfterEdit() {

      let arr = [];
      let rows = [
        ...dbTableManager.workspace.querySelectorAll(
          `tr[data-row-type="item"]`
        ),
      ];
      rows.forEach((tr) => {
        let miniArr = [];
  
        let tds = [...tr.querySelectorAll("td")];
        tds.forEach((td) => {
          miniArr.push(td.firstChild.value);
        });
        arr.push(miniArr);
      });
      return arr;
  
    },

    getTableAfterDeleteRow() {

      let index =
      event.target.parentNode.parentNode.getAttribute("data-row-index");
    list.items.splice(index, 1);

      return list.items;
    },

    getTableAfterDeleteColumn() {

      let index =
      event.target.parentNode.getAttribute("data-column-number");
    list.items.forEach((item) => {
      item.splice(index, 1);
    });


      return list.items;
    },


  }


  #innerMethods = {
    createMainTable() {

      const table = document.createElement("table");
      table.setAttribute("data-table-key", this.tableObject.tableKey);

      let innerHTML = this.tableObject.items.reduce(
        (innerHTML, item, index) => {
          let tr = "";
          item.forEach((td) => {
            tr += `<td><${this.tableObject.itemTag}>${td}</${this.tableObject.itemTag}></td>`;
          });

          innerHTML +=
            `<tr data-row-type="item" data-row-key='${item[0]}' data-row-index= '${index}'>` +
            tr +
            "</tr>";
          return innerHTML;
        },
        ""
      );

      table.innerHTML = innerHTML;

      this.tableObject.div.append(table);
    },

    addRowButtons() {
      let rowButtons = [...this.tableObject.div.querySelectorAll(` tr`)];

      let buttonsHTML = this.tableObject.rowButtons.reduce(
        (buttonsHTML, button) => {
          return buttonsHTML + `<button  >${button.buttonText}</button>`;
        },
        ""
      );

      let td = document.createElement("div");

      td.innerHTML = buttonsHTML;

      rowButtons.forEach((tr) => {
        let tdClone = td.cloneNode(true);

        tr.append(tdClone);
      });

      let trs = [...this.tableObject.div.querySelectorAll("tr")];

      trs.forEach((tr) => {
        this.tableObject.rowButtons.forEach((button, index) => {
          let buttons = [...tr.querySelectorAll("button")];
          buttons[index].addEventListener("click", button.buttonFunction);
        });
      });
    },

    addColumnHeaders() {
      let tHead = this.tableObject.headers.reduce((tHead, th) => {
        return tHead + `<th>${th}</th>`;
      }, "");

      let newDiv = document.createElement("tr");
      newDiv.innerHTML = tHead;
      newDiv.setAttribute("data-row-type", "header");
      this.tableObject.div.querySelector("tbody").prepend(newDiv);
    },

    addInputText() {
      let div = document.createElement("div");

      let buttonsHTML = this.tableObject.input.buttons.reduce(
        (buttonsHTML, button) => {
          return buttonsHTML + `<button>${button.buttonText}</button>`;
        },
        ""
      );

      let innerHTML =
        `<input type="text" value='${this.tableObject.input.value}'>` +
        buttonsHTML;

      div.innerHTML = innerHTML;

      this.tableObject.div.append(div);

      let buttons = [...div.querySelectorAll("button")];

      this.tableObject.input.buttons.forEach((button, index) => {
        buttons[index].addEventListener("click", function () {
          button.buttonFunction(div.querySelector("input").value);
        });
      });
    },

    addDivButtons() {
      let div = document.createElement("div");

      let buttonsHTML = this.tableObject.divButtons.reduce(
        (buttonsHTML, button) => {
          return buttonsHTML + `<button>${button.buttonText}</button>`;
        },
        ""
      );

      div.innerHTML = buttonsHTML;

      this.tableObject.div.append(div);

      let buttons = [...div.querySelectorAll("button")];

      this.tableObject.divButtons.forEach((button, index) => {
        buttons[index].addEventListener("click", button.buttonFunction);
      });
    },
    
    addColumnButtons() {
      if (!this.tableObject.div.querySelector("th")) {
        let length = list.items[0].length;
        let result = "";
        for (let i = 0; i < length; i++) {
          result += `<th></th>`;
        }
        let tr = document.createElement("tr");
        tr.innerHTML = result;
        tr.setAttribute("data-row-type", "header");
        this.tableObject.div.querySelector("tbody").prepend(tr);
      }

      let headers = [
        ...this.tableObject.div.querySelectorAll(
          "tr[data-row-type='header'] th"
        ),
      ];
      let button = document.createElement("div");

      let buttonsHTML = this.tableObject.columnButtons.reduce(
        (buttonsHTML, button) => {
          return buttonsHTML + `<button  >${button.buttonText}</button>`;
        },
        ""
      );

      button.innerHTML = buttonsHTML;

      headers.forEach((th, index) => {
        let thClone = button.cloneNode(true);
        thClone.setAttribute("data-column-number", index);

        th.prepend(thClone);
      });
      let ths = [
        ...this.tableObject.div.querySelectorAll("tr[data-row-type=header] th"),
      ];
      console.log(321, ths);
      ths.forEach((th) => {
        this.tableObject.columnButtons.forEach((button, index) => {
          let buttons = [...th.querySelectorAll("button")];
          buttons[index].addEventListener("click", button.buttonFunction);
        });
      });
    },
  };
  


}


function addElement(parent, tag, innerHTML) {
  element = document.createElement(tag);
  element.innerHTML = innerHTML;
  parent.append(element);
}