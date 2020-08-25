// jspsychsheet - A simple JavaScript library to use jsPsych and Google Sheet Apps Script to run behavioral experiments online.
// Created by Shashi Kant Gupta, May 19, 2020.
// Modified by Grey Johnson, August 25, 2020.

var jsPsychSheet = {
  showUploadStatus: function(){
    var jspsych_content = document.getElementById("jspsych-content");
    jspsych_content.innerHTML = 'Uploading your data<br><br><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
  },

  onUploadSuccess: function(){
    var jspsych_content = document.getElementById("jspsych-content");
    jspsych_content.innerHTML = 'Your data is successfully uploaded!'
  },

  uploadData: function(sheetName, data, quiet = false) {
    if (quiet == false) {
      this.showUploadStatus();
      google.script.run.withSuccessHandler(this.onUploadSuccess).addData(sheetName, data);
    }
    else {
      google.script.run.addData(sheetName, data);
    }
  }
}
