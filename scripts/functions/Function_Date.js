
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Date.js
// Created:			27/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 27/05/2011		
// 
// **********************************************************************************************************************

// 1970/01/01 corresponds to getTime() == 0
var DEFAULT_YEAR = 1970;
var DEFAULT_MONTH = 1;
var DEFAULT_DAY = 1;

// These based on DateUtils (as used by Delphi_Runner) to get datetime spans
var DAYS_IN_YEAR = 365.25;
var DAYS_IN_MONTH = 30.4375;

var monthlen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var totalmonthlen = [];


// #############################################################################################
/// Function:<summary>
///             Checks to see if a given year is a leap year
///          </summary>
// #############################################################################################
function    is_leap_year(year)
{
    return year%400 ==0 || (year%100 != 0 && year%4 == 0);
}

// #############################################################################################
/// Function:<summary>
///             Returns an array containing the numbers of days in each month for the given year
///          </summary>
// #############################################################################################
function    get_month_lengths(year)
{
    var monthLengths = monthlen.slice();;
    if (is_leap_year(year)) {        
        monthLengths[1] = 29;
    }
    return monthLengths;
}

// #############################################################################################
/// Function:<summary>
///             Mimics the operation of DateUtils.IsValidDateTime() (see fn body for more detail)
///          </summary>
// #############################################################################################
function    is_valid_date_time(year, month, day, hour, minute, second, millisecond)
{
// IsValidDateTime returns True if:
// - Year falls in the range from 1 through 9999 inclusive.
// - Month falls in the range from 1 through 12 inclusive.
// - Day falls in the range from 1 through the number of days in the specified month.
// - Hour falls in the range from 0 through 24, and if AHour is 24, then AMinute, ASecond, and AMilliSecond must all be 0.
// - Minute falls in the range from 0 through 59 inclusive.
// - Second falls in the range from 0 through 59 inclusive.
// - MilliSecond falls in the range from 0 through 999 inclusive.
    var retValue = true;
    if ((year >= 1) && (year <= 9999) &&
        (month >= 1) && (month <= 12) &&
        (day >= 1) && (day <= 31) &&
        (hour >= 0) && (hour <= 24) &&
        (minute >= 0) && (minute <= 59) &&
        (second >= 0) && (second <= 59) &&
        (millisecond >= 0) && (millisecond <= 999))
    {
        // Check day more precisely against its month
        if (day > 28) {
            switch (month) {
                case 2: // February
                    if (!is_leap_year(year) || (day > 29)) {
                        retValue = false;
                    }                    
                break;                
                case 4: // April
                case 6: // June
                case 9: // September
                case 11:// November
                    if (day > 30) {
                        retValue = false;
                    }
                break;                                
            }                                       
        }
    
        // Check hour more precisely
        if ((hour == 24) && ((minute != 0) || (second != 0) || (millisecond != 0))) {
            retValue = false;
        }
    }
    else {
        retValue = false;
    }
    return retValue;
}

// #############################################################################################
/// Function:<summary>
///             Returns the date-time value that corresponds to the current moment.
///          </summary>
///
/// Out:	 <returns>
///				The current date/time value
///			 </returns>
// #############################################################################################
function    date_current_datetime()
{
    return new Date().getTime();
}
// #############################################################################################
/// Function:<summary>
///             Returns the day of the week corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    date_get_weekday(_time)
{
    var d = new Date();
    d.setTime(_time);
    
    return d.getDay() + 1;
}

// #############################################################################################
/// Function:<summary>
///             Returns the year corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function   date_get_year( _time )
{
    var d = new Date();
    d.setTime(_time);
    
    return d.getUTCFullYear();
}


// #############################################################################################
/// Function:<summary>
///             Returns the hour corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function   date_get_hour( _time )
{
    var d = new Date();
    d.setTime(_time);
    
    return d.getHours();
}
// #############################################################################################
/// Function:<summary>
///             Returns the minute corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function   date_get_minute( _time )
{
    var d = new Date();
    d.setTime(_time);
    
    return d.getMinutes();
}

// #############################################################################################
/// Function:<summary>
///             Returns the second corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function   date_get_second( _time )
{
    var d = new Date();
    d.setTime(_time);
    
    return d.getSeconds();
}

// #############################################################################################
/// Function:<summary>
///             Returns the week of the year corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function   date_get_week( _time )
{
    var d = new Date();
    d.setTime(_time);
    
    var w = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < d.getMonth(); i++) {
        w += monthlens[i];
    }
    w += d.getDate();

    return floor(w/7) + 1;
}

// #############################################################################################
/// Function:<summary>
///             Returns the month corresponding to the date.
///          </summary>
///
/// In:		 <param name="_time"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    date_get_month( _time )
{    
    var d = new Date();
    d.setTime(_time);
    
    return (d.getMonth() + 1);
}

