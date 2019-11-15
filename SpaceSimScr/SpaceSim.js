"use strict"
/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />
/// <reference path="CircularSpaceObject.js" />

console.log("Loading SpaceSim.js");

class SpaceSim {
    constructor(updatecall, DrawCall, properties = {}) {
        this._Rate = getprop("rate", 0.01);
        this.TimeScale = getprop("timescale", 1);
        this.Root = document.createElement("div");
        this.Root.classList.add("SpaceSimRoot");
        this.Canvas = document.createElement("canvas");
        this.ID = UniqueID.Get("SpaceSimCanvas");
        this.Canvas.id = this.ID;
        this.Canvas.width = getprop("width", 2600);
        this.Canvas.height = getprop("height", 1500);
        this.Context = this.Canvas.getContext("2d", { alpha: false });

        var ScriptPos = document.scripts[document.scripts.length - 1];

        ScriptPos.parentElement.insertBefore(this.Root, ScriptPos);
        this.Root.appendChild(this.Canvas);
        this.UIEnabled = getprop("ui", true);
        if (this.UIEnabled) {
            this.UI = {
                Root: document.createElement("div"),
                Toolbar: {
                    Root: document.createElement("div"),
                    Tools: [new Tool("Select", 0, BasicToolPackage.select, true), new Tool("Pan", 1, BasicToolPackage.pan), new Tool("Zoom", 2, BasicToolPackage.zoom)],
                    SelectedTool: 0,
                    Start: function () {
                        this.Root.classList.add("UIToolBar");
                        this.Tools.forEach(tool => {
                            this.Root.appendChild(tool.Root);
                        });
                    },
                    Update: function () {
                        if (Tool.SelectionChangedFlag && this.Tools[Tool.SelectedRefrenceIndex].Selected) {
                            this.SelectedTool = Tool.SelectedRefrenceIndex;
                            Tool.SelectionChangedFlag = false;
                        }
                    }
                },
                Start: function () {
                    this.Root.classList.add("SpaceSimUIRoot");
                    this.Toolbar.Start();
                    this.Root.appendChild(this.Toolbar.Root);
                },
                Update: function () {
                    this.Toolbar.Update();
                }
            }
            this.UI.Start();
            this.Root.appendChild(this.UI.Root);
        }

        this.Renderer = {
            X: 0,
            Y: 0,
            TempX: 0,
            TempY: 0,
            HoldTemp: false,
            Z: getprop("scale", 1)
        }

        this.GlobalForce = new GlobalForce(getprop("forcetype", 1));
        this.Objects = [];
        this.UpdateCall = updatecall;
        this.Interval = setInterval(updatecall, 1000 * this._Rate);
        window.requestAnimationFrame(DrawCall);

        function getprop(params, def) {
            if (properties[params] != null) return properties[params];
            else return def;
        }
    }
    Update() {
        //var t = performance.now();
        if (this.GlobalForce.Type == 2) {
            var l = this.Objects.length;
            for (let i = 0; i < l; i++) {
                if (this.Objects[i].Mass == 0) continue;
                this.GlobalForce.Census[i] = this.Objects[i].Position;
            }
        }
        this.Objects.forEach(element => {
            element.Update(this.Rate, this.GlobalForce);
        });
        if (this.UIEnabled) {
            this.UI.Update();

            if (MouseInputManager.MouseDown && MouseInputManager.MouseClickTarget == this.ID) {
                this.UI.Toolbar.Tools[this.UI.Toolbar.SelectedTool].ApplyToolInput(this, true);
            }
            var ln = this.UI.Toolbar.Tools.length;
            if (MouseInputManager.MouseMoveTarget == this.ID) {
                for (let i = 0; i < ln; i++) {
                    if (i == this.UI.Toolbar.SelectedTool) continue;
                    this.UI.Toolbar.Tools[i].ApplyToolInput(this);
                }
            }
            if (this.Renderer.HoldTemp) this.Renderer.HoldTemp = false;
            else if (this.Renderer.TempX != 0 || this.Renderer.TempY != 0) {
                this.Renderer.X += this.Renderer.TempX;
                this.Renderer.Y += this.Renderer.TempY;
                this.Renderer.TempX = 0;
                this.Renderer.TempY = 0;
            }
        }
        //document.getElementById("fu").innerHTML = performance.now() - t;
    }
    Draw(DrawCall) {
        var t = performance.now();
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Context.fillStyle = "#000000";
        this.Context.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Context.save();
        this.Context.translate(this.Canvas.width / 2 + this.Renderer.X + this.Renderer.TempX, this.Canvas.height / 2 + this.Renderer.Y + this.Renderer.TempY);
        this.Context.scale(this.Renderer.Z, this.Renderer.Z);
        this.Objects.forEach(element => {
            element.Draw(this.Context);
        });
        this.Context.restore();
        window.requestAnimationFrame(DrawCall); //TODO: improve
        //document.getElementById("fd").innerHTML = performance.now() - t;
    }
    get Rate() {
        return this._Rate * this.TimeScale;
    }
    set FrameRate(x) {
        this._Rate = 1 / x;
        clearInterval(this.Interval);
        this.Interval = setInterval(this.UpdateCall, 1000 / x);
    }
    AddObject(obj) {
        obj.ID = this.Objects.length;
        this.Objects.push(obj);
        this.GlobalForce.Census.push(obj.Position);
    }
}

var GlobalForcet = {
    Gravity: 9.8,
    CentralMass: 5000,
    Get: function (position) {
        var a = this.Gravity * this.CentralMass / position.Influence;
        var x = a * position.RX * -1;
        var y = a * position.RY * -1;
        var force = new Vector(x, y);
        return force;
    },
    Flat: 0,
    Circular: 1,
    NBody: 2
}

var UniqueID = {
    Prefixes: [],
    Count: [],
    Get: function (prefix) {
        for (var i = 0; i < this.Prefixes.length; i++) {
            if (prefix == this.Prefixes[i]) {
                this.Count[i]++;
                return prefix + (this.Count[i] - 1);
            }
        }
        this.Prefixes.push(prefix);
        this.Count.push(1);
        return prefix + 0;
    }
}