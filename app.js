var noteNumber=0;
var prevNotes=[];

//Add a new note
function addNote(){
    let text=document.getElementById('formNoteText').value;
    let backgroundColor=document.getElementById("formColor").value;

    let newNote = document.createElement("div");
    newNote.className="note";
    ++noteNumber;
    newNote.setAttribute("id","note-"+noteNumber);
    newNote.setAttribute("style","background:"+getColor(backgroundColor));
    newNote.appendChild(getEditButton());
    newNote.appendChild(getDeleteButton());
    var par=document.createElement("p");
    par.innerText=text;
    newNote.appendChild(par);
    document.getElementById('notes').appendChild(newNote);
}

//Delete Note
function deleteNote(note) {
  let noteToBeDeleted=note.parentNode.parentNode;
  document.getElementById("notes").removeChild(noteToBeDeleted);
}

//Returns a new edit button icon when new note is created
function getEditButton() {
  let div=document.createElement("div");
  div.setAttribute("id","editBtn");
  let editImage=document.createElement("img");
  editImage.setAttribute("src","./edit.png");
  editImage.setAttribute("width","20px");
  editImage.setAttribute("height","20px");
  editImage.setAttribute("onclick","editNote(this)");
  editImage.setAttribute("title","Edit Note");
  div.appendChild(editImage);
  return div;
}
//Returns a new delete button icon when new note is created
function getDeleteButton() {
  let div=document.createElement("div");
  div.setAttribute("id","deleteBtn");
  let editImage=document.createElement("img");
  editImage.setAttribute("src","./cross.png");
  editImage.setAttribute("width","20px");
  editImage.setAttribute("height","25px");
  editImage.setAttribute("onclick","deleteNote(this)");
  editImage.setAttribute("title","Delete Note");
  div.appendChild(editImage);
  return div;
}

//Makes a given Note editable
function editNote(note) {
  let noteToBeEdited=note.parentNode.parentNode;
  let noteText=noteToBeEdited.getElementsByTagName("p")[0].innerHTML;
  let id=noteToBeEdited.id;
  let obj={};
  obj.id=id;
  obj.text=noteText;
  prevNotes.push(obj);
  noteToBeEdited.removeChild(noteToBeEdited.getElementsByTagName("p")[0]);
  noteToBeEdited.appendChild(createTextArea(noteText));
  noteToBeEdited.appendChild(createUpdateButton());
  noteToBeEdited.appendChild(createCancelEditButton());
  noteToBeEdited.getElementsByTagName("textarea")[0].focus();
}

//Returns Text Area so that user can edit note
function createTextArea(noteText) {
  let textArea=document.createElement("textarea");
  textArea.setAttribute("id","editableNote");
  textArea.setAttribute("type","text");
  textArea.innerText=noteText;
  textArea.setAttribute("value",noteText);
  textArea.setAttribute("cols","25");
  textArea.setAttribute("rows","5");
  textArea.setAttribute("maxlength","270");
  return textArea;
}

//Returns Update button to update a note
function createUpdateButton() {

  let updateButton=document.createElement("button");
  updateButton.setAttribute("type","button");
  updateButton.setAttribute("id","updateNoteButton");
  updateButton.setAttribute("onclick","updateNote(this)");
  updateButton.innerText="Update";
  return updateButton;
}

//Returns cancel button so that Note can be reverted to previous value
function createCancelEditButton() {
  let updateButton=document.createElement("button");
  updateButton.setAttribute("type","button");
  updateButton.setAttribute("id","cancelEditButton");
  updateButton.setAttribute("onclick","cancelEditNote(this)");
  updateButton.innerText="Discard";
  return updateButton;
}

//Update Note
function updateNote(note) {
  let noteToBeUpdated=note.parentNode;
    prevNotes = prevNotes.filter(function( obj ) {
    return obj.id !== noteToBeUpdated.id;
  });
  let newNoteText=noteToBeUpdated.getElementsByTagName("textarea")[0].value;
  noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("textarea")[0]);
   noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("button")[0]);
   noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("button")[0]);
   let para=document.createElement("p");
   para.innerText=newNoteText;
   noteToBeUpdated.appendChild(para);
}

//Returns the Note to non-edit mode and Reverts it to previous value
function cancelEditNote(note) {
  let noteToBeUpdated=note.parentNode;
  let prevText="";
    prevNotes = prevNotes.filter(function( obj ) {
      if(obj.id === noteToBeUpdated.id)
        {prevText=obj.text;return false;}
      return true;
  });
  noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("textarea")[0]);
   noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("button")[0]);
   noteToBeUpdated.removeChild(noteToBeUpdated.getElementsByTagName("button")[0]);
   let para=document.createElement("p");
   para.innerText=prevText;
   noteToBeUpdated.appendChild(para);
}

function getColor(color) {
  col="#dbd709";
  switch (color) {
    case 'red':
      col="#d61818";
      break;
    case 'blue':
      col="#1831d6";
      break;
    case 'green':
      col="#059900";
      break;
    default:
      break;
  }
  return col;
}

//Drap and drop using JQuery
$(function() {
            $( "#notes" ).sortable({
            update: function(event, ui) {
                getIdsOfNotes();
            }//end update
            });
        });

        function getIdsOfNotes() {
            var values = [];
            $('.note').each(function (index) {
                values.push($(this).attr("id")
                        .replace("note-", ""));
            });

            $('#outputvalues').val(values);
        }
