class CardImage {
    

    static getImage(cardName) {
        var cards = [];

        if (cards.length == 0){
            cards["Altar"] = "altar.png";
            cards["Apothecary"] = "apothecary.png";
            cards["Aqueduct"] = "aqueduct.png";
            cards["Archery Range"] = "archeryrange.png";
            cards["Barracks"] = "barracks.png";
            cards["Baths"] = "baths.png";
            cards["Bazar"] = "bazar.png";
            cards["Brickyard"] = "brickyard.png";
            cards["Caravansery"] = "caravansery.png";
            cards["Clay Pit"] = "claypit.png";
            cards["Clay Pool"] = "claypool.png";
            cards["Courthouse"] = "courthouse.png";
            cards["Dispensary"] = "dispensary.png";
            cards["East Trading Post"] = "easttradingpost.png";
            cards["Excavation"] = "excavation.png";
            cards["Forest Cave"] = "forestcave.png";
            cards["Forum"] = "forum.png";
            cards["Foundry"] = "foundry.png";
            cards["Glassworks"] = "glassworks.png";
            cards["Guard Tower"] = "guardtower.png";
            cards["Laboratory"] = "laboratory.png";
            cards["Library"] = "library.png";
            cards["Loom"] = "loom.png";
            cards["Lumber Yard"] = "lumberyard.png";
            cards["Marketplace"] = "marketplace.png";
            cards["Mine"] = "mine.png";
            cards["Ore Vein"] = "orevein.png";
            cards["Pawnshop"] = "pawnshop.png";
            cards["Press"] = "press.png";
            cards["Quarry"] = "quarry.png";
            cards["Sawmill"] = "sawmill.png";
            cards["School"] = "school.png";
            cards["Scriptorium"] = "scriptorium.png";
            cards["Stables"] = "stables.png";
            cards["Statue"] = "statue.png";
            cards["Stockade"] = "stockade.png";
            cards["Stone Pit"] = "stonepit.png";
            cards["Tavern"] = "tavern.png";
            cards["Temple"] = "temple.png";
            cards["Theater"] = "theater.png";
            cards["Timber Yard"] = "timberyard.png";
            cards["Training Ground"] = "trainingground.png";
            cards["Tree Farm"] = "treefarm.png";
            cards["Vineyard"] = "vineyard.png";
            cards["Walls"] = "walls.png";
            cards["West Trading Post"] = "westtradingpost.png";
            cards["Workshop"] = "workshop.png";            
            cards["Arena"] = "arena.png";
            cards["Haven"] = "haven.png";
            cards["Lighthouse"] = "lighthouse.png";
            cards["Chamber of Commerce"] = "chamberofcommerce.png";
            cards["University"] = "university.png";
            cards["Academy"] = "academy.png";
            cards["Lodge"] = "lodge.png";
            cards["Study"] = "study.png";
            cards["Observatory"] = "observatory.png";
            cards["Fortifications"] = "fortifications.png";
            cards["Arsenal"] = "arsenal.png";
            cards["Circus"] = "circus.png";
            cards["Siege Workshop"] = "siegeworkshop.png";
            cards["Gardens"] = "gardens.png";
            cards["Senate"] = "senate.png";
            cards["Town Hall"] = "townhall.png";
            cards["Pantheon"] = "pantheon.png";
            cards["Palace"] = "palace.png";
            cards["Magistrates Guild"] = "magistratesguild.png";
            cards["Philosophers Guild"] = "philosophersguild.png";
            cards["Spies Guild"] = "spiesguild.png";
            cards["Shipowners Guild"] = "shipownersguild.png";
            cards["Traders Guild"] = "tradersguild.png";
            cards["Craftsmens Guild"] = "craftsmensguild.png";
            cards["Workers Guild"] = "workersguild.png";
            cards["Builders Guild"] = "buildersguild.png";
            cards["Strategists Guild"] = "strategistsguild.png";
            cards["Scientists Guild"] = "scientistsguild.png";            
        }  

        return cards[cardName];
    }
}

export default CardImage;
