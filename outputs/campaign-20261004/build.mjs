import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const out = fileURLToPath(new URL('.', import.meta.url));
const wb=Workbook.create();
const review=wb.worksheets.add('Review'), pipe=wb.worksheets.add('Inquiries'), spend=wb.worksheets.add('Daily spend');
const money='"PHP "#,##0.00';
for(const s of [review,pipe,spend]) {s.showGridLines=false;s.getRange('A1:W110').format.font={name:'Arial',size:11,color:'#202830'};s.getRange('A1:W110').format.columnWidth=19;s.getRange('A1:W110').format.rowHeight=23;}
function title(s,t){s.getRange('A2').values=[[t]];s.getRange('A2').format.font={name:'Arial',size:16,bold:true};}
function header(s,r,heads){s.getRangeByIndexes(r-1,0,1,heads.length).values=[heads];s.getRangeByIndexes(r-1,0,1,heads.length).format={fill:'#243C50',font:{color:'#FFFFFF',bold:true},wrapText:true,rowHeight:46};s.freezePanes.freezeRows(r);s.freezePanes.freezeColumns(2);}
title(review,'R. Herrero campaign review');
review.getRange('A4:C7').values=[['Control','Value','Meaning'],['Initial ad allowance',3500,'Owner confirmed; ad spend only'],['Average daily budget',500,'Approved direction; not a daily hard cap'],['Data through',null,'Enter date after reconciling both input sheets']];
review.getRange('A9:C9').values=[['Metric','Value','Definition']];
review.getRange('A10:A21').values=[['Ad spend'],['Allowance remaining'],['Unique inquiries'],['Robert-approved opportunities'],['Bookings recorded'],['Completed jobs'],['Net cash collected'],['Recorded direct job costs'],['Cash contribution after ads'],['Cost per opportunity'],['Cost per completed job'],['Review action']];
const rf=[
'=IF(COUNT(\'Daily spend\'!C6:C105)=0,"",SUM(\'Daily spend\'!C6:C105))',
'=IF(B10="","",B5-B10)',
'=IF(COUNTA(Inquiries!A6:A105)=0,"",COUNTA(Inquiries!A6:A105))',
'=IF(B12="","",COUNT(Inquiries!I6:I105))',
'=IF(B12="","",COUNT(Inquiries!J6:J105))',
'=IF(B12="","",COUNT(Inquiries!K6:K105))',
'=IF(COUNT(Inquiries!N6:O105)=0,"",SUM(Inquiries!N6:N105)-SUM(Inquiries!O6:O105))',
'=IF(COUNT(Inquiries!Q6:Q105)=0,"",SUM(Inquiries!Q6:Q105))',
'=IF(OR(B10="",B16="",B17=""),"",B16-B17-B10)',
'=IF(OR(B10="",B13="",B13=0),"n.a.",B10/B13)',
'=IF(OR(B10="",B15="",B15=0),"n.a.",B10/B15)',
'=IF(B10="","Await spend data",IF(B10>=B5,"STOP: allowance reached",IF(B10>=2500,"Review before further spend","Daily review required")))'];
review.getRange('B10:B21').formulas=rf.map(x=>[x]);
review.getRange('C10:C21').values=[['Sum of non-overlapping campaign/day rows'],['May be negative if overspent; this workbook cannot stop ads'],['One row per distinct service inquiry; exclude owner tests/spam'],['Date entered only after Robert approves feasibility and intent'],['Booking date recorded; canceled jobs retain their history'],['Actual completion date only'],['Cumulative payments less refunds; not earned revenue'],['Enter zero only when confirmed; include travel cash costs'],['Cash basis, not profit; may include advance payments'],['Ad spend / Robert-approved opportunities'],['Ad spend / completed jobs'],['PHP 2,500 is a proposed review trigger, not an automatic stop']];
review.getRange('A24:C28').values=[['Customer mix','Inquiry count','Completed jobs'],['New',null,null],['Repeat',null,null],['Unknown',null,null],['Definitions','New = no prior paid job','Classify at first inquiry; no guessing']];
for(let r=25;r<=27;r++){review.getRange(`B${r}`).formulas=[[`=IF($B$12="","",COUNTIFS(Inquiries!D6:D105,A${r}))`]];review.getRange(`C${r}`).formulas=[[`=IF($B$12="","",COUNTIFS(Inquiries!D6:D105,A${r},Inquiries!K6:K105,">0"))`]];}
review.getRange('A31').values=[['Use after reconciling entries. Blank means missing, not zero. No customer names, phone numbers or addresses.']];
review.getRange('A33').values=[['Source: owner confirmations and live Meta review, 4 October 2026; separate campaign approval plan.']];
review.getRange('A35').values=[['Daily: log spend; deduplicate inquiries; Robert confirms stages; reconcile payments and costs.']];
review.getRange('A36').values=[['At PHP 2,500: review quality and capacity. At PHP 3,500: stop; no automatic renewal.']];
review.getRange('A37').values=[['Review Day 3 and Day 7 if launched; compare new/repeat outcomes. Conversations are not leads or sales.']];
review.getRange('A4:A28').format.columnWidth=34;review.getRange('B4:B28').format.columnWidth=27;review.getRange('C4:C28').format.columnWidth=80;
for(const r of [4,9,24])review.getRange(`A${r}:C${r}`).format={fill:'#243C50',font:{color:'#FFFFFF',bold:true}};
review.getRange('B5:B6').setNumberFormat(money);review.getRange('B7').setNumberFormat('yyyy-mm-dd');review.getRange('B10:B11').setNumberFormat(money);review.getRange('B16:B20').setNumberFormat(money);review.getRange('B7').format.fill='#FFF2CC';
title(pipe,'Unique inquiry to payment');
pipe.getRange('A3').values=[['One inquiry per row. Use opaque IDs. Split distinct jobs into linked inquiry IDs; reconcile repeat customers via customer ID.']];
pipe.getRange('A4').values=[['Keep dates after cancellation. Payment fields are cumulative per inquiry; update totals, do not add payment rows. Exclude all test chats.']];
header(pipe,5,['Inquiry ID','Customer ID','First inquiry','Customer type','Source / ad ID','Attribution evidence','Service / piano','Area only','Robert opportunity date','Booking date','Completion date','Current status','Final quote PHP','Cash received PHP','Refunds PHP','Last payment date','Direct costs PHP','Lost / cancellation reason','Robert approval reference','Next follow-up','Source checked date']);
pipe.getRange('A6:U105').format.fill='#FFF9E8';
pipe.getRange('D6:D105').dataValidation={rule:{type:'list',values:['New','Repeat','Unknown']}};
pipe.getRange('L6:L105').dataValidation={rule:{type:'list',values:['Inquiry','Opportunity','Booked','Completed','Paid','Lost','Canceled']}};
for(const c of ['C','I','J','K','P','T','U'])pipe.getRange(`${c}6:${c}105`).setNumberFormat('yyyy-mm-dd');
for(const c of ['M','N','O','Q'])pipe.getRange(`${c}6:${c}105`).setNumberFormat(money);
pipe.getRange('A6:A105').conditionalFormats.add('duplicateValues',{format:{fill:'#FADBD8'}});
pipe.getRange('E5:H105').format.columnWidth=26;pipe.getRange('R5:S105').format.columnWidth=30;
title(spend,'Daily Meta campaign spend');
spend.getRange('A3').values=[['One campaign total per day; never mix ad-level rows. Update the existing date when Meta revises it.']];
spend.getRange('A4').values=[['Copy exact result label and attribution setting from export. Blank = unreported. Zero = explicitly reported zero.']];
header(spend,5,['Account date','Campaign ID','Spend PHP','Reported conversations','Exact result label','Attribution setting','Account time zone','Extract timestamp','Export reference','Reviewer / decision']);
spend.getRange('A6:J105').format.fill='#FFF9E8';spend.getRange('A6:A105').setNumberFormat('yyyy-mm-dd');spend.getRange('C6:C105').setNumberFormat(money);spend.getRange('B5:B105').format.columnWidth=28;spend.getRange('E5:J105').format.columnWidth=30;
spend.getRange('A6:A105').conditionalFormats.add('duplicateValues',{format:{fill:'#FADBD8'}});
// Disposable inputs verify blanks, zero and spend threshold; remove before delivery.
wb.recalculate();if(review.getRange('B10').values[0][0]!=='' )throw new Error('Blank spend guard');
spend.getRange('C6').values=[[0]];if(review.getRange('B10').values[0][0]!==0)throw new Error('Zero guard');
spend.getRange('C6').values=[[3500]];if(review.getRange('B21').values[0][0]!=='STOP: allowance reached')throw new Error('Stop threshold');
spend.getRange('C6').clear({applyTo:'contents'});wb.recalculate();
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:20},summary:'Formula errors'})).ndjson);
for(const [s,range] of [[review,'A1:C28'],[pipe,'A1:H8'],[spend,'A1:J8']]){const p=await wb.render({sheetName:s.name,range,scale:1,format:'png'});await fs.writeFile(`${out}/${s.name.replaceAll(' ','-')}.png`,new Uint8Array(await p.arrayBuffer()));}
await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/RH_campaign_tracker.xlsx`);
console.log('Exported tracker; blank/zero/threshold checks passed. No actual inquiry or spend data populated.');
