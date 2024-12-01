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
3. Add the following headers in the first row (exactly as shown):
   - `timestamp`
   - `fname`
   - `lname`
   - `email`
   - `phone`
   - `message`

---

### Step 2: Set Up the Google Apps Script
1. Go to `Extensions` > `Apps Script` in the Google Sheets menu.
2. Copy and paste the provided `Apps Script` code into the script editor.
3. Save the project with a name (e.g., `HTML to Sheet Integration`).
4. Run the `intialSetup` function in the Apps Script editor to link the script with your spreadsheet.
5. Deploy the script as a Web App:
   - Go to `Deploy` > `New Deployment`.
   - Choose `Web App`.
   - Set the permissions to `Anyone` for public access.
   - Deploy and note down the generated **Web App URL**.

---

### Step 3: Update the Frontend Script
1. In the HTML file, replace the `scriptURL` in the JavaScript section with your Web App URL.

   ```javascript
   const scriptURL = 'YOUR_WEB_APP_URL_HERE';
