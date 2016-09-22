/**
 * Created by Tacademy on 2016-09-05.
 */
var CronJob = require('cron').CronJob;
var moment = require('moment-timezone');

var timeZone = 'Asia/Seoul';
var future = moment().tz(timeZone).add(1, 'm');
console.log(future.format('YYYY-MM-DD HH:mm:ss'));
console.log(future.format('YYYY-MM-DD hh:mm:ss'));
console.log(future.month() + 1);
console.log(future.date());
console.log(future.hour());
console.log(future.minute());
console.log(future.second());

//var crontime = '10 * * * * *'; // 초, 분, 시, 일, 월, 요일
var crontime = future.second() + ' ' +
               future.minute() + ' ' +
               future.hour() + ' ' +
               future.date() + ' ' +
               future.month() + ' ' +
               future.day();

var job = new CronJob(crontime, function() {
  console.log('*');
  job.stop();
}/* 수행할 함수 */, function() {

}/* 완료 함수 */, false/* 즉시 실행? */, timeZone);

job.start();