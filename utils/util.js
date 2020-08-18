const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//取倒计时（天时分秒）
function getTimeLeft(datetimeTo){
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;
  
  var timeLeft={
    days:'',
    hours:'',
    minutes:'',
    seconds:'',
    flag:false
  }
  // 将时间差（毫秒）格式为：天时分秒
  timeLeft.days = parseInt(mss / (1000 * 60 * 60 * 24))<10?'0'+parseInt(mss / (1000 * 60 * 60 * 24)):parseInt(mss / (1000 * 60 * 60 * 24));
  timeLeft.hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))<10?'0'+parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)):parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  timeLeft.minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))<10?'0'+parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)):parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  timeLeft.seconds = parseInt((mss % (1000 * 60)) / 1000)<10?'0'+parseInt((mss % (1000 * 60)) / 1000):parseInt((mss % (1000 * 60)) / 1000);
  if(timeLeft.days=='00'&&timeLeft.hours=='00'&&timeLeft.minutes=='00'&&timeLeft.seconds=='00'){
    timeLeft.flag=true;
  }

  return timeLeft
}
 

module.exports = {
  formatTime: formatTime,
  getTimeLeft: getTimeLeft
}
