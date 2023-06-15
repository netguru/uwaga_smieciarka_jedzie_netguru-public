const FACTORS: { [material: string]: number } = {
    plastic: 1.5,
    cotton: 1.8,
    wood: 0.25,
    paper: 1.3,
    aluminum_foil: 11.0,
    steel: 1.8,
    leather: 4.0,
    glass: 0.85,
    ceramic: 0.6,
    rubber: 2.7,
    silk: 5.8,
    wool: 5.2,
    polyester: 2.7,
    nylon: 5.6,
    brass: 5.0,
    copper: 4.0,
    bamboo: 0.2,
    latex: 3.0,
    concrete: 0.1,
    stainless_steel: 2.5,
    polyurethane_foam: 3.5,
    memory_foam: 3.5,
    latex_foam: 3.0,
    juice: 0.4,
    milk: 1.2,
    coke: 0.4,
    wheat: 0.5,
    chocolate: 4.5,
    sugar: 0.6,
    water: 0.001,
    other: 0
}

// interface Input {
//     total_weight: number;
//     composition: {
//         [material: string]: number;
//     };
// }

interface Input {
    [material: string]: number;
}

function calculateCO2Savings(composition: Input) {
    let totalCO2 = 0;

    for (const material in composition) {
        if (composition.hasOwnProperty(material)) {
            const itemWeight = composition[material];
            const factor = FACTORS[material];

            if (factor !== undefined) {
                const materialCO2 = itemWeight * factor;
                totalCO2 += materialCO2;
                console.warn("totalCo2", totalCO2)
            } else {
                throw new Error(`Factor for ${material} is not defined.`);
            }
        }
    }

    return totalCO2;
}

export default calculateCO2Savings;




