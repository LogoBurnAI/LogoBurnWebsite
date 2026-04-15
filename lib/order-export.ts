import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Order } from '@/types'

// ============================================
// ORDER EXPORT UTILITY
// Creates a ZIP package containing:
// - Print-ready PNG files for each item
// - B2Sign order sheet (CSV + PDF-ready HTML)
// - Instructions for submitting via B2Sign white label
// ============================================

export async function exportOrderPackage(order: Order, designDataUrls: Record<string, string>) {
  const zip = new JSZip()
  const orderFolder = zip.folder(`ORDER-${order.id}`)!

  // 1. Add design files
  const designsFolder = orderFolder.folder('print-files')!
  for (const item of order.items) {
    const dataUrl = designDataUrls[item.productId]
    if (dataUrl) {
      const base64 = dataUrl.split(',')[1]
      const filename = `${item.productName.replace(/\s+/g, '-')}_${item.size.replace(/\s+/g, '-')}_${item.b2signSku}.png`
      designsFolder.file(filename, base64, { base64: true })
    }
  }

  // 2. Generate B2Sign order sheet (CSV)
  const csvRows = [
    ['B2Sign Order Sheet', '', '', '', '', '', ''],
    ['Order ID', order.id, '', '', '', '', ''],
    ['Date', new Date(order.createdAt).toLocaleDateString(), '', '', '', '', ''],
    ['Customer', order.customerName, '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['SKU', 'Product', 'Size', 'Finish', 'Qty', 'Wholesale Price', 'Print File'],
    ...order.items.map(item => [
      item.b2signSku,
      item.productName,
      item.size,
      item.finish,
      item.quantity.toString(),
      `$${item.b2signWholesalePrice.toFixed(2)}`,
      `${item.productName.replace(/\s+/g, '-')}_${item.size.replace(/\s+/g, '-')}_${item.b2signSku}.png`,
    ]),
    ['', '', '', '', '', '', ''],
    ['Ship To:', '', '', '', '', '', ''],
    [order.shippingAddress.name, '', '', '', '', '', ''],
    [order.shippingAddress.line1, '', '', '', '', '', ''],
    [order.shippingAddress.line2 || '', '', '', '', '', '', ''],
    [`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`, '', '', '', '', '', ''],
  ]

  const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  orderFolder.file('b2sign-order-sheet.csv', csvContent)

  // 3. Generate HTML instructions page
  const html = generateOrderHTML(order)
  orderFolder.file('ORDER-INSTRUCTIONS.html', html)

  // 4. Generate the ZIP and trigger download
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `PrintForge-ORDER-${order.id}.zip`)
}

function generateOrderHTML(order: Order): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Order ${order.id} - B2Sign Submission Guide</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; color: #333; }
    h1 { color: #1a1a2e; border-bottom: 3px solid #e94560; padding-bottom: 10px; }
    h2 { color: #e94560; margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #1a1a2e; color: white; padding: 10px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #eee; }
    tr:hover td { background: #f9f9f9; }
    .step { background: #f0f4ff; border-left: 4px solid #e94560; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .step-num { font-size: 1.5em; font-weight: bold; color: #e94560; }
    .address-box { background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
    .total-box { background: #1a1a2e; color: white; padding: 20px; border-radius: 8px; text-align: right; font-size: 1.2em; }
  </style>
</head>
<body>
  <h1>📦 PrintForge Order Package</h1>
  <p><strong>Order ID:</strong> ${order.id}</p>
  <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

  <h2>📋 Step-by-Step: Submit to B2Sign White Label</h2>

  <div class="step"><span class="step-num">1.</span> Go to <a href="https://www.b2sign.com" target="_blank">b2sign.com</a> and log in to your white label reseller account.</div>
  <div class="step"><span class="step-num">2.</span> For each item below, find the product by SKU and select the correct size and finish option.</div>
  <div class="step"><span class="step-num">3.</span> Upload the corresponding print file from the <strong>print-files/</strong> folder in this ZIP.</div>
  <div class="step"><span class="step-num">4.</span> Enter the ship-to address exactly as shown below — this ships directly to your customer.</div>
  <div class="step"><span class="step-num">5.</span> Record the B2Sign order number and update it in your PrintForge dashboard.</div>

  <h2>🛒 Order Items</h2>
  <table>
    <tr>
      <th>SKU</th><th>Product</th><th>Size</th><th>Finish</th><th>Qty</th><th>Wholesale Cost</th><th>Print File</th>
    </tr>
    ${order.items.map(item => `
    <tr>
      <td><strong>${item.b2signSku}</strong></td>
      <td>${item.productName}</td>
      <td>${item.size}</td>
      <td>${item.finish}</td>
      <td>${item.quantity}</td>
      <td>$${item.b2signWholesalePrice.toFixed(2)}</td>
      <td>${item.productName.replace(/\s+/g, '-')}_${item.size.replace(/\s+/g, '-')}_${item.b2signSku}.png</td>
    </tr>`).join('')}
  </table>

  <h2>📬 Ship To (Your Customer)</h2>
  <div class="address-box">
    <strong>${order.shippingAddress.name}</strong><br>
    ${order.shippingAddress.line1}<br>
    ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
    ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}
  </div>

  <h2>💰 Financials</h2>
  <div class="total-box">
    <div>You Charged Customer: $${order.total.toFixed(2)}</div>
    <div style="font-size:0.8em; margin-top:8px; color:#aaa;">
      B2Sign Cost: $${order.items.reduce((s, i) => s + i.b2signWholesalePrice * i.quantity, 0).toFixed(2)} +
      Shipping
    </div>
  </div>
</body>
</html>`
}
