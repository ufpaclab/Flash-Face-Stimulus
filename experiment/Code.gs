function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
}

function Insert(sheetName, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(sheetName)
  sheet.appendRow(data)
}
 
function InsertBulk(sheetName, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(sheetName)
  data.forEach(row => sheet.appendRow(row))
}

function GetSessionID() {
  return 1
}