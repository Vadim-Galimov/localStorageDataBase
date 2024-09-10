const dbTableManager = {
  start() {
    dbTableManager.interface = new Interface(
      "Database localStorage table manager",
      "dbTableManager"
    );
    dbTableManager.interface.createSimpleMenu();

    dbTableManager.windows.tableList.open();
  },

  openDbById(rowId) {
    dbId = rowId.target.id.replace("openDBButton", "");
    key = localStorage.key(dbId);
    dbTableManager.windows.tableList.open(key);
  },
  deleteDb(this1) {
    dbName = document.getElementById(
      "dbId" + this1.target.id.replace("deleteDBButton", "")
    ).innerHTML;

    localStorageDataBase.commands.deleteTAble(dbName);
    dbTableManager.windows.tableList.open();
  },
  windows: {
    tableList: {
      open() {
        // секция 1 добавление дб

        dbTableManager.interface.clearWorkSpace();
        dbTableManager.interface.setWorkSpaceTitle("Список баз данных:");

        // секция 2 список дб

        dbList = localStorageDataBase.commands.getDataBaseItemList();

        list = new HTMLTable({
          tablePlace: document.querySelector(
            `#${dbTableManager.interface.id} .workSpace`
          ),
          rowButtons: [
            {
              buttonText: "open",
              buttonFunction: open,
            },
            {
              buttonText: "delete",
              buttonFunction: deleteRow,
            },
          ],
          columnButtons: [],
          headers: ["база данных"],
          items: dbList,
          input: {value:"", buttons:[{buttonText: "Add db", buttonFunction: createDb}]},
          itemTag: "span",
          tableKey: "table list",
          divButtons: [],
        });

        list.createTable();

        function createDb(dbName) {
          localStorageDataBase.commands.addTable(dbName);
          dbTableManager.windows.tableList.open();
        }

        function open(event) {
          let key =
            event.target.parentNode.parentNode.getAttribute("data-row-key");
          dbTableManager.windows.tableEditor.open(key);
        }
        function deleteRow(this1) {
          console.log(
            55,
            this1.target.parentNode.parentNode.getAttribute("data-row-key")
          );
          key = this1.target.parentNode.parentNode.getAttribute("data-row-key");

          localStorage.removeItem(key);
          dbTableManager.windows.tableList.open();
        }
      },
    },
    tableEditor: {
      open(key) {
        data = localStorage.getItem(key);
        dbTableManager.interface.clearWorkSpace();

        function isJsonString(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }

        let items;
        if (isJsonString(data)) {
          items = JSON.parse(data);
        } else {
          items = [[data]];
        }

        if (items.length == 0) items.push([""]);

        console.log(234, isJsonString(data), items);

        list = new HTMLTable({
          tablePlace: document.querySelector(
            `#${dbTableManager.interface.id} .workSpace`
          ),
          rowButtons: [
            {
              buttonText: "delete row",
              buttonFunction: deleteRow,
            },
          ],
          columnButtons: [
            { buttonText: "delete column", buttonFunction: deleteColumn },
          ],
          headers: [],
          items: items,
          input: {value:key, buttons:[{buttonText: "change table name", buttonFunction: changeTableTitle}]},
          itemTag: "textarea",
          tableKey: key,
          divButtons: [
            {buttonText: "save table", buttonFunction: saveTable},
            {buttonText: "add column", buttonFunction: addColumn},
            {buttonText: "add row", buttonFunction: addRow},
          ],
        });

        list.createEditor();

        function changeTableTitle(key) {
          list.tableKey = key;

          saveTable();





        }
        function addRow() {
          let length = list.items[0].length;
          let newArr = [];
          for (let i = 0; i < length; i++) newArr.push("");
          list.items.push(newArr);
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.windows.tableEditor.open(key);
        }
        function addColumn() {
          console.log(113);
          list.items.map((item) => {
            item.push("");
          });
          console.log(1134, list.items);
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.windows.tableEditor.open(key);
        }

        function saveTable() {
          arr = [];
          let rows = [
            ...document.querySelectorAll(
              `#${dbTableManager.interface.id} .workSpace tr[data-row-type="item"]`
            ),
          ];
          rows.forEach((tr) => {
            let miniArr = [];

            tds = [...tr.querySelectorAll("td")];
            tds.forEach((td) => {
              miniArr.push(td.firstChild.value);
            });
            arr.push(miniArr);
          });
          console.log(222, list)

          localStorage.setItem(list.tableKey, JSON.stringify(arr));
          dbTableManager.windows.tableList.open();
        }

        function deleteRow(event) {
          let index =
            event.target.parentNode.parentNode.getAttribute("data-row-index");
          list.items.splice(index, 1);

          console.log("delete row", list.items);

          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.windows.tableEditor.open(key);
        }

        function deleteColumn(event) {
          console.log(
            event.target.parentNode.getAttribute("data-column-number"),
            list.items
          );
          let index =
            event.target.parentNode.getAttribute("data-column-number");
          list.items.forEach((item) => {
            item.splice(index, 1);
          });
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.windows.tableEditor.open(key);
        }

        dBBody = [[localStorageDataBase.commands.getTable(key)]];

        console.log(dBBody, 123);

        //   blockBuilder.tables.tableForEdit(key, dBBody);
      },
    },
  },
};

// кнопки

// главное меню

function saveTable() {
  console.log("save Tavle");
  trs = [...document.getElementById("dbTable").getElementsByTagName("tr")];
  newArr = [];
  trs.forEach((tr) => {
    trArr = [];
    tds = [...tr.children];
    tds.forEach((td) => {
      trArr.push([...td.children][0].value);
    });
    newArr.push(trArr);
  });

  string = JSON.stringify(newArr);
  dBName = document.getElementById("tableName").value;
  oldName = document.getElementById("tableName").getAttribute("data-old-name");
  localStorage.removeItem(oldName);
  localStorage.setItem(dBName, string);
  document.getElementById("tableName").setAttribute("data-old-name", dBName);
}

// прочее

function mathColumns() {}

function editDB(dBName) {}

// Автозапуск:

document.addEventListener("DOMContentLoaded", dbTableManager.start, false);
