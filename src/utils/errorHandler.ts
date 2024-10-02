// utils/errorHandler.js
export const errorHandler = (error) => {
  console.error('Error:', error); // Loguea el error en la consola
  if( error.response ){
    return error.response;
  }
  return {
    body: {
      message: 'Error desconocido', // Mensaje de error para el usuario
    },
    status: 500, // Código de estado de la respuesta
    error: true,
  };
};