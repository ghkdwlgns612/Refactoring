const box = document.getElementById('box');
const scroll = document.getElementById('scroll');

function reqList() {
    const input = document.getElementById('input').value;
    $.ajax({
        url:'http://localhost:8080/general'
        , type : 'POST'
        , data: 'originuri=' + input
        , dataType : 'json'
        , success : function(data) {render(data)}
    })
}

function render(data) {
    if(data.hasOwnProperty('err')){
        let resp = data.err + "는 " + data.message;
        scroll.innerHTML += "<p id='add'>"+ resp +"</p>";
    } else {
        let resp ="http://localhost:8080/" + data.data.changedUri + "변환되었습니다.";
        scroll.innerHTML += "<p id='add'>"+ resp +"</p>";
    }
}