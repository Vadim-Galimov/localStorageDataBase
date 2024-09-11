const dbTableManager = {


    openTableList() { 
      
      dbTableManager.workspace =document.querySelector(`#workspace`);

  
      dbTableManager.workspace.innerHTML = '';
 

        dbList = localStorageDataBase.commands.getDataBaseItemList();

        list = new HTMLTable({
          tablePlace: dbTableManager.workspace,
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
          dbTableManager.openTableList();
        }

        function open(event) {
          let key =
            event.target.parentNode.parentNode.getAttribute("data-row-key");
          dbTableManager.openTableEditor(key);
        }
        function deleteRow(event) {
         let key = event.target.parentNode.parentNode.getAttribute("data-row-key");

         localStorageDataBase.commands.deleteTable(key);
          dbTableManager.openTableList();
        }
  
    },
    openTableEditor(key) {
    
        dbTableManager.workspace.innerHTML = '';

        let items = localStorageDataBase.commands.getTable(key)



        list = new HTMLTable({
          tablePlace: dbTableManager.workspace,
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

          saveTable()

        }



        function addRow() {
          let length = list.items[0].length;
          let newArr = [];
          for (let i = 0; i < length; i++) newArr.push("");
          list.items.push(newArr);
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.openTableEditor(key);
        }
        function addColumn() {
          list.items.map((item) => {
            item.push("");
          });
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.openTableEditor(key);
        }

        function saveTable() {
          let arr = [];
          let rows = [
            ...dbTableManager.workspace.querySelectorAll(
              `tr[data-row-type="item"]`
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
    

          localStorage.setItem(list.tableKey, JSON.stringify(arr));
          dbTableManager.openTableList();
        }

        function deleteRow(event) {
          let index =
            event.target.parentNode.parentNode.getAttribute("data-row-index");
          list.items.splice(index, 1);



          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.openTableEditor(key);
        }

        function deleteColumn(event) {
   
          let index =
            event.target.parentNode.getAttribute("data-column-number");
          list.items.forEach((item) => {
            item.splice(index, 1);
          });
          localStorage.setItem(key, JSON.stringify(list.items));
          dbTableManager.openTableEditor(key);
        }



    },
  
};



document.addEventListener("DOMContentLoaded", dbTableManager.openTableList);
