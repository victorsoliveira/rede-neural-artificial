var train = true;
var rn = new RedeNeural(2, 10, 2);

function setup() {
    createCanvas(500, 500);
    background(0);

    // Características

    // Pelo longo
    // Late
    // oincoinc

    let porco1 = [0, 0, 1];
    let porco2 = [1, 0, 1];
    let cachorro1 = [1, 1, 0];
    let cachorro2 = [0, 1, 0];

    //CACHORRO OU PORCO
    dataset = {
        inputs: [
            porco1,
            porco2,
            cachorro1,
            cachorro2
        ],
        outputs: [
            [1, 0], //porco
            [1, 0], //porco
            [0, 1], //cachorro
            [0, 1] //cachorro
        ]
    }

}

function draw() {

    if (train) {
        for (let i = 0; i < 10000; i++) {
            let index = floor(random(4));
            rn.train(dataset.inputs[index], dataset.outputs[index]);
        }

        if (rn.predict([0, 0, 1])[0] > 0.98 && rn.predict([1, 1, 0])[1] > 0.98) {
            train = false;
            console.log("terminou");
        }
    }
}