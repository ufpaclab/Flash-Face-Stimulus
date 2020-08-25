// App Script function to host the html page
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
}

// App Script function to interact with google sheet
function Insert(sheetName, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(sheetName)
  sheet.appendRow(data)
}
 
// App Script function to interact with google sheet
function InsertBulk(sheetName, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(sheetName)
  data.forEach(row => sheet.appendRow(row))
}