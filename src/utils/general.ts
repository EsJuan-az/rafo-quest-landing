export function jsonToQueryParams(json: Record<string, any>): string {
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