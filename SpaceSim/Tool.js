class Tool {
    constructor(name, selected = false) {
        this.Name = name;
        this.Root = document.createElement("button");
        this.Root.innerHTML = name;
        this.Root.id = "Tool" + Tool.UniqueIdCount;
        this.ID = Tool.UniqueIdCount;

        if (selected) {
            Tool.SelectedID = this.ID;
            this.Root.dataset.selected = "True";
        }
        else this.Root.dataset.selected = "False";
        
        Tool.UniqueIdCount++;

        this.Root.addEventListener("click", function (e){
            Tool.Select(e);
        })
    }
}

Tool.UniqueIdCount = 0;
Tool.SelectedID;
Tool.Select = function (e) {
    if (e.target.id == "Tool" + Tool.SelectedID) return; /*{
        e.target.dataset.selected = "False";
        SelectedID = null;        
    }   */
    else {
        document.getElementById("Tool" + Tool.SelectedID).dataset.selected = "False";
        e.target.dataset.selected = "True";
        Tool.SelectedID = Number(e.target.id.substr(4));
        e.target.dispatchEvent(new CustomEvent('ToolSelectionChanged', {bubbles: true}));
    }
}

