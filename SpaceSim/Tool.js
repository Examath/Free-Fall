
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

        this.Root.addEventListener("click", function (e) {
            //e.target.classList.add("ToolSelected");
            Tool.Select(e.target.id);
        })
    }
    get Selected() {
        return (this.Root.dataset.Selected == "True") ? true : false;
    }
    set Selected(x) {
        if (x) {
            if (Tool.SelectedID && Tool.SelectedID != this.ID) {
                document.getElementById("Tool" + Tool.SelectedID).classList.remove("ToolSelected");
                Tool.SelectedID = this.ID;
                this.Root.classList.add("ToolSelected");
                this._Selected = x;
            }
        } else {
            this.Root.classList.remove("ToolSelected");
            this._Selected = x;
        }
    }
}

Tool.UniqueIdCount = 0;
Tool.SelectedID;
Tool.Select = function (ID) {
    /// <refrence />

    ID += "";
}
Tool.Select("kji");

