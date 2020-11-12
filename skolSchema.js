$(document).ready(function(){

function time(i)
{
var minute=i%60
var hour=8+(i-i%60)/60
return(hour+':'+ minute)
}

function lesson(start, end, name)
{
this.start=start
this.end=end
this.name=name

}

function day(name)
{
this.classes=[]
this.name=name

}
function subject(name, color)
{
this.name=name
this.color=color
}

function oneClass(name)
{

this.name=name
this.days=getDays()

function getDays(){
var dayNames=['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
var tempDays=[]
for(var i=0; i<dayNames.length; i++)
{
tempDays.push(new day(dayNames[i]))
}

return tempDays
}

}
function addClass()
{

var className = $("#newClassName").val();
Classes.push(new oneClass(className))
localStorage.setItem('items', JSON.stringify(Classes));
alert(Classes[1].name)


}

function addClassToList(){

for(var k=0; k<Classes.length; k++)
{
var tempLi=$("<li></li>",{text:Classes[k].name, id: k, click: clickSchoolClass });
$('.classList').append(tempLi)
}
}
function clickSchoolClass(){
remove()
getTable(this.id)

}

function addClassToSelect(){

for(var k=0; k<Classes.length; k++)
{

var tempOpt=$("<option></option>",{text:Classes[k].name, value:Classes[k].name});
$('#choosenClass').append(tempOpt)
}
}


$("#text").click(hej)
$("#submitNewClass").click(addClass)
$('#submitNewSubject').click(addSubject)
$('#submitLesson').click(submitLesson)
$('#choosenClass').change(changeShownClass)

function changeShownClass() {
str=$('#choosenClass').val();
index=getClassIndex(str)
remove()
getTable(index)

}

function submitLesson(){

remove()
var className = $("#choosenClass").val();
var lessonName =$('#choosenSubject').val();
var dayIndex = $("#choosenWeekDay").val();
var startTime = $("#startTime").val();
var endTime = $("#endTime").val();
var classIndex=getClassIndex(className)
tempVar=Classes[classIndex].days
tempClass=tempVar[dayIndex].classes
alert()
check(startTime, endTime, lessonName, dayIndex, tempClass)
tempClass.push(new lesson(startTime, endTime, lessonName))
localStorage.setItem('items', JSON.stringify(Classes));
getTable(classIndex)
alert()

}

function hej(){}

function minutesElapsed(str)
{
list=str.split(':')
return parseInt((list[0]-8)*60)+parseInt(list[1])
}

function main(){


Classes=[]
subjects=[]
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));
data.forEach(item => {
Classes.push(item)
});

let subjectArray = localStorage.getItem('subject') ? JSON.parse(localStorage.getItem('subject')) : [];
localStorage.setItem('subject', JSON.stringify(subjectArray));
const data2 = JSON.parse(localStorage.getItem('subject'));
data2.forEach(subject => {
subjects.push(subject)
});

}
function addSubject(){
var nameOfSubject = $("#newSubject").val();
var color = $("#colorPicker").val();

subjects.push(new subject(nameOfSubject, color))
alert(subjects[subjects.length-1].name)
localStorage.setItem('subject', JSON.stringify(subjects));
alert(subjects.length)
}
function test(){alert()}
$("#getInputBtn").click(addInput)
function getTable(classIndex){
var $table = $('<table/>');
for(var i=0; i<121; i++){


    var tempString=$("<tr></tr>",{id:i});
    $table.append(tempString);
    tempDayList=Classes[classIndex].days


for(var k=0; k<tempDayList.length; k++){

    var myBool=false


    for(var j=0; j<(tempDayList[k].classes).length; j++)
{

    if ((5*i<=(minutesElapsed((tempDayList[k].classes)[j].end)))&&(5*i>=(minutesElapsed((tempDayList[k].classes)[j].start))))
    {str=(tempDayList[k].classes)[j].name
    myBool=true
    break;

}
}
 if (myBool==false)
    {str=time(5*i)}
    var tempd=$("<td></td>",{text:(str), click: tdClick, id:'hej'});
    $table.append(tempd);
    }


}

$('.here_table').append($table);


}
function tdClick()
{
alert($(this).text())
}
function remove()
{
$(".here_table").empty();
}
function showSchedule(){

alert()
tempStr=$(this).text()
var classIndex=getClassIndex(tempStr)
getTable(classIndex)

}


function addInput()
{
var nameInput=$("<input></input>",{id : 'nameInput', class:"tempEl"});
var dayInput=$("<input></input>",{id : 'dayInput', class:"tempEl"});
var startInput=$("<input></input>",{id : 'startInput', class:"tempEl"});
var endInput=$("<input></input>",{id : 'endInput', class:"tempEl"});
var submitButton=$("<button></button>",{text: 'Submit', class:'tempEl', click: submit})
$(".upperPart" ).append(nameInput, dayInput,startInput, endInput, submitButton)
}
function chooseClassBox()
{
for(var i=0; i<Classes.length; i++)
{
var classOption=$("<option></option>",{id :Classes[i].name, class:"tempEl", text: Classes[i].name, change: showSchedule});
$('#chooseClass').append(classOption)
}
}

function getSubjectsOption(){
for(var k=0; k<subjects.length; k++)
{

var tempOpt=$("<option></option>",{text:subjects[k].name, value:subjects[k].name});
$('#choosenSubject').append(tempOpt)
}


}

function getClassIndex(text)
{
for(var i=0; i<Classes.length; i++)
{
if (Classes[i].name==text)
{
return i
}

}

}



function check(startTime, endTime, classNumb, dayNumb, tempClass){
var removeIndex=[]
for(var i=0; i<tempClass.length; i++)
{
if (minutesElapsed(tempClass[i].start)<=minutesElapsed(startTime))
{removeIndex.push(i)}
}
alert('removeindex'+removeIndex.length)
alert('remve'+removeIndex[0])

for(var j=0; j<removeIndex.length; j++)
{
tempClass.splice(removeIndex[j]-j,1)
}



}


main()
chooseClassBox()

addClassToList()
addClassToSelect()
getSubjectsOption()
getTable(0)


});