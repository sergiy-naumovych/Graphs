notif = navigator.notification;
db = window.openDatabase('graphs', '1.0', 'test', 1000000);
//db.transaction(createTables, errorCB);

$.mobile.defaultPageTransition = 'flip';

function createTables(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, login, pass)');
    //tx.executeSql('INSERT INTO USER(id, login, pass) VALUES(1, "login", "pass")');
}

function querySuccess(tx, results){
    var res = results.rows;
    alert(res.length);
    if(res.item(0).id){
        alert('Max id = '+res.item(0).id);
    } else {
        alert('Table is empty!!!');
    }
}

function errorCB(err) {
    // помилка транзакції
    alert("Error processing SQL: "+err.code);
}

function errorSQL(err){
    //помилка SQL
    alert('SQL error no = '+err.code);
}

function selectMAX(tx){
    //вибірка максимального номера запису із БД
    tx.executeSql('SELECT MAX(id) AS id FROM USER', [], querySuccess, errorSQL);
}

function exitFromApp(){
   navigator.app.exitApp();
}


$(function(){
    //selectLoginInfo();

    $('#sign-in').click(function(){
        //var db = openDB();
        //db.transaction(populateDB, errorCB, successCB);
       // db.transaction(queryDB, errorCB);
       /*
       notif.confirm(
            'Save password?', // message
             savePass,            // callback to invoke with index of button pressed
            ' ? ',           // title
            'Yes,No'         // buttonLabels
        );
        */
       //var db = openDB();
       //db.transaction(selectMAX, errorCB);

       //alert(result.row(0).id);
       
       
       $.mobile.loading( 'show', {
            text: 'Loading',
            theme: 'b',
            textVisible: true
       });
     
        
        if(navigator.connection.type == Connection.NONE){
        //якщо немає з'єднання з інтернетом
            $.mobile.loading( "hide" );
            navigator.notification.alert('No Internet connection!', null);
        } else {
            $.ajax({
                async: true,
                type: "POST",
                url: "http://matrix-soft.org/test/test-phonegap.php",
                data: { name: "John", location: "Boston" }
            }).done(function( msg ) {
                $.mobile.loading( "hide" );
                alert( msg );
                $('#about').click();
            });
        }
    });
    
    $('#exit').click(exitFromApp);
})