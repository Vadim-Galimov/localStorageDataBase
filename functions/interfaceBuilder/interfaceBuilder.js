class Interface {
  constructor(programmName, id) {
    this.programmName = programmName;

    this.id = id;
    this.workSpaceTitle = "";
  }

  createSimpleMenu() {
    const dbTableManagerDiv = document.createElement("div");

    dbTableManagerDiv.innerHTML = `<div  style="background-color: #e1fbfc"><p>${this.programmName}</p> 
    
    <div style  ="position: absolute; top: 10px; right: 10px"> 
   <button class='closeButton'>Close</button>
     </div>   </div>
     
     
 <p class = "title"></p>
 <div class = "workSpace" ></div>`;
    dbTableManagerDiv.setAttribute("id", this.id);
    document.body.prepend(dbTableManagerDiv);

    document
      .querySelector("#dbTableManager .closeButton")
      .addEventListener("click", this.closeProgramm);
  }
  closeProgramm() {
    document.getElementById("dbTableManager").remove();
  }
  clearWorkSpace() {
    document.querySelector("#dbTableManager .workSpace").innerHTML = "";
  }
  setWorkSpaceTitle(title) {
    this.workSpaceTitle = title;
    document.querySelector("#dbTableManager .title").innerHTML = title;
  }
}
