// jspsychsheet - A simple JavaScript library to use jsPsych and Google Sheet Apps Script to run behavioral experiments online.
// Created by Shashi Kant Gupta, May 19, 2020.
// Modified by Grey Johnson, August 25, 2020.

const jsSheet = {
  CreateSession: function(onSuccess = console.log, onFailure = console.error) {
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).GetSessionID()
  },

  Insert: function(id, data, onSuccess = console.log, onFailure = console.error) {
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).Insert(id, data)
  },

  InsertBulk: function(id, data, onSuccess = console.log, onFailure = console.error) {
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).InsertBulk(id, data)
  }
}