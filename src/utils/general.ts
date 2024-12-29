
export function jsonToQueryParams(json: Record<string, string>): string {
  const params = new URLSearchParams();

  for (const key in json) {
      if (json.hasOwnProperty(key)) {
          const value = json[key];

          // Manejar valores que son arreglos o objetos
          if (Array.isArray(value)) {
              value.forEach(val => {
                  params.append(key, val);
              });
          } else if (typeof value === 'object' && value !== null) {
              params.append(key, JSON.stringify(value));
          } else {
              params.append(key, String(value));
          }
      }
  }
  return params.toString();
}
export function capitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}
export function sumPosition(p1, p2){
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
        z: p1.z + p2.z,
    };
}

export function genRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function genIntArr(length: number, min: number, max: number): number[] {
    let array = Array.from({ length }, () => Math.random());
    const randomInt = genRandomInt(min, max);
    let suma = array.reduce((acc, num) => acc + num, 0);
    const ratio = randomInt / suma;
    array = array.map((el) => {
        return Math.round(el * ratio);
    })
    suma = array.reduce((acc, num) => acc + num, 0);
    const overLimit = suma >= max;
    const underLimit = suma < min;
    let difference = overLimit ? suma - max + 1 : underLimit ? min - suma : 0

    while(difference > 0){
        if(overLimit){
            const indicesMayoresQueCero = array
                .map((num, index) => num >= 1 ? index : -1)
                .filter(index => index !== -1);
            const index = genRandomInt(0, indicesMayoresQueCero.length);
            array[index] -= 1;
            difference -= 1;
        }else if(underLimit){
            const index = genRandomInt(0, array.length);
            array[index] += 1;
            difference -= 1;
        } else{
            break
        }
    }
    return array;

}
