// function to reverse string
function reverseString(str) {      //ex. str='ab'
    var splitedStr = str.split('');  // ['a', 'b',...]
    var revStr = splitedStr.reverse();
    var reversedStr = revStr.join('');
    return reversedStr;
}
// console.log(reverseString('abc'));
// function to return true if string is palindromic...
function isPalindromeStr(str) {
    var rev = reverseString(str);
    return str === rev;
}
// console.log(isPalindromeStr('aba'));
//function to add 0 initially if date.value is less than 10
function dateToStr(date) {
    var dateStr1 = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr1.day = '0' + date.day;
    }
    else {
        dateStr1.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr1.month = '0' + date.month;
    }
    else {
        dateStr1.month = date.month.toString();
    }
    dateStr1.year = date.year.toString();
    return dateStr1;
}
//function to return all formats of date...
function allDateFormats(date) {
    var dateStr2 = dateToStr(date)
    var ddmmyyyy = dateStr2.day + dateStr2.month + dateStr2.year;
    var mmddyyyy = dateStr2.month + dateStr2.day + dateStr2.year;
    var ddmmyy = dateStr2.day + dateStr2.month + dateStr2.year.slice(-2);
    var mmddyy = dateStr2.month + dateStr2.day + dateStr2.year.slice(-2);
    var yyyymmdd = dateStr2.year + dateStr2.month + dateStr2.day;
    var yymmdd = dateStr2.year.slice(-2) + dateStr2.month + dateStr2.day;
    return [ddmmyyyy, mmddyyyy, ddmmyy, mmddyy, yyyymmdd, yymmdd];
}
//function to check palindrome for all date formats...
function palindromeAllFormats(date) {
    var palindromeList = allDateFormats(date);
    var isPalindrome = false;
    for (var i = 0; i < palindromeList.length; i++) {
        if (isPalindromeStr(palindromeList[i])) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}
console.log()
//function to check if leap year occur...
function checkForLeap(year) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 != 0)) {
        return true;
    } else {
        return false;
    }
}
//function to get next date if birthdate is not palindrome...
function nextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var monthDaysSequence = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //index 0 to 11
    if (month === 2) {
        //check if leap yr
        if (checkForLeap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > monthDaysSequence[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}
function nextPalindromeDate(date) {
    var count = 0;
    var nxtDate = nextDate(date);
    while (1) {
        count++;
        var isPalindrome = palindromeAllFormats(nxtDate);
        if (isPalindrome) {
            break;
        }
        nxtDate = nextDate(nxtDate);
    }
    return [count, nxtDate];
}
// var date = {
//     day: 3,
//     month: 12,
//     year: 2020
// };
// console.log(allDateFormats(date));
var dateInput = document.querySelector('.inputDate');
var checkBtn = document.querySelector('.check-button');
var output = document.querySelector('.output');

function outputHandler(e) {
    var dateVal = dateInput.value;
    if (dateVal !== '') {
        var mergedDate = dateVal.split('-');
        var date = {
            day: Number(mergedDate[2]),
            month: Number(mergedDate[1]),
            year: Number(mergedDate[0])
        };
        // console.log(date);
        var isPalindrome = palindromeAllFormats(date);
        if (isPalindrome) {
            output.innerText = 'Woww! Your birthday is Palindrome!!'
        } else {
            var [count, nxtDate] = nextPalindromeDate(date);
            output.innerText = `Oops! your bday is not palindrome! The palindrome date is ${nxtDate.day}-${nxtDate.month}-${nxtDate.year}, you missed by ${count} days!`
        }
    }
}

checkBtn.addEventListener('click', outputHandler);