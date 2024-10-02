

export const success = (
  status: number,
  body: object
) => {
  return new Response(
    JSON.stringify({
      body,
      status,
      error: false,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const error = (
  status: number,
  body: object
) => {
  return new Response(
    JSON.stringify({
      body,
      status,
      error: true,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
