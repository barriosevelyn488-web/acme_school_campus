export class HtmlExporter {
  download(title, rows, columns, getValue) {
    const heading = this.escape(title);
    const headers = columns.map(({ label }) => `<th>${this.escape(label)}</th>`).join('');
    const body = rows.map((row) => {
      const cells = columns.map((column) => {
        return `<td>${this.escape(getValue(column.field, row) || '—')}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${heading}</title>
  <style>
    body { margin: 40px; color: #192235; font: 14px Arial, sans-serif; }
    h1 { color: #263b67; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { padding: 10px; border: 1px solid #d8deea; text-align: left; }
    th { background: #edf1f8; }
    tr:nth-child(even) { background: #f8f9fb; }
    @media print { body { margin: 15mm; } }
  </style>
</head>
<body>
  <h1>${heading}</h1>
  <p>Campus · Generado ${new Date().toLocaleString('es')}</p>
  <p>${rows.length} registros</p>
  <table><thead><tr>${headers}</tr></thead>
    <tbody>${body || `<tr><td colspan="${columns.length}">Sin registros</td></tr>`}</tbody>
  </table>
</body>
</html>`;

    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  escape(value) {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, (character) => entities[character]);
  }
}
