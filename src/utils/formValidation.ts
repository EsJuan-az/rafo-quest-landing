export interface ValidationResponse {
  ok: boolean;
  field: string | null;
  message: string | null;
}
export class FormValidation {
  static createBook({trophyType}){
    const response = {
      ok: true,
      field: null,
      message: null,
    }
    if( !['canon', 'nini', 'bonus'].includes(trophyType) ){
      response.ok = false;
      response.field = 'Book type';
      response.message = `${trophyType} isn't a valid option`
    }
    return response;
  }
} 