# Saddles Factory Control Tower

Lean clickable MVP prototype for the Bangalore factory management demo.

## What It Shows

- Bangalore-only factory dashboard
- Roll-to-dispatch traceability
- Inventory, GRN, roll label, and print gateway flow
- Production WIP with stitching operation detail
- Reports for production, WIP, quality, material/yield, dispatch, and productivity
- Quality checklist and NCR-lite view
- Dispatch pack with mock ASN/Tally/GST status
- Management recommendations tied to rework, yield, scan compliance, and dispatch risk

## How To Run

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## Files

- `index.html` - prototype screens and structure
- `styles.css` - visual design and responsive layout
- `app.js` - static demo data and click interactions

