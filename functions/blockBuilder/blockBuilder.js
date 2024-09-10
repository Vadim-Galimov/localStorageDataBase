const blockBuilder = {
  tables: {
    tableForEdit(key, dBBody) {
      blockBuilder.internalMethods.createTableWithButtonsFromDB(
        dBBody,
        [],
        [],
        [],
        document.querySelector(`#${dbTableManager.interface.id} .workSpace`)
      );

      result1 = "";
      try {
        dBBody.forEach((tr, index) => {
          console.log("index", index);
          if (index == 0) {
            tr1 = "<thead><tr>";
            tr.forEach((td) => {
              tr1 += `<th><textarea>${td}</textarea></th>`;
            });
            tr1 += "</tr></thead><tbody>";
          } else {
            tr1 = "<tr>";
            tr.forEach((td) => {
              tr1 += `<td><textarea>${td}</textarea></td>`;
            });
            tr1 += "</tr>";
          }
          result1 += tr1;
        });

        result1 += "</tbody>";
      } catch (err) {
        result1 += `<table id="dbTable"><tr><td><textarea>${dBBody}</textarea></td></tr></table>`;
      }

      blockBuilder.internalMethods.addElement(
        document.querySelector("#dbTableManager .workSpace"),
        "div",
        result1
      );

      function addRow() {
        length = [
          ...document.getElementById("dbTable").getElementsByTagName("tr"),
        ][0].childNodes.length;

        tds = "";

        for (i = 0; i < length; i++) {
          tds += "<td><textarea>space</textarea></td>";
        }

        tr = document.createElement("tr");
        tr.innerHTML = tds;

        [
          ...document.getElementById("dbTable").getElementsByTagName("tbody"),
        ][0].append(tr);
      }

      function addColumn() {
        rows = [
          ...document.getElementById("dbTable").getElementsByTagName("tr"),
        ];
        rows.forEach((row) => {
          td = document.createElement("td");
          td.innerHTML = "<textarea>space</textarea>";

          row.append(td);
        });
      }

      length = mathColumns();
      result = "<table><tr>";
      for (i = 0; i < length; i++) {
        result += `<td><button id="deleteColumn${i}">delete column${i}</button></td>`;
      }
      result += "</tr></table>";
    },
  },
  inputs: {
    inputText(place, value, buttons) {
      inputId = randomizer.createUniqueId("inputId");

      buttonsHTML = "";

      buttons.forEach((button, index) => {
        buttonId = randomizer.createUniqueId("buttonId");
        buttons[index].push(buttonId);
        buttonsHTML += `<button id="${buttonId}">${button.buttonText}</button>`;
      });

      innerHTML =
        `<input type="text" id='${inputId}' value='${value}'>` + buttonsHTML;

      div = document.createElement("div");

      div.innerHTML = innerHTML;

      place.append(div);
      buttons.forEach((button) => {

        document.getElementById(button[2]).addEventListener("click", func1);

        function func1() {
          button.buttonFunction(document.getElementById(inputId).value);
        }
      });
    },
  },
  internalMethods: {
    createTableWithButtonsFromDB(
      items,
      ths,
      columnButtons = [],
      buttons,
      tablePlace
    ) {
      console.log(333, items);
      let div = document.createElement("div");
      let table = "<table>";
      let tHead = "";
      ths.forEach((th) => {
        columnButtons.forEach((button) => {
          thead += `<button>test</button>`;
        });

        tHead += `<th>${th}</th>`;
      });
      table += `<tr>${tHead}</tr>`;
      items.forEach((item, index) => {
        tr = "";
        item.forEach((td) => {
          tr += `<td id='dbId${index}'>${td}</td>`;
        });

        buttonsHTML = "";

        buttons.forEach((button) => {
          buttonsHTML += `<button data-row= '${index}' >${button.buttonText}</button>`;
        });

        table +=
          `<tr data-row= '${index}'>` +
          tr +
          "<td>" +
          buttonsHTML +
          "</td></tr>";
      });
      table += "</table>";
      div.innerHTML = table;

      tablePlace.append(div);

      buttons.forEach((button) => {
        [...document.getElementsByClassName()].forEach((item) => {
          item.addEventListener("click", button.buttonFunction, this);
        });
      });
    },
    addElement(parent, tag, innerHTML) {
      element = document.createElement(tag);
      element.innerHTML = innerHTML;
      parent.append(element);
    },
  },
};

class HTMLTable {
  constructor(table) {
    this.tablePlace = table.tablePlace;
    this.rowButtons = table.rowButtons;
    this.columnButtons = table.columnButtons;
    this.headers = table.headers;
    this.items = table.items;
    let element = document.createElement("div");
  
    this.div = element;
    this.#innerMethods.tableObject = this;
    this.input = table.input;
    this.inputValue = table.input.value;
    this.inputButtons = table.input.buttons;

    this.itemTag = table.itemTag;
    this.tableKey = table.tableKey;
    this.divButtons = table.divButtons;
    table.tablePlace.append(element);
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
