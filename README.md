# HTML to Google Sheets Form Integration

This project demonstrates how to integrate an HTML form with Google Sheets to collect user inputs and save them automatically. It uses Google Apps Script as the backend and JavaScript on the frontend to handle form submissions.

## Features
- Submit form data directly to Google Sheets.
- Custom-styled form using HTML and CSS.
- JavaScript-powered form submission without page reload.
- Feedback to users on successful or failed submissions.

---

## Project Structure

### Frontend (HTML, CSS, JavaScript)
- **HTML**: Defines the form structure with inputs for first name, last name, email, phone number, and a message.
- **CSS**: Adds styling to the form for better user experience.
- **JavaScript**: Handles the form submission using the Fetch API to communicate with the Google Apps Script Web App.

### Backend (Google Apps Script)
- **Apps Script**: Manages the received data and appends it to the designated Google Sheet.

---

## Setup Instructions

### Step 1: Create the Google Sheet
1. Open Google Sheets and create a new spreadsheet.
2. Name the spreadsheet (e.g., `html-to-sheet`).
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011600322.png)
4. Add the following headers in the first row (exactly as shown):
   - `timestamp`
   - `fname`
   - `lname`
   - `email`
   - `phone`
   - `message`

---
![](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011321.png)

### Step 2: Set Up the Google Apps Script
1. Go to `Extensions` > `Apps Script` in the Google Sheets menu.
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011428.png)
3. Copy and paste the provided `Apps Script` code into the script editor.
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011600.png)
```js
var sheetName = 'html-to-sheet';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var newRow = headers.map(function (header) {
      return header === 'timestamp' ? new Date() : e.parameter[header] || '';
    });
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

```

5. Save the project with a name (e.g., `HTML to Sheet Integration`).
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011620.png)

7. Run the `intialSetup` function in the Apps Script editor to link the script with your spreadsheet.
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011632.png)
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011641.png)
![loading...](https://github.com/AkashKobal/html-to-google-sheet/blob/main/Screenshots/Screenshot%202024-12-02%20011700.png)



9. Deploy the script as a Web App:
   - Go to `Deploy` > `New Deployment`.
   - Choose `Web App`.
   - Set the permissions to `Anyone` for public access.
   - Deploy and note down the generated **Web App URL**.

---

### Step 3: Update the Frontend Script
1. In the HTML file, replace the `scriptURL` in the JavaScript section with your Web App URL.

   ```javascript
   const scriptURL = 'YOUR_WEB_APP_URL_HERE';
