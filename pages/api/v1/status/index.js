import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query(
    "SELECT count(*) as opened_connections FROM pg_stat_activity;"
  );

  response.status(200).json({
    updated_at: updatedAt,
    version: databaseVersion.rows[0].server_version,
    max_connections: Number(maxConnections.rows[0].max_connections),
    opened_connections: Number(openedConnections.rows[0].opened_connections),
  });
}

export default status;