// #############################################################################################
/// Function:<summary>
///             Creates a date-time value corresponding to the indicated date.
///          </summary>
///
/// In:		 <param name="_y">Year</param>
///			 <param name="_m">Month</param>
///			 <param name="_d">day of month</param>
/// Out:	 <returns>
///				a full "time"value
///			 </returns>
// #############################################################################################
function    date_create_date( _year, _month ,_day )
{
    var d = new Date();
    d.setFullYear(_year, _month - 1, _day);
    
    return d.getTime();
}


// #############################################################################################
/// Function:<summary>
///          	Creates a date-time value corresponding to the indicated date.
///          </summary>
///
/// In:		<param name="_year"></param>
///			<param name="_month"></param>
///			<param name="_day"></param>
///			<param name="_hour"></param>
///			<param name="_minute"></param>
///			<param name="_second"></param>
/// Out:	<returns>
///				a full "time"value
///			</returns>
// #############################################################################################
function    date_create_datetime(_year,_month,_day,_hour,_minute,_second )
{
    var d = new Date();
    d.setFullYear(_year, _month - 1, _day);
    d.setHours(_hour, _minute, _second, 0);
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the date-time value that corresponds to the current date only (ignoring the time).
///          </summary>
///
/// Out:	<returns>
///				time value
///			</returns>
// #############################################################################################
function date_current_date()
{
    var d = new Date();
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the date-time value that corresponds to the current time only (ignoring the date).
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_current_time() 
{
    var d = new Date();
    d.setFullYear(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY);

    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Creates a date-time value corresponding to the indicated time.
///          </summary>
///
/// In:		<param name="_hour"></param>
///			<param name="_minute"></param>
///			<param name="_second"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_create_time(_hour,_minute,_second) 
{
    var d = new Date();
    d.setFullYear(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY);
    d.setHours(_hour, _minute, _second, 0);
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated date and time are valid.
///          </summary>
///
/// In:		<param name="_year"></param>
///			<param name="_month"></param>
///			<param name="_day"></param>
///			<param name="_hour"></param>
///			<param name="_minute"></param>
///			<param name="_second"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_valid_datetime(_year,_month,_day,_hour,_minute,_second) 
{
    return is_valid_date_time(_year, _month, _day, _hour, _minute, _second, 0);
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated date is valid.
///          </summary>
///
/// In:		<param name="_year"></param>
///			<param name="_month"></param>
///			<param name="_day"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_valid_date(_year,_month,_day) 
{
    return is_valid_date_time(_year, _month, _day, 0, 0, 0, 0);
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated time is valid.
///          </summary>
///
/// In:		<param name="_hour"></param>
///			<param name="_minute"></param>
///			<param name="_second"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_valid_time(_hour,_minute,_second) 
{
    return is_valid_date_time(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY, _hour, _minute, _second, 0);
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount years after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_year(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setFullYear(d.getUTCFullYear() + Round(_amount), d.getMonth(), d.getDate());
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount months after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_month(_date,_amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setFullYear(d.getUTCFullYear(), d.getMonth() + Round(_amount), d.getDate());
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount weeks after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_week(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setFullYear(d.getUTCFullYear(), d.getMonth(), d.getDate() + (Round(_amount) * 7));
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount days after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="date"></param>
///			<param name="amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_day(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setFullYear(d.getUTCFullYear(), d.getMonth(), d.getDate() + Round(_amount));
    
    return d.getTime();
}


// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount hours after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_hour(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setHours(d.getHours() + Round(_amount), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount minutes after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_minute(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setHours(d.getHours(), d.getMinutes() + Round(_amount), d.getSeconds(), d.getMilliseconds());
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a new date that is amount seconds after the indicated date. amount must be an integer number.
///          </summary>
///
/// In:		<param name="_date"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_inc_second(_date, _amount) 
{
    var d = new Date();
    d.setTime(_date);
    d.setHours(d.getHours(), d.getMinutes(), d.getSeconds() + Round(_amount), d.getMilliseconds());
    
    return d.getTime();
}


// #############################################################################################
/// Function:<summary>
///          	Returns the day of the month corresponding to the date.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_get_day(_date) 
{
    var d = new Date();
    d.setTime(_date);
        
    return d.getDate();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the day of the year corresponding to the date.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_get_day_of_year(_date) 
{
    var d = new Date();
    d.setTime(_date);

    var days = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < d.getMonth(); i++) {
        days += monthlens[i];
    }
    days += d.getDate();
    
    return days;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the hour of the year corresponding to the date.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_get_hour_of_year(_date) 
{
    var d = new Date();
    d.setTime(_date);

    var hours = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < d.getMonth(); i++) {
        hours += monthlens[i] * 24;
    }
    hours += (d.getDate() - 1) * 24;
    hours += d.getHours();
    
    return hours;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the minute of the year corresponding to the date.
///          </summary>
///
/// In:		<param name="date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_get_minute_of_year(_date) 
{
    var d = new Date();
    d.setTime(_date);

    var minutes = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < d.getMonth(); i++) {
        minutes += monthlens[i] * 24 * 60;
    }    
    minutes += (d.getDate() - 1) * 24 * 60;
    minutes += d.getHours() * 60;
    minutes += d.getMinutes();
    
    return minutes;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the second of the year corresponding to the date.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_get_second_of_year(_date) 
{
    var d = new Date();
    d.setTime(_date);

    var seconds = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < d.getMonth(); i++) {
        seconds += monthlens[i] * 24 * 60 * 60;
    }
    seconds += (d.getDate() - 1) * 24 * 60 * 60;
    seconds += d.getHours() * 60 * 60;
    seconds += d.getMinutes() * 60;
    seconds += d.getSeconds();
    
    return seconds;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of years between the two dates. It reports incomplete years as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_year_span(_date1, _date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60 / 60 / 24 / DAYS_IN_YEAR);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of months between the two dates. It reports incomplete months as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_month_span(_date1,_date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60 / 60 / 24 / DAYS_IN_MONTH);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of weeks between the two dates. It reports incomplete weeks as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_week_span(_date1,_date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60 / 60 / 24 / 7);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of days between the two dates. It reports incomplete days as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_day_span(_date1,_date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60 / 60 / 24);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of hours between the two dates. It reports incomplete hours as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_hour_span(_date1,_date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60 / 60);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of minutes between the two dates. It reports incomplete minutes as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_minute_span(_date1, _date2) 
{
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs((timeDiff / 1000) / 60);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of seconds between the two dates. It reports incomplete seconds as a fraction. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_second_span(_date1, _date2) 
{    
    var d1 = DST_adjustment(_date1);
    var d2 = DST_adjustment(_date2);
    var timeDiff = ((_date2 + d2) - (_date1 + d1));

    return Math.abs(timeDiff / 1000);
}

// #############################################################################################
/// Function:<summary>
///             When performing spans we need to adjust date/times according to whether or
///             not they're during daylight saving time
///          </summary>
/// Out:	<returns>
///				Adjustment necessary in milli-seconds
///			</returns>
// #############################################################################################
function DST_adjustment(_date)
{
    var d = new Date();
    d.setTime(_date);
    
    return (d.getHours() - d.getUTCHours()) * 60 * 60 * 1000;
}

// #############################################################################################
/// Function:<summary>
///          	Compares the two date-time values. Returns -1, 0, or 1 depending on whether 
///             the first is smaller, equal, or larger than the second value. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_compare_datetime(_date1,_date2) 
{
    if (_date1 < _date2) {
        return -1;
    }
    else if (_date2 > _date1) {
        return 1;
    }
    return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Compares the two date-time values only taking the date part into account. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				Returns -1, 0, or 1 depending on whether the first is 
///             smaller, equal, or larger than the second value. 
///			</returns>
// #############################################################################################
function date_compare_date(_date1, _date2) 
{    
    if (_date1 < _date2) {
        return -1;
    }
    else if (_date2 > _date1) {
        return 1;
    }
    return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Compares the two date-time values only taking the time part into account. 
///          </summary>
///
/// In:		<param name="_date1"></param>
///			<param name="_date2"></param>
/// Out:	<returns>
///				Returns -1, 0, or 1 depending on whether the first is 
///             smaller, equal, or larger than the second value. 
///			</returns>
// #############################################################################################
function date_compare_time(_date1,_date2) 
{
    if (_date1 < _date2) {
        return -1;
    }
    else if (_date2 > _date1) {
        return 1;
    }
    return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the date part of the indicated date-time value, setting the time part to 0.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_date_of(_date) 
{
    var d = new Date();
    d.setTime(_date);
    d.setHours(0, 0, 0, 0);
    
    return d.getTime();
}


// #############################################################################################
/// Function:<summary>
///          	Returns the time part of the indicated date-time value, setting the date part to 0.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_time_of(_date) 
{
    var d = new Date();
    d.setTime(_date);
    d.setFullYear(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_YEAR);
    
    return d.getTime();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string indicating the given date and time in the default format for the system.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_datetime_string(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    return d.toLocaleString();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string indicating the given date in the default format for the system.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_date_string(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    return d.toDateString();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string indicating the given time in the default format for the system.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_time_string(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    return d.toTimeString();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of days in the month indicated by the date-time value.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_days_in_month(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    var monthlens = get_month_lengths(d.getUTCFullYear());
    
    return monthlens[d.getMonth()];
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of days in the year indicated by the date-time value.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_days_in_year(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    var days = 0;
    var monthlens = get_month_lengths(d.getUTCFullYear());
    for (var i = 0; i < monthlens.length; i++) {
        days += monthlens[i];
    }
    
    return days;
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the year indicated by the date-time value is a leap year.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_leap_year(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    return is_leap_year(d.getUTCFullYear());
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated date-time value is on today.
///          </summary>
///
/// In:		<param name="_date"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function date_is_today(_date) 
{
    var d = new Date();
    d.setTime(_date);
    
    var today = new Date();    
    if ((d.getUTCFullYear() == today.getUTCFullYear()) &&
        (d.getMonth() == today.getMonth()) &&
        (d.getDate() == today.getDate()))
    {
        return true;    
    }
    return false;
}