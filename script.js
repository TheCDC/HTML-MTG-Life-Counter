var numPlayers = 1;

function basePlayer(name) {
    this.name = name;
    this.life = 20;
    this.colors = [];
    this.renderElement = NaN;
    this.refresh = function() {
        this.render(this.renderElement);
    };
    this.getColors = function() {
        return this.colors
    };
    this.getColorString = function() {
        return this.colors.join(",");
    };
    this.getLife = function() {
        return this.life
    };
    this.getName = function() {
        return this.playerName
    };
    this.xcrementLife = function(n) {
        console.log("Attempt to add " + n + " life to " + this.name);
        this.life = this.life + n;
        console.log(this.name + ".life=" + this.life);
    };
    this.setColors = function(colorString) {
        colorString = colorString[0] + colorString + colorString[colorString.length - 1]
        var gradString = ""
        for (var i = 0; i < colorString.length; i++) {
            var c = colorString[i].toLowerCase();
            if (c === "r") {
                // gradString += "red"
                gradString += "#E13C1E"
            } else
            if (c === "g") {
                // gradString += "green"
                gradString += "#336600"
            } else
            if (c === "u") {
                // gradString += "blue"
                gradString += "#0066cc"
            } else
            if (c === "w") {
                // gradString += "white"
                gradString += "#dce0bb"
            } else
            if (c === "b") {
                // gradString += "black"
                gradString += "#232323"
            }
            if (i != colorString.length - 1) {
                gradString += ","
            }
        }
        console.log("Set " + this.playerName + " background to " + gradString)
        this.colors.push(colorString)
    };
    this.getColorsStyle = function() {
        if (this.colors.length > 1) {
            this.colors = "linear-gradient(135deg," + this.colors + ")"
        }
        return gradString
    };
    this.render = function(element) {
        // memorize which element to render to/refresh
        this.renderElement = element;
        // delete all child nodes (useful for case of refresh)
        for (var i = element.children.length - 1; i >= 0; i--) {
            element.removeChild(element.children[i]);
        }
        // evaluate a reference to self
        var that = this;
        // the whole player thing
        var mydiv = document.createElement("div");
        element.appendChild(mydiv);
        mydiv.classList.add("player");
        // I don't remember what texture is for
        var textureDiv = document.createElement("div");
        mydiv.appendChild(textureDiv);
        textureDiv.classList.add("texture")
            // another containing element
        var boxDiv = document.createElement("div");
        textureDiv.appendChild(boxDiv);
        boxDiv.classList.add("box");
        // player name input
        var nameInput = document.createElement("input");
        boxDiv.appendChild(nameInput);
        nameInput.classList.add("playerName")
        nameInput.placeholder = "Planeswalker " + name;
        nameInput.value = this.name;
        // allow changing name
        nameInput.addEventListener("keyup", function() {
            console.log("set " + that.name + " to " + nameInput.value);
            that.name = nameInput.value;
        });
        // life adding buttons
        var plusDiv = document.createElement("div");
        boxDiv.appendChild(plusDiv);
        plusDiv.classList.add("xcrement");

        var adds = [5, 1];
        var btn = NaN;
        for (var i = adds.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            plusDiv.appendChild(btn);
            btn.innerHTML = adds[i];
            var n = adds[i];
            btn.addEventListener("click", function(N) {
                return function() {
                    that.xcrementLife(N);
                    that.refresh();
                }
            }(n))
        }
        // life display span
        var lifeDisplay = document.createElement("span");
        boxDiv.appendChild(lifeDisplay);
        lifeDisplay.classList.add("lifeTotal");
        lifeDisplay.innerHTML = this.life;

        // life subtract buttons
        var minusDiv = document.createElement("div");
        boxDiv.appendChild(minusDiv);
        minusDiv.classList.add("xcrement");

        var subs = [-5, -1];
        var btn = NaN;
        for (var i = subs.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            minusDiv.appendChild(btn);
            btn.innerHTML = subs[i];
            var n = subs[i];
            btn.addEventListener("click", function(N) {
                return function() {
                    that.xcrementLife(N);
                    that.refresh();
                }
            }(n))
        }

        // element.innerHTML = "I am player " + this.name;
        // console.log("rendering player " + this.name);
    };

};


