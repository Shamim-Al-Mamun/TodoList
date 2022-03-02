function TimeStamp(){
    const today = new Date();
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let hour = today.getHours();
    let day = daylist[today.getDay()];
    var minute = today.getMinutes();
    var second = today.getSeconds();
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    let prepand = ( hour >= 12)? "PM" : "AM";
    hour = (hour >= 12)? hour - 12: hour;
    hour = (hour <= 9)? "0" + hour : hour;
    
    hour = (hour == 0 && prepand == "AM")? 12 : hour;
    hour = (hour == 0 && prepand == "PM")? 12 : hour;

    minute = (minute <= 9)? "0" + minute : minute;
    second = (second <= 9)? "0" + second : second;
    const timestamp = hour + ":" + minute + " " +prepand;

    return {timestamp, year, month, date, day, hour, minute, second};
}
