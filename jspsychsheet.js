// jspsychsheet - A simple JavaScript library to use jsPsych and Google Sheet Apps Script to run behavioral experiments online.
// Created by Shashi Kant Gupta, May 19, 2020.
// Modified by Grey Johnson, August 25, 2020.

var jsPsychSheet = {
  ShowUploadStatus: function() {
    var jspsych_content = document.getElementById("jspsych-content")
    jspsych_content.innerHTML = 'Uploading your data<br><br><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
  },

  OnUploadSuccess: function() {
    var jspsych_content = document.getElementById("jspsych-content")
    jspsych_content.innerHTML = 'Your data is successfully uploaded!'
  },

  Insert: function(sheetName, data, quiet = false) {
    if (quiet == false) {
      this.ShowUploadStatus()
      google.script.run.withSuccessHandler(this.OnUploadSuccess).Insert(sheetName, data)
    }
    else {
      google.script.run.Insert(sheetName, data)
    }
  },

  InsertBulk: function(sheetName, data, quiet = false) {
    if (quiet == false) {
      this.ShowUploadStatus()
      google.script.run.withSuccessHandler(this.OnUploadSuccess).InsertBulk(sheetName, data)
    }
    else {
      google.script.run.InsertBulk(sheetName, data)
    }
  }
}