function playerManager() {
    this.players = [];
    this.count = 0;
    this.addPlayer = function() {
        this.players.push(new basePlayer("Planeswalker " + this.count));
        this.count++;
    };
    this.render = function(element) {
        // loop through target containing element and delete all children
        for (var i = element.children.length - 1; i >= 0; i--) {
            element.removeChild(element.children[i]);
        }
        // instantiate an HTML table
        var table = document.createElement("TABLE");
        // add it as a child of the rendering target
        element.appendChild(table);
        var row = table.insertRow();
        for (var i = 0; i < this.players.length; i++) {
            console.log("rendering player " + i);
            var col = row.insertCell();
            this.players[i].render(col);
        }

        // loop through list of players, for each one creating HTML table column
        // and render those players each into their own column
    }

}


// ========== Globals ==========
var manager = new playerManager();
// add the first and second players
for (var i = 0; i < 2; i++) {
    manager.addPlayer();
}
// display it
manager.render(document.getElementById("test"));

// ========== UI functions ==========

function xcrement(player, amount) {
    var myElement = document.getElementById(player).getElementsByClassName("lifeTotal")[0]
    myElement.innerHTML = parseInt(myElement.innerHTML) + amount
    console.log("Changed  " + player + " life by " + amount)
};

function setGradient(player, colorString) {
    //(red,green,blue,white,black)
    colorString = colorString[0] + colorString + colorString[colorString.length - 1]
    var gradString = ""
    for (var i = 0; i < colorString.length; i++) {
        if (colorString[i].toLowerCase() === "r") {
            // gradString += "red"
            gradString += "#E13C1E"
        } else
        if (colorString[i].toLowerCase() === "g") {
            // gradString += "green"
            gradString += "#336600"
        } else
        if (colorString[i].toLowerCase() === "u") {
            // gradString += "blue"
            gradString += "#0066cc"
        } else
        if (colorString[i].toLowerCase() === "w") {
            // gradString += "white"
            gradString += "#dce0bb"
        } else
        if (colorString[i].toLowerCase() === "b") {
            // gradString += "black"
            gradString += "#232323"
        }
        if (i != colorString.length - 1) {
            gradString += ","
        }
    }
    console.log("Set " + player + " background to " + gradString)
    if (colorString.length > 1) {
        gradString = "linear-gradient(135deg," + gradString + ")"
    }
    document.getElementById(player).style.background = gradString
        // document.getElementById(player).style.background = "linear-gradient(to bottom, black, blue);"

};

function addColor(player, letter) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value += letter;
    setGradient(player, myElement.value)
};

function resetColors(player) {
    document.getElementById(player).getElementById("colorsList").innerHTML = ""
};

function clearColors(player) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value = "";
};

var addPlayer = function() {
    var template = String(document.getElementById("P1").innerHTML)
    numPlayers++
    var output = '<div class="player" id="P1">'.replace("P1", "P" + String(numPlayers)) + replaceAll(template, "P1", "P" + String(numPlayers)) + "</div>"
    document.getElementById("allPlayers").innerHTML += "<td>" + output + "</td>"
    manager.addPlayer();
    console.log("all players: " + manager.players)
    console.log("Added player " + String(numPlayers))
    manager.render(document.getElementById("test"));
};

function flipPlayer(player) {
    if (document.getElementById(player).style.transform === "") {
        document.getElementById(player).style.transform = "rotate(180deg)"
    } else {
        document.getElementById(player).style.transform = ""
    }
};

function replaceAll(source, search, replace) {
    return source.split(search).join(replace)
};
