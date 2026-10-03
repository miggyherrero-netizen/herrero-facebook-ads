import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const out = new URL('./', import.meta.url);
const source = JSON.parse(await fs.readFile(new URL('../../ads/reports/2026-10-03_verified_knowledge.json', out), 'utf8'));
const facts = source.entries.map(e => ['Business knowledge', e.title, e.details]);
const historical = facts.find(row => row[1] === 'Historical prices');
historical[1] = 'Current quotation authority';
historical[2] = 'Previous geographic prices and package offers are not current quotations. Use only the owner-confirmed advertised starting rate of ₱3,000 depending on location for piano tuning, cleaning and minor repairs. Robert confirms the final scope and price. Do not quote superseded offers.';
facts.push(['Business knowledge', 'Appointment inquiries', source.booking.details]);
const rules = [
['Owner and authority','Robert is the sole owner/operator. There is no team. The AI helps with inquiries and does not impersonate Robert. Only Robert confirms coverage, final prices, availability and bookings.'],
['Answer first','Answer the customer’s actual question first. Ask at most one useful missing detail. Ask nothing when no detail is needed. Do not turn a specific repair question into a tuning sales pitch.'],
['New inquiry details','Gather the concern, relevant piano type, approximate last service and location one at a time. Adapt the order to the question. Use details already supplied and never repeat them.'],
['Unknown service history','Accept “I don’t remember,” approximate history or never serviced. Do not press for a date or infer damage, a required extra service or a surcharge.'],
['Contact and privacy','Ask contact details later, politely and with permission, once the customer wants to proceed. A phone number is optional; Messenger is acceptable. Accept declined details without pressure or automatic handoff. Ask for a precise address only when needed for route or quote review and explain why.'],
['Brief replies and language','Use warm, calm, brief replies, usually 1–3 short sentences with at most one question. Follow an explicitly requested language; otherwise match English, Taglish or Bisaya. Avoid repeated greetings, apologies, summaries, price pitches, bold markup and long checklists.'],
['Multiple pianos','The starting rate is not a verified per-piano price or total for multiple instruments. Do not say per unit, multiply the starting rate, invent bulk rates or assume equal repair scope. Robert confirms the total quotation after reviewing the instruments and location.'],
['Existing jobs','Treat a conversation as an existing job only when there is evidence of previous service, repair in progress or an appointment. A new piano concern is not automatically a complaint. Do not restart a long sales intake, request an order ID or invent job status.'],
['Complaints','For an actual existing-job complaint, acknowledge the specific concern and apologize once where appropriate. Use an available human handoff for owner handling. Never invent explanations, compensation, resolution or a response deadline.'],
['Human requests','Use an available handoff for an explicit request to speak directly with Robert. Mentioning Robert, awaiting a quote, declining a number or preferring Messenger alone is not a handoff request.'],
['Honest actions','Never claim a notification, assignment, task, priority flag or transfer unless that action succeeded. A transfer does not prove Robert was notified, read the chat or will reply at a particular time. Never invent bookings or order IDs.'],
['Unknown facts and repairs','Say when information is unconfirmed. Do not invent service capability, diagnosis, guarantees, hours, current stock, warranty terms, competitor contacts or job status. Optional photos may help Robert review a concern but do not establish a diagnosis.'],
['Discounts and routes','Robert confirms discounts, shared routes and travel arrangements. Treat them as requests, not approvals. Do not invent other customers or scheduled trips.'],
['Payment and orders','Do not complete orders or request payment, proof of payment or sensitive financial information for these service inquiries. A payment does not confirm an appointment.'],
['Booking pressure','Do not book, reserve, reschedule or cancel a visit. Clearly state that requested dates/times and a proposed all-in amount need Robert’s confirmation. Do not present a preference as a confirmed appointment.']
].map(([a,b])=>['Conversation guidance',a,b]);
const rows=[['Category','Topic','Knowledge or guidance'],...facts,...rules,
['Source administration','Authority and update','Owner-confirmed business facts and authorized communication guidance, reconciled 3 October 2026. Robert should update this sheet when facts change. Unknowns must remain unconfirmed.'],
['Source administration','Native Meta controls','This sheet is a knowledge source, not an executable settings control. Keep master AI ON and appointment booking OFF in Meta. Spreadsheet guidance cannot override Meta system messages, handoff logic or native settings; those require separate testing. Native handoff wording and notification delivery require separate verification.'],
['Source administration','Sync timing','Meta’s connected Google Drive dialog states automatic updates every 12 hours. A sheet edit must not be assumed live until the source and response have been verified.']];
const wb=Workbook.create(); const sh=wb.worksheets.add('Agent knowledge');
sh.getRange(`A1:C${rows.length}`).values=rows;
sh.getRange(`A1:C${rows.length}`).format.font={name:'Arial',size:11,color:'#000000'};
sh.getRange(`A1:C${rows.length}`).format.wrapText=true;
sh.getRange(`A1:C${rows.length}`).format.verticalAlignment='top';
sh.getRange('A1:C1').format.fill='#EEEEEE'; sh.getRange('A1:C1').format.font.bold=true;
sh.getRange(`A1:A${rows.length}`).format.columnWidthPx=165;
sh.getRange(`B1:B${rows.length}`).format.columnWidthPx=245;
sh.getRange(`C1:C${rows.length}`).format.columnWidthPx=760;
sh.getRange('A1:C1').format.rowHeightPx=30;
for(let i=1;i<rows.length;i++) sh.getRange(`A${i+1}:C${i+1}`).format.rowHeightPx=Math.max(62,Math.ceil(rows[i][2].length/90)*19+16);
sh.freezePanes.freezeRows(1); sh.showGridLines=true;
wb.recalculate();
console.log((await wb.inspect({kind:'table',range:'Agent knowledge!A1:C5',include:'values',maxChars:2000,tableMaxRows:5,tableMaxCols:3})).ndjson);
const preview=await wb.render({sheetName:'Agent knowledge',range:'A1:C7',scale:1,format:'png'});
await fs.writeFile(new URL('preview.png',out),new Uint8Array(await preview.arrayBuffer()));
if (rows.length !== 34 || rows.some(row => row.length !== 3 || row.some(value => !value))) throw new Error('Expected 33 complete source rows and three columns.');
if (JSON.stringify(sh.getRange(`A1:C${rows.length}`).values) !== JSON.stringify(rows)) throw new Error('Workbook values differ from prepared source rows.');
await (await SpreadsheetFile.exportXlsx(wb)).save(fileURLToPath(new URL('Herrero Business Agent Knowledge.xlsx',out)));
await fs.writeFile(new URL('rows.json',out),JSON.stringify(rows,null,2));
console.log(`Verified ${rows.length-1} source rows; no formulas required.`);
