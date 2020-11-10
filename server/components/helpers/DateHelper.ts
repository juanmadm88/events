import * as moment from 'moment-timezone';

class DateHelper {

    static readonly TIMEZONE = 'America/Argentina/Buenos_Aires';
    static readonly DATE_FORMAT_YYYY_MM_DD_HH = 'YYYYMMDDHH';

    public static getCurrentDate= () => {

        return moment.tz( new Date(), DateHelper.TIMEZONE).format(DateHelper.DATE_FORMAT_YYYY_MM_DD_HH);
    } 

    public static getCurrentPeriod() {
        const currentDate = new Date();
        const period = new Date(currentDate.getFullYear() + currentDate.getMonth());
        return period;
    }

}

export default DateHelper;