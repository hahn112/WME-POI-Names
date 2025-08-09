// ==UserScript==
// @name         WME-POI-Names
// @namespace    http://tampermonkey.net/
// @version      1.21
// @description  Deutsche Standardnamen in POI
// @match        https://www.waze.com/*/editor*
// @match        https://www.waze.com/editor*
// @match        https://beta.waze.com/*/editor*
// @match        https://beta.waze.com/editor*
// @include https://*.waze.com/editor*
// @include https://*.waze.com/*/editor*
// @updateURL https://github.com/hahn112/WME-POI-Names/raw/refs/heads/main/WME-POI-Names-1.2.user.js
// @downloadURL https://github.com/hahn112/WME-POI-Names/raw/refs/heads/main/WME-POI-Names-1.2.user.js
// @grant none
// @author hahn112
// ==/UserScript==

(function() {
    'use strict';

    // Standardnamen-Datenbank (gleiche Daten wie vorher)
    const STANDARDNAMEN_DB = [
        {unternehmen: "ATU", oberbegriff: "Auto Dienstleistungen", kategorie: "Werkstatt / Fahrzeugzubehörgeschäft", anmerkung: "", filialen: "[1]"},
        {unternehmen: "Action", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "", filialen: "[2]"},
        {unternehmen: "ADLER", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[3]"},
        {unternehmen: "Agip", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "ALDI", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "Die Zusätze \"Nord\" oder \"Süd\" werden nicht eingetragen.", filialen: "[4][5]"},
        {unternehmen: "Allguth", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Alnatura", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[6]"},
        {unternehmen: "Apollo-Optik", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "", filialen: "[7]"},
        {unternehmen: "Aral", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[8]"},
        {unternehmen: "AVIA", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[9]"},
        {unternehmen: "AVEX", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "B&B HOTELS", oberbegriff: "Unterkunft", kategorie: "Hotel", anmerkung: "", filialen: ""},
        {unternehmen: "BabyOne", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "", filialen: "[10]"},
        {unternehmen: "BAGEno", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "BAUHAUS", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[11]"},
        {unternehmen: "BAVARIA petrol", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "BayWa", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Bell Oil", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Bergler", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Bershka", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode / Bekleidung", anmerkung: "", filialen: "[12]"},
        {unternehmen: "BK", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "bft", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Block House", oberbegriff: "Speisen und Getränke", kategorie: "Restaurant / Gasthaus", anmerkung: "", filialen: "[13]"},
        {unternehmen: "BUDNI", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Drogerie / Körperpflege", anmerkung: "", filialen: "[14]"},
        {unternehmen: "Burger King", oberbegriff: "Speisen und Getränke", kategorie: "Fast Food / Imbiss", anmerkung: "", filialen: "[15]"},
        {unternehmen: "C&A", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[16]"},
        {unternehmen: "Calpam", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "Calvin Klein", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[17]"},
        {unternehmen: "Carglass", oberbegriff: "Auto Dienstleistungen", kategorie: "Werkstatt / Fahrzeugzubehörgeschäft", anmerkung: "", filialen: "[18]"},
        {unternehmen: "CHRIST", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Schmuck", anmerkung: "", filialen: "[19]"},
        {unternehmen: "CLASSIC", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "clever fit", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Fitness", anmerkung: "", filialen: "[20]"},
        {unternehmen: "Combi", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[21]"},
        {unternehmen: "DAS FUTTERHAUS", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Tierhandlung / Veterinärwesen", anmerkung: "", filialen: "[22]"},
        {unternehmen: "DECATHLON", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Sportausrüstung", anmerkung: "", filialen: "[23]"},
        {unternehmen: "Dehner", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "Garten-Center und/oder Zoo-Bedarf", filialen: "[24]"},
        {unternehmen: "Deichmann", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[25]"},
        {unternehmen: "denn's Biomarkt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[26]"},
        {unternehmen: "DEPOT", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[27]"},
        {unternehmen: "diska", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: ""},
        {unternehmen: "dm-drogerie markt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Drogerie / Körperpflege", anmerkung: "", filialen: "[28]"},
        {unternehmen: "E xpress", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "E xpress gehört zu EDEKA - als Alternativname gerne noch EDEKA setzen.", filialen: ""},
        {unternehmen: "E Center", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "E Center sind besonders große EDEKA-Märkte", filialen: "[29]"},
        {unternehmen: "EDEKA", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[30]"},
        {unternehmen: "ELAN", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: ""},
        {unternehmen: "engbers", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[31]"},
        {unternehmen: "Ernsting's family", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[32]"},
        {unternehmen: "Esso", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[33]"},
        {unternehmen: "EuroShop", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Gemischtwarenladen", anmerkung: "", filialen: "[34]"},
        {unternehmen: "eyes + more", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[35]"},
        {unternehmen: "Fressnapf", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Tierhandlung / Veterinärwesen", anmerkung: "", filialen: "[36]"},
        {unternehmen: "GALERIA", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Kaufhaus", anmerkung: "", filialen: "[37]"},
        {unternehmen: "GO", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[38]"},
        {unternehmen: "hagebaumarkt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[39]"},
        {unternehmen: "Hammer", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[40]"},
        {unternehmen: "Hellweg", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[41]"},
        {unternehmen: "HEM", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[42]"},
        {unternehmen: "Hol ab!", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "", filialen: "[43]"},
        {unternehmen: "HORNBACH", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[44]"},
        {unternehmen: "JACK & JONES", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[45]"},
        {unternehmen: "JET", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[46]"},
        {unternehmen: "JYSK", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[47]"},
        {unternehmen: "Kaufland", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[48]"},
        {unternehmen: "KFC", oberbegriff: "Speisen und Getränke", kategorie: "Fast Food / Imbiss", anmerkung: "", filialen: "[49]"},
        {unternehmen: "KiK", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[50]"},
        {unternehmen: "KODi", oberbegriff: "Geschäfte und Diensleistungen", kategorie: "Gemischtwarenladen", anmerkung: "", filialen: "[51]"},
        {unternehmen: "K+K", oberbegriff: "Geschäfte und Diensleistungen", kategorie: "Supermarkt", anmerkung: "", filialen: "[112]"},
        {unternehmen: "Levi's", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[52]"},
        {unternehmen: "Lidl", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[53]"},
        {unternehmen: "MANGO", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[54]"},
        {unternehmen: "Marc O'Polo", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[55]"},
        {unternehmen: "Markant", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "betrifft Markant Märkte (\"... freu dich drauf!\") der Bartels-Langness Gruppe in SH, HH und MV", filialen: "[56]"},
        {unternehmen: "McDonald's", oberbegriff: "Speisen und Getränke", kategorie: "Fast Food / Imbiss", anmerkung: "", filialen: "[59]"},
        {unternehmen: "Media Markt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Elektronik", anmerkung: "", filialen: "[60]"},
        {unternehmen: "mein real", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[61]"},
        {unternehmen: "METRO", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "SB-Großhandel Zugang nur mit Kundenkarte (bitte in Beschreibung vermerken)", filialen: "[62]"},
        {unternehmen: "mister*lady", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[63]"},
        {unternehmen: "Mix Markt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "Link"},
        {unternehmen: "Mr. Wash", oberbegriff: "Auto Dienstleistungen", kategorie: "Auto-Waschanlage", anmerkung: "", filialen: "Link"},
        {unternehmen: "Möbel Heinrich", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[64]"},
        {unternehmen: "Mömax", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[65]"},
        {unternehmen: "Müller", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Drogerie / Körperpflege", anmerkung: "", filialen: "[66]"},
        {unternehmen: "myToys", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Spielwarenladen", anmerkung: "", filialen: "[67]"},
        {unternehmen: "nah&frisch", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[68]"},
        {unternehmen: "nahkauf", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[69]"},
        {unternehmen: "Nanu-Nana", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Gemischtwarenladen", anmerkung: "", filialen: "[70]"},
        {unternehmen: "Netto", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "betrifft die Märkte der Netto Marken-Discount Stiftung & Co. KG (roter Schriftzug auf gelbem Grund)", filialen: "[71]"},
        {unternehmen: "NEW YORKER", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[73]"},
        {unternehmen: "NORMA", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[74]"},
        {unternehmen: "Novum", oberbegriff: "Unterkunft", kategorie: "Hotel", anmerkung: "Hotel-Kette", filialen: "[75]"},
        {unternehmen: "NP-Markt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "die NP-Märkte werden bis 2026 in EDEKA oder Nah & Gut umgewandelt", filialen: "[76]"},
        {unternehmen: "OBI", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[77]"},
        {unternehmen: "OIL!", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[78]"},
        {unternehmen: "OKTAN", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "."},
        {unternehmen: "ONLY", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[79]"},
        {unternehmen: "ORLEN", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "Gehört zur star-Gruppe", filialen: ""},
        {unternehmen: "Oxfam", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "", anmerkung: "", filialen: "[80]"},
        {unternehmen: "Pandora", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[81]"},
        {unternehmen: "PENNY", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[82]"},
        {unternehmen: "POCO", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[83]"},
        {unternehmen: "porta Möbel", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[84]"},
        {unternehmen: "Pull & Bear", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[85]"},
        {unternehmen: "Raiffeisen", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: ""},
        {unternehmen: "RENO", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: ""},
        {unternehmen: "REWE", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[86]"},
        {unternehmen: "REWE Getränkemarkt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: ""},
        {unternehmen: "RITUALS", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Drogerie / Körperpflege", anmerkung: "", filialen: "[87]"},
        {unternehmen: "ROLLER", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[88]"},
        {unternehmen: "ROSSMANN", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Drogerie / Körperpflege", anmerkung: "", filialen: "[89]"},
        {unternehmen: "s.Oliver", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[90]"},
        {unternehmen: "Schuhpark", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[91]"},
        {unternehmen: "SELGROS cash & carry", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "SB-Großhandel Zugang nur mit Kundenkarte (bitte in Beschreibung vermerken)", filialen: "[92]"},
        {unternehmen: "Shell", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[93]"},
        {unternehmen: "SIEMES Schuhcenter", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[94]"},
        {unternehmen: "Smyths Toys", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Spielwarenladen", anmerkung: "", filialen: "[94]"},
        {unternehmen: "SportScheck", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Sportausrüstung", anmerkung: "", filialen: "[95]"},
        {unternehmen: "star", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[96]"},
        {unternehmen: "SUBWAY", oberbegriff: "Speisen und Getränke", kategorie: "Fast Food / Imbiss", anmerkung: "", filialen: "[97]"},
        {unternehmen: "TAKKO", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[98]"},
        {unternehmen: "TEDi", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Gemischtwarenladen", anmerkung: "", filialen: "[99]"},
        {unternehmen: "Teddy Toys Kinderwelt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Spielwarenladen", anmerkung: "", filialen: ""},
        {unternehmen: "tegut", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[100]"},
        {unternehmen: "Telekom Shop", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Telekommunikation", anmerkung: "Shops der Deutschen Telekom für Privatkunden und teilweise auch für Geschäftskunden", filialen: "[101]"},
        {unternehmen: "Tesla Supercharger", oberbegriff: "Auto Dienstleistungen", kategorie: "Ladestation", anmerkung: "+ Ortsname", filialen: "[102][103]"},
        {unternehmen: "TK Maxx", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[104]"},
        {unternehmen: "toom Baumarkt", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Baumarkt", anmerkung: "", filialen: "[105]"},
        {unternehmen: "TotalEnergies", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[106]"},
        {unternehmen: "Tramin", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "Marke \"Freie Tankstelle\"", filialen: ""},
        {unternehmen: "trinkgut", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[107]"},
        {unternehmen: "V-Markt", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[.]"},
        {unternehmen: "VERO MODA", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Mode und Bekleidung", anmerkung: "", filialen: "[108]"},
        {unternehmen: "VR PLUS ENERGIE", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[.]"},
        {unternehmen: "Walther", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "Marke: bft", filialen: "[.]"},
        {unternehmen: "WASGAU", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Supermarkt / Lebensmittel", anmerkung: "", filialen: "[109]"},
        {unternehmen: "Westfalen", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[111]"},
        {unternehmen: "wiro", oberbegriff: "Auto Dienstleistungen", kategorie: "Tankstelle", anmerkung: "", filialen: "[113]"},
        {unternehmen: "XXXLutz", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Möbel / Haushalt", anmerkung: "", filialen: "[110]"},
        {unternehmen: "ZOO & Co.", oberbegriff: "Geschäfte und Dienstleistungen", kategorie: "Tierhandlung / Veterinärwesen", anmerkung: "", filialen: "."}
    ];

    // Globale Variablen
    let currentFilter = 'alle';
    let currentSort = 'unternehmen';
    let sortDirection = 'asc';
    let isTabVisible = false;
    let settings = {
        autoOpen: false,
        showTooltips: true,
        compactView: false,
        defaultCategory: 'alle'
    };

    // Script-Informationen
    const SCRIPT_NAME = 'WME Standardnamen DE';
    const SCRIPT_VERSION = '5.1';

    // Warten bis Waze Map Editor vollständig geladen ist
    function waitForWaze() {
        if (typeof W === 'undefined' || !W.map) {
            setTimeout(waitForWaze, 1000);
            return;
        }
        initWMEIntegration();
    }

    // WME Integration initialisieren
    function initWMEIntegration() {
        loadSettings();

        // Mehrere Versuche für die Integration
        setTimeout(() => addToSidebar(), 2000);
        setTimeout(() => addToToolbar(), 3000);

        createStandardnamenTab();

        // Auto-Open wenn aktiviert
        if (settings.autoOpen) {
            setTimeout(showStandardnamenTab, 4000);
        }

        console.log(`${SCRIPT_NAME} v${SCRIPT_VERSION} geladen`);
    }

    // Zur Sidebar hinzufügen
    function addToSidebar() {
        // Verschiedene Sidebar-Selektoren versuchen
        const sidebarSelectors = [
            '#sidebar',
            '.sidebar',
            '#edit-panel',
            '.edit-panel',
            '#sidebar-tabs',
            '.sidebar-tabs'
        ];

        let sidebar = null;
        for (const selector of sidebarSelectors) {
            sidebar = document.querySelector(selector);
            if (sidebar) break;
        }

        if (!sidebar) {
            console.log('Sidebar nicht gefunden, verwende Toolbar-Integration');
            return false;
        }

        // Prüfe ob bereits ein Tab-System existiert
        const existingTabs = sidebar.querySelector('.nav-tabs') || sidebar.querySelector('.tabs');

        if (existingTabs) {
            addToExistingTabs(existingTabs, sidebar);
        } else {
            addToSidebarDirect(sidebar);
        }

        return true;
    }

    // Zu existierenden Tabs hinzufügen
    function addToExistingTabs(tabsContainer, sidebar) {
        // Tab-Button erstellen
        const tabButton = document.createElement('li');
        tabButton.innerHTML = `
            <a href="#standardnamen-tab-panel" data-toggle="tab" title="Deutsche Standardnamen">
                <i class="fa fa-list-alt"></i>
            </a>
        `;
        tabsContainer.appendChild(tabButton);

        // Tab-Content-Container finden
        const tabContent = sidebar.querySelector('.tab-content') ||
                          sidebar.querySelector('.tab-pane') ||
                          sidebar;

        // Tab-Panel erstellen
        const tabPanel = document.createElement('div');
        tabPanel.id = 'standardnamen-tab-panel';
        tabPanel.className = 'tab-pane';
        tabPanel.innerHTML = createSidebarContent();

        tabContent.appendChild(tabPanel);

        // Event Listener für Tab-Klick
        tabButton.querySelector('a').onclick = (e) => {
            e.preventDefault();

            // Alle anderen Tabs deaktivieren
            tabsContainer.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            sidebar.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

            // Diesen Tab aktivieren
            tabButton.classList.add('active');
            tabPanel.classList.add('active');

            // Event Listeners für Buttons hinzufügen
            setTimeout(addSidebarEventListeners, 100);
        };
    }

    // Direkt zur Sidebar hinzufügen
    function addToSidebarDirect(sidebar) {
        const panel = document.createElement('div');
        panel.className = 'sidebar-panel';
        panel.style.cssText = `
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 10px;
            overflow: hidden;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            background: #f8f9fa;
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
        `;
        header.innerHTML = '📋 Deutsche Standardnamen';

        // Content
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 12px;
            display: block;
        `;
        content.innerHTML = createSidebarContent();

        // Panel einklappbar machen
        let isCollapsed = false;
        header.onclick = () => {
            isCollapsed = !isCollapsed;
            content.style.display = isCollapsed ? 'none' : 'block';
        };

        panel.appendChild(header);
        panel.appendChild(content);
        sidebar.appendChild(panel);

        // Event Listeners hinzufügen
        setTimeout(addSidebarEventListeners, 100);
    }

    // Zur Toolbar hinzufügen (Fallback)
    function addToToolbar() {
        // Prüfen ob bereits in Sidebar integriert
        if (document.getElementById('standardnamen-tab-panel') ||
            document.querySelector('.sidebar-panel')) {
            return;
        }

        // Toolbar-Selektoren
        const toolbarSelectors = [
            '#toolbar',
            '.toolbar',
            '#topbar',
            '.topbar',
            '#edit-buttons',
            '.edit-buttons'
        ];

        let toolbar = null;
        for (const selector of toolbarSelectors) {
            toolbar = document.querySelector(selector);
            if (toolbar) break;
        }

        if (!toolbar) {
            // Fallback: Button am Body
            toolbar = document.body;
        }

        const button = document.createElement('button');
        button.id = 'standardnamen-toolbar-btn';
        button.innerHTML = '📋 Standardnamen';
        button.title = 'Deutsche Standardnamen öffnen';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4a90e2;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        button.onclick = toggleStandardnamenTab;

        // Hover-Effekte
        button.onmouseover = () => button.style.background = '#357abd';
        button.onmouseout = () => button.style.background = '#4a90e2';

        toolbar.appendChild(button);

        console.log('Toolbar-Button erstellt');
    }

    // Sidebar-Inhalt erstellen
    function createSidebarContent() {
        return `
            <div style="font-size: 11px; color: #666; margin-bottom: 10px;">
                Version ${SCRIPT_VERSION} - ${STANDARDNAMEN_DB.length} Unternehmen
            </div>

            <button id="open-standardnamen-btn" style="
                width: 100%;
                padding: 8px;
                background: #4a90e2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                margin-bottom: 10px;
            ">📊 Standardnamen-Tabelle öffnen</button>

            <div style="margin-bottom: 10px;">
                <div style="font-size: 11px; font-weight: bold; margin-bottom: 5px;">Schnellzugriff:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 2px;">
                    <button class="quick-btn" data-filter="Auto Dienstleistungen" style="
                        flex: 1;
                        padding: 4px 6px;
                        background: #e9ecef;
                        border: 1px solid #ced4da;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 10px;
                        min-width: 60px;
                    ">⛽ Tankstellen</button>
                    <button class="quick-btn" data-filter="Geschäfte und Dienstleistungen" style="
                        flex: 1;
                        padding: 4px 6px;
                        background: #e9ecef;
                        border: 1px solid #ced4da;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 10px;
                        min-width: 60px;
                    ">🛒 Geschäfte</button>
                    <button class="quick-btn" data-filter="Speisen und Getränke" style="
                        flex: 1;
                        padding: 4px 6px;
                        background: #e9ecef;
                        border: 1px solid #ced4da;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 10px;
                        min-width: 60px;
                    ">🍽️ Restaurants</button>
                </div>
            </div>

            <div style="border-top: 1px solid #e9ecef; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: bold; margin-bottom: 5px;">Einstellungen:</div>

                <label style="display: flex; align-items: center; margin-bottom: 4px; font-size: 11px; cursor: pointer;">
                    <input type="checkbox" id="auto-open-checkbox" style="margin-right: 6px;" ${settings.autoOpen ? 'checked' : ''}>
                    Automatisch öffnen
                </label>

                <label style="display: flex; align-items: center; margin-bottom: 4px; font-size: 11px; cursor: pointer;">
                    <input type="checkbox" id="tooltips-checkbox" style="margin-right: 6px;" ${settings.showTooltips ? 'checked' : ''}>
                    Tooltips anzeigen
                </label>

                <label style="display: flex; align-items: center; margin-bottom: 8px; font-size: 11px; cursor: pointer;">
                    <input type="checkbox" id="compact-checkbox" style="margin-right: 6px;" ${settings.compactView ? 'checked' : ''}>
                    Kompakte Ansicht
                </label>
            </div>

            <div style="
                background: #e7f3ff;
                border: 1px solid #b3d9ff;
                border-radius: 4px;
                padding: 6px;
                font-size: 10px;
                color: #0066cc;
            ">
                <strong>💡 Tipp:</strong><br>
                Klicken Sie auf eine Tabellenzeile, um den Unternehmensnamen zu kopieren.
            </div>
        `;
    }

    // Event Listeners für Sidebar-Elemente hinzufügen
    function addSidebarEventListeners() {
        // Hauptbutton
        const openBtn = document.getElementById('open-standardnamen-btn');
        if (openBtn) {
            openBtn.onclick = toggleStandardnamenTab;
            openBtn.onmouseover = () => openBtn.style.background = '#357abd';
            openBtn.onmouseout = () => openBtn.style.background = '#4a90e2';
        }

        // Schnellzugriff-Buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.onclick = () => {
                const filter = btn.getAttribute('data-filter');
                showStandardnamenTab();
                setTimeout(() => {
                    const categorySelect = document.getElementById('wme-category-filter');
                    if (categorySelect) {
                        categorySelect.value = filter;
                        filterAndSort();
                    }
                }, 100);
            };
            btn.onmouseover = () => btn.style.background = '#dee2e6';
            btn.onmouseout = () => btn.style.background = '#e9ecef';
        });

        // Checkboxen
        const autoOpenCheckbox = document.getElementById('auto-open-checkbox');
        const tooltipsCheckbox = document.getElementById('tooltips-checkbox');
        const compactCheckbox = document.getElementById('compact-checkbox');

        if (autoOpenCheckbox) {
            autoOpenCheckbox.onchange = () => {
                settings.autoOpen = autoOpenCheckbox.checked;
                saveSettings();
            };
        }

        if (tooltipsCheckbox) {
            tooltipsCheckbox.onchange = () => {
                settings.showTooltips = tooltipsCheckbox.checked;
                saveSettings();
            };
        }

        if (compactCheckbox) {
            compactCheckbox.onchange = () => {
                settings.compactView = compactCheckbox.checked;
                saveSettings();
                if (isTabVisible) {
                    filterAndSort();
                }
            };
        }
    }

    // Einstellungen laden
    function loadSettings() {
        const saved = localStorage.getItem('wme-standardnamen-settings');
        if (saved) {
            try {
                settings = {...settings, ...JSON.parse(saved)};
            } catch (e) {
                console.log('Fehler beim Laden der Einstellungen:', e);
            }
        }
    }

    // Einstellungen speichern
    function saveSettings() {
        localStorage.setItem('wme-standardnamen-settings', JSON.stringify(settings));
    }

    // Standardnamen-Tab erstellen
    function createStandardnamenTab() {
        const tabContainer = document.createElement('div');
        tabContainer.id = 'standardnamen-tab';
        tabContainer.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            width: 800px;
            height: 600px;
            background: white;
            border: 2px solid #4a90e2;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: Arial, sans-serif;
            display: none;
            flex-direction: column;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            background: #4a90e2;
            color: white;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 6px 6px 0 0;
            cursor: move;
        `;

        const title = document.createElement('h3');
        title.textContent = 'Deutsche Standardnamen für Waze POIs';
        title.style.margin = '0';
        title.style.fontSize = '14px';

        // Button-Container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '5px';

        // Refresh-Button
        const refreshBtn = document.createElement('button');
        refreshBtn.innerHTML = '🔄';
        refreshBtn.title = 'Daten neu laden';
        refreshBtn.style.cssText = `
            background: transparent;
            border: 1px solid white;
            color: white;
            padding: 4px 8px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        `;
        refreshBtn.onclick = loadStandardnamen;

        // Schließen-Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.title = 'Schließen';
        closeBtn.style.cssText = `
            background: transparent;
            border: 1px solid white;
            color: white;
            padding: 4px 8px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        `;
        closeBtn.onclick = hideStandardnamenTab;

        buttonContainer.appendChild(refreshBtn);
        buttonContainer.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(buttonContainer);

        // Filter-Bereich
        const filterContainer = document.createElement('div');
        filterContainer.style.cssText = `
            padding: 10px 15px;
            background: #f8f9fa;
            border-bottom: 1px solid #ddd;
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        `;

        // Suchfeld
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Unternehmen suchen...';
        searchInput.id = 'wme-search-input';
        searchInput.style.cssText = `
            flex: 1;
            min-width: 200px;
            padding: 6px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 12px;
        `;
        searchInput.oninput = filterAndSort;

        // Kategorie-Filter
        const categorySelect = document.createElement('select');
        categorySelect.id = 'wme-category-filter';
        categorySelect.style.cssText = `
            width: 200px;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 12px;
        `;
        categorySelect.onchange = filterAndSort;

        // Filter-Optionen erstellen
        const categories = ['alle', ...new Set(STANDARDNAMEN_DB.map(item => item.oberbegriff))].sort();
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat === 'alle' ? 'Alle Kategorien' : cat;
            categorySelect.appendChild(option);
        });

        filterContainer.appendChild(searchInput);
        filterContainer.appendChild(categorySelect);

        // Tabellen-Container
        const tableContainer = document.createElement('div');
        tableContainer.id = 'wme-table-container';
        tableContainer.style.cssText = `
            flex: 1;
            overflow: auto;
            background: white;
        `;

        // Status-Anzeige
        const statusDiv = document.createElement('div');
        statusDiv.id = 'wme-status-display';
        statusDiv.style.cssText = `
            padding: 8px 15px;
            background: #f8f9fa;
            border-top: 1px solid #ddd;
            font-size: 11px;
            color: #666;
        `;

        tabContainer.appendChild(header);
        tabContainer.appendChild(filterContainer);
        tabContainer.appendChild(tableContainer);
        tabContainer.appendChild(statusDiv);
        document.body.appendChild(tabContainer);

        // Drag-Funktionalität hinzufügen
        makeDraggable(tabContainer, header);

        // Daten initial laden
        loadStandardnamen();
    }

    // Tab anzeigen/verstecken
    function toggleStandardnamenTab() {
        if (isTabVisible) {
            hideStandardnamenTab();
        } else {
            showStandardnamenTab();
        }
    }

    function showStandardnamenTab() {
        const tab = document.getElementById('standardnamen-tab');
        if (tab) {
            tab.style.display = 'flex';
            isTabVisible = true;

            // Standard-Kategorie anwenden
            const categorySelect = document.getElementById('wme-category-filter');
            if (categorySelect) {
                categorySelect.value = settings.defaultCategory;
                filterAndSort();
            }
        }
    }

    function hideStandardnamenTab() {
        const tab = document.getElementById('standardnamen-tab');
        if (tab) {
            tab.style.display = 'none';
            isTabVisible = false;
        }
    }

    // Drag-Funktionalität
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Standardnamen laden
    function loadStandardnamen() {
        const statusDiv = document.getElementById('wme-status-display');
        if (statusDiv) {
            statusDiv.textContent = `Geladen: ${STANDARDNAMEN_DB.length} Standardnamen`;
        }
        filterAndSort();
    }

    // Filtern und Sortieren
    function filterAndSort() {
        const searchInput = document.getElementById('wme-search-input');
        const categorySelect = document.getElementById('wme-category-filter');

        if (!searchInput || !categorySelect) return;

        const searchTerm = searchInput.value.toLowerCase();
        const categoryFilter = categorySelect.value;

        let filteredData = STANDARDNAMEN_DB.filter(item => {
            const matchesSearch = item.unternehmen.toLowerCase().includes(searchTerm) ||
                                item.kategorie.toLowerCase().includes(searchTerm) ||
                                item.anmerkung.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === 'alle' || item.oberbegriff === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        // Sortieren
        filteredData.sort((a, b) => {
            let aVal = a[currentSort] || '';
            let bVal = b[currentSort] || '';

            if (sortDirection === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });

        createTable(filteredData);
        updateStatus(filteredData.length);
    }

    // Status aktualisieren
    function updateStatus(count) {
        const statusDiv = document.getElementById('wme-status-display');
        if (statusDiv) {
            statusDiv.textContent = `Angezeigt: ${count} von ${STANDARDNAMEN_DB.length} Einträgen | Klick auf Zeile = Name kopieren`;
        }
    }

    // Tabelle erstellen
    function createTable(data) {
        const tableContainer = document.getElementById('wme-table-container');
        if (!tableContainer) return;

        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.style.cssText = `
            width: 100%;
            border-collapse: collapse;
            font-size: ${settings.compactView ? '10px' : '11px'};
        `;

        // Tabellen-Header
        const header = table.createTHead();
        const headerRow = header.insertRow();

        const columns = [
            {key: 'unternehmen', label: 'Unternehmen', width: '20%'},
            {key: 'oberbegriff', label: 'Oberbegriff', width: '18%'},
            {key: 'kategorie', label: 'Kategorie', width: '22%'},
            {key: 'anmerkung', label: 'Anmerkung', width: '30%'},
            {key: 'filialen', label: 'Ref', width: '10%'}
        ];

        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.label;
            th.style.cssText = `
                background: #f8f9fa;
                padding: ${settings.compactView ? '4px' : '8px'};
                border: 1px solid #ddd;
                text-align: left;
                font-weight: bold;
                cursor: pointer;
                width: ${col.width};
                position: sticky;
                top: 0;
                z-index: 10;
                font-size: ${settings.compactView ? '10px' : '11px'};
            `;

            // Sortier-Indikator
            if (currentSort === col.key) {
                th.textContent += sortDirection === 'asc' ? ' ↑' : ' ↓';
            }

            // Sortier-Event
            th.onclick = () => {
                if (currentSort === col.key) {
                    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort = col.key;
                    sortDirection = 'asc';
                }
                filterAndSort();
            };

            headerRow.appendChild(th);
        });

        // Tabellen-Body
        const tbody = table.createTBody();
        data.forEach((item, index) => {
            const row = tbody.insertRow();
            row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : 'white';

            columns.forEach(col => {
                const cell = row.insertCell();
                let content = item[col.key] || '';

                // Spezielle Formatierung
                if (col.key === 'unternehmen') {
                    cell.style.fontWeight = 'bold';
                    cell.style.color = '#2c5aa0';
                }

                const maxLength = settings.compactView ? 30 : 40;
                if (col.key === 'anmerkung' && content.length > maxLength) {
                    if (settings.showTooltips) {
                        cell.title = content;
                    }
                    content = content.substring(0, maxLength - 3) + '...';
                }

                cell.textContent = content;
                cell.style.cssText += `
                    padding: ${settings.compactView ? '3px' : '6px'};
                    border: 1px solid #ddd;
                    vertical-align: top;
                    word-wrap: break-word;
                    font-size: ${settings.compactView ? '10px' : '11px'};
                `;
            });

            // Hover-Effekt
            row.onmouseover = () => row.style.backgroundColor = '#e6f3ff';
            row.onmouseout = () => row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : 'white';

            // Klick-Event für Kopieren
            row.onclick = () => {
                navigator.clipboard.writeText(item.unternehmen).then(() => {
                    showWMEToast(`"${item.unternehmen}" kopiert`);
                });
            };
            row.style.cursor = 'pointer';

            if (settings.showTooltips) {
                row.title = 'Klicken zum Kopieren';
            }
        });

        tableContainer.appendChild(table);
    }

    // Toast-Nachricht anzeigen
    function showWMEToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4a90e2;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            z-index: 20000;
            font-size: 11px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 1500);
    }

    // Script starten
    waitForWaze();

    // Globale Funktionen für Konsole
    window.WMEStandardnamen = {
        show: showStandardnamenTab,
        hide: hideStandardnamenTab,
        toggle: toggleStandardnamenTab,
        reload: loadStandardnamen,
        settings: settings,
        saveSettings: saveSettings
    };

})();
