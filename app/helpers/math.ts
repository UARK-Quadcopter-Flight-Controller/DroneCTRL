
export const map = (input: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export const getCardinalDirection = (heading: number): string => {
    if (heading >= 0 && heading < 10)
        return "N";
    if (heading >= 10 && heading < 80)
        return "NE";
    if (heading >= 80 && heading < 100)
        return "E";
    if (heading >= 100 && heading < 170)
        return "SE";
    if (heading >= 170 && heading < 190)
        return "S";
    if (heading >= 190 && heading < 260)
        return "SW";
    if (heading >= 260 && heading < 280)
        return "E";
    if (heading >= 280 && heading < 350)
        return "NE";
    if (heading >= 350 && heading <= 360) 
        return "N";

    return "?";
}