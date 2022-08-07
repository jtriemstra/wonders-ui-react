class BoardImage {
    

    static getImage(boardName, boardSide) {
        var boards = [];

        if (boards.length == 0){
            boards["Alexandria"] = "alexandria" + boardSide + ".png";
            boards["Babylon"] = "babylon" + boardSide + ".png";
            boards["Ephesus"] = "ephesos" + boardSide + ".png";
            boards["Giza"] = "gizah" + boardSide + ".png";
            boards["Halikarnassos"] = "halikarnassus" + boardSide + ".png";
            boards["Olympia"] = "olympia" + boardSide + ".png";
            boards["Rhodes"] = "rhodos" + boardSide + ".png";
            boards["Rome"] = "roma" + boardSide + ".png";
        }  

        return boards[boardName];
    }

    static getResourceImage(resourceName, boardName, boardSide){
        var types = [];

        if (types.length == 0) {
            types["PAPER"] = "paper.png";
            types["GLASS"] = "glass.png";
            types["TEXTILE"] = "linen.png";
            types["STONE"] = "stone.png";
            types["BRICK"] = "clay.png";
            types["WOOD"] = "wood.png";
            types["ORE"] = "ore.png";
        }

        if (types[resourceName]) {
            return types[resourceName];
        }

        if (boardName === "Rome" && boardSide === "B") {
            return "leader-disc.png";
        }
        if (boardName === "Rome" && boardSide === "A") {
            return "leader-free.png";
        }
    }
}

export default BoardImage;
