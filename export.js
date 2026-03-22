// Export calls to CSV for demand letters / small claims
const fs = require('fs');
const path = require('path');

// Read the localStorage file (you'll need to extract this from browser)
// For now, this is a template for when you have the data

function generateDemandLetter(call) {
    const date = new Date(call.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return `
DEMAND LETTER

Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

To: ${call.companyName || 'The Company Associated with ' + call.phoneNumber}

RE: TCPA Violation - Telephone Call on ${formattedDate}

Dear Sir or Madam:

On ${formattedDate} at ${date.toLocaleTimeString()}, your company placed a telephone call to my number (${call.phoneNumber}) regarding ${call.callType.toLowerCase()} services.

My telephone number has been registered on the National Do Not Call Registry since [YOUR REGISTRATION DATE].

This call constitutes a violation of the Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227. Under this statute, I am entitled to statutory damages of $500 for this violation.

I hereby demand payment of $500 within thirty (30) days of this letter to avoid further legal action. If payment is not received, I will file a claim in small claims court and may seek additional damages for willful violations.

Please remit payment to:

[VINCE - YOUR NAME AND ADDRESS]

Sincerely,

[VINCE - YOUR SIGNATURE]

---
Call Details:
- Date/Time: ${formattedDate} ${date.toLocaleTimeString()}
- Your Number: [YOUR PHONE NUMBER]
- Caller Number: ${call.phoneNumber}
- Type: ${call.callType}
- Notes: ${call.notes || 'N/A'}
- Recorded: ${call.recorded ? 'Yes' : 'No'}
`;
}

function generateCSV(calls) {
    const headers = ['Date', 'Time', 'Phone Number', 'Company', 'Type', 'Notes', 'Recorded', 'Status'];
    const rows = calls.map(call => [
        new Date(call.timestamp).toLocaleDateString(),
        new Date(call.timestamp).toLocaleTimeString(),
        call.phoneNumber,
        call.companyName || '',
        call.callType,
        call.notes || '',
        call.recorded ? 'Yes' : 'No',
        call.status
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

// Instructions for use
console.log(`
=== RoboCall Hunter Export Tool ===

To export your calls:

1. Open the RoboCall Hunter app in your browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Paste this:
   
   copy(JSON.parse(localStorage.getItem('robocallHunter_calls')))

5. Save the copied JSON to a file: calls.json
6. Run: node export.js calls.json

This will generate:
- calls.csv: Spreadsheet of all calls
- demand-letters/: Individual demand letters for each unique caller
`);

// If run with a file argument
if (process.argv[2]) {
    const calls = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    
    // Generate CSV
    fs.writeFileSync('calls.csv', generateCSV(calls));
    console.log('✓ Generated calls.csv');
    
    // Generate demand letters
    const lettersDir = path.join(__dirname, 'demand-letters');
    if (!fs.existsSync(lettersDir)) {
        fs.mkdirSync(lettersDir);
    }
    
    // Group by phone number, take first call for each
    const uniqueCallers = {};
    calls.forEach(call => {
        if (!uniqueCallers[call.phoneNumber]) {
            uniqueCallers[call.phoneNumber] = call;
        }
    });
    
    Object.entries(uniqueCallers).forEach(([number, call]) => {
        const filename = path.join(lettersDir, `demand-${number.replace(/\D/g, '')}.txt`);
        fs.writeFileSync(filename, generateDemandLetter(call));
    });
    
    console.log(`✓ Generated ${Object.keys(uniqueCallers).length} demand letters in demand-letters/`);
}
