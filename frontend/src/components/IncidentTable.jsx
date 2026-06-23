function IncidentTable({
  incidents,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
        }}
      >
        Recent Incidents
      </h3>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Severity</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map(
            (incident) => (
              <tr
                key={incident.id}
              >
                <td>
                  {incident.id}
                </td>

                <td>
                  {
                    incident.title
                  }
                </td>

                <td>
                  {
                    incident.severity
                  }
                </td>

                <td>
                  {
                    incident.category
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentTable;