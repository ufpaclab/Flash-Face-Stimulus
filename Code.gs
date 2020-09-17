function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
}

function Insert(id, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheetName = id.toString()
  var sheet = ss.getSheetByName(sheetName)
  if (sheet == null) {
    sheet = ss.insertSheet(sheetName)
  }
  sheet.appendRow(data)
}
 
function InsertBulk(id, data) {
  data.forEach(row => Insert(id, row))
}

function SetID() {
  var documentProperties = PropertiesService.getDocumentProperties()
  documentProperties.setProperty('sessionID', 1)
}

function GetSessionID() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  var documentProperties = PropertiesService.getDocumentProperties()
  var newID = parseInt(documentProperties.getProperty('sessionID')) + 1
  documentProperties.setProperty('sessionID', newID)
  lock.releaseLock()
  return newID
}