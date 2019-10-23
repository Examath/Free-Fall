/// <reference path="SpaceSim.js" />

class Tool {
    constructor(name, refrenceindex, selected = false) {
        this.Name = name;
        this.Root = document.createElement("button");
        this.Root.innerHTML = name;
        this.ID = UniqueID.Get("Tool");
        this.Root.id = this.ID;
        this.RefrenceIndex = refrenceindex;
        this.Root.dataset.index = refrenceindex;

        if (selected) {
            Tool.SelectedID = Number(this.ID.substr(4));
            this.Root.dataset.selected = "True";
        }
        else this.Root.dataset.selected = "False";

        this.Root.addEventListener("click", function (e) {
            Tool.Select(e);
        })
    }
    get Selected() {
        return (this.Root.dataset.selected == "True") ? true : false;
    }
}

Tool.SelectedID = null;
Tool.SelectedRefrenceIndex = null;
Tool.SelectionChangedFlag = false;
Tool.Select = function (e) {
    if (e.target.id == "Tool" + Tool.SelectedID) return; /*{
        e.target.dataset.selected = "False";
        SelectedID = null;        
    }   */
    else {
        document.getElementById("Tool" + Tool.SelectedID).dataset.selected = "False";
        e.target.dataset.selected = "True";
        Tool.SelectedID = Number(e.target.id.substr(4));
        Tool.SelectedRefrenceIndex = Number(e.target.dataset.index);
        Tool.SelectionChangedFlag = true;
    }
}

