/// <reference path="SpaceSim.js" />

class Tool {
    constructor(name, refrenceindex,code, selected = false, ) {
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

        this.ApplyToolInput = code.ApplyToolInput;
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

var BasicToolPackage = {//: SpaceSim
    select: {
        ApplyToolInput: function (s, prime = false) {

        }
    },
    pan: {
        ApplyToolInput: function(s, prime = false) {
            if(!prime && !MouseInputManager.MousePressedButtons[2]) return;
            s.Renderer.TempX = -MouseInputManager.MouseDelta.X;
            s.Renderer.TempY = -MouseInputManager.MouseDelta.Y;
            s.Renderer.HoldTemp = true;
        }
    },
    zoom: {
        ApplyToolInput: function (s, prime = false) {
            if (prime) {
                s.Renderer.Z += (MouseInputManager.MouseDelta.X + MouseInputManager.MouseDelta.Y) * 0.001;
            }
            else if (MouseInputManager.MouseDelta.Wheel != 0) {
                s.Renderer.Z += MouseInputManager.MouseDelta.Wheel * 0.0001;
                MouseInputManager.MouseDelta.Wheel = 0;
            }
        }
    }
}

