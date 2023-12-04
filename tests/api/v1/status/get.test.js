test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.version).toBeDefined();
  expect(typeof responseBody.max_connections).toEqual("number");
  expect(typeof responseBody.opened_connections).toEqual("number");

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.max_connections).toBeGreaterThanOrEqual(
    responseBody.opened_connections
  );
});
