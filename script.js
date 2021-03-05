var unit = [
       [
        {name:"Meter",value:1},{name:"Kilometer",value:1000},{name:"Decimeter",value:0.1},{name:"Centimeter",value:0.01},{name:"Milimeter",value:0.001},
        {name:"Mile",value:1609.344},{name:"Fot",value:0.3048},{name:"Yard",value:0.9144},{name:"Rod",value:5.02921},{name:"Parsec",value:30856780000000000},{name:"Ljusår",value:9460730000000000}
    ],

        [
        {name:"Kvadratmeter",value:1},{name:"Kvadratdecimeter",value:0.01},{name:"Kvadratcentimeter",value:0.0001},{name:"Kvadratmillimeter",value:0.000001},{name:"Kvadratkilometer",value:1000000},
        {name:"Kvadratmile",value:2589988110.34},{name:"Kvadratfot",value:0.09290304},{name:"Kvadratyard",value:0.1111111},{name:"Kvadratrod",value:0.003673088},{name:"Kvadratinch",value:0.00064516}
    ],

        [
        {name:"Kubikmeter",value:1},{name:"Kubikdecimeter",value:0.001},{name:"Kubikcentimeter",value:0.000001},{name:"Kubikmillimeter",value:0.000000001},
        {name:"Liter",value: 0.001},{name:"Deciliter",value:0.0001},{name:"Centiliter",value:0.00001},{name:"Milliliter",value:0.000001},
        {name:"Matsked",value:0.000015},{name:"Tesked",value:0.000005},{name:"Kryddmått",value:0.000001},
        {name:"Cup",value:0.0002841306},{name:"Tablespoon",value:0.00001775816},{name:"Teaspoon",value:0.000005919388},
        {name:"Ounce",value:0.00002841306},{name:"Gallon",value:0.00454609}
    ],

        [
            {name:"Celsius",value:{add:0,multiply:1}},{name:"Kelvin",value:{add:-273.15,multiply:1}},{name:"Fahrenheit",value:{add:32,multiply:1.8}}
    ],

        [
            {name:"Gram",value:1},{name:"Dekagram",value:10},{name:"Hektogram",value:100},{name:"Kilogram",value:1000},{name:"Ton",value:1000000},{name:"Decigram",value:0.1},{name:"Centigram",value:0.01},{name:"Milligram",value:0.001},{name:"Microgram",value:0.000001},
            {name:"Ounce",value:28.34952},{name:"Pound",value:453.5924},{name:"Ton(imperial)",value:907184.7}
    ],

        [
        {name:"Sekund",value:1},{name:"Minut",value:60},{name:"Timme",value:3600},{name:"Dag",value:86400},{name:"Vecka",value:604800},{name:"Månad",value:2629800},{name:"År",value:31557600},{name:"Årtionde",value:315576000},{name:"Århundrade",value:3155760000}
    ],

        [
            {name:"Joule",value:1},{name:"Wattimme",value:3600}
    ],

        [
            {name:"PSI",value:1},{name:"Pascal",value:0.0001450377}
    ],

        [
            {name:"KM/H",value:1},{name:"M/S",value:3.6},{name:"Knop",value:1.852001},{name:"MPH",value:1.609344} 
        ]
]

var option, option2, lastValue, selectInput, selectOutput, numberInput, numberOutput;

var dimensions = [{name:"Längd",value:"d1"},{name:"Area",value:"d2"},{name:"Volym",value:"d3"},{name:"Temperatur",value:"temperatur"},{name:"Massa", value:"massa"},{name:"Tid",value:"tid"},{name:"Energi",value:"energi"},{name:"Tryck",value:"tryck"},{name:"Hastighet",value:"hastighet"}]



function update(){
    selectInput = document.getElementById('selectInput');
    selectOutput = document.getElementById('selectOutput');
    
    numberInput = document.getElementById('numberInput');
    numberOutput = document.getElementById('numberOutput');

    requestAnimationFrame(update);

    for(let h = 0; h<dimensions.length; h++){
        if(document.getElementById("dimensionInput").value === dimensions[h].value && document.getElementById("dimensionInput").value !== lastValue){
            lastValue = document.getElementById("dimensionInput").value;

            for (var x = -1; x < 100; x++) {
                document.getElementById("selectInput").remove(0);
                document.getElementById("selectOutput").remove(0);
            } 
            for (var i = 0; i <  unit[h].length; i++) {
                option = document.createElement( 'option' );
                option.value = option.text =  unit[h][i].name;
                option2 = document.createElement( 'option' );
                option2.value = option2.text =  unit[h][i].name;
                selectInput.add( option);
                selectOutput.add( option2);
            }
        }
        
        for(let i = 0;i <  unit[h].length; i++){
            if(dimensions[h].value !== "temperatur"){
                if(selectInput.value ===  unit[h][i].name){
                    var tmp = eval(numberInput.value)* unit[h][i].value;
                    for(let g = 0;g <  unit[h].length; g++){
                        if(selectOutput.value ===  unit[h][g].name){
                            if(Math.floor((tmp/unit[h][g].value*1)*1000000)/1000000 === 0){
                                numberOutput.innerHTML = "<0.0000001"
                            }else{
                                numberOutput.innerHTML = Math.floor((tmp/unit[h][g].value*1)*1000000)/1000000;
                            }
                        }
                    }
                }
            }else{
                if(selectInput.value ===  unit[h][i].name ){
                    if(selectInput.value === "Kelvin" && selectOutput.value === "Fahrenheit"){
                        numberOutput.innerHTML = eval(numberInput.value) * 1.8 - 459.67;
                    }else if(selectInput.value === "Fahrenheit" && selectOutput.value === "Kelvin"){
                        numberOutput.innerHTML = (eval(numberInput.value)-32) / 1.8 + 273.15;
                    }else{
                        var tmp = (eval(numberInput.value) - unit[h][i].value.add) / unit[h][i].value.multiply;

                        for(var g = 0;g <  unit[h].length; g++){
                            if(selectOutput.value ===  unit[h][g].name && selectOutput.value){
                                numberOutput.innerHTML = (tmp * unit[h][g].value.multiply) + unit[h][g].value.add
                            }
                        }
                    }
                }
            }
        }
    }
    if(eval(numberInput.value) === undefined){
        numberOutput.innerHTML = 0;
    }
}
for (let i = 0; i < dimensions.length; i++) {
    option = document.createElement( 'option' );
    option.value = dimensions[i].value;
    option.text = dimensions[i].name;
    document.getElementById('dimensionInput').add(option);
}
update();

