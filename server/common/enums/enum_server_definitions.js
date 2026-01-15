class EnumServerDefinitions {
    static OK = 'OK';
    static ERROR = 'error';
    static FINISH = 'finish';
    static AUTHORIZATION = 'authorization';
    static STATUS_FILE = {
        ACTIVE: 1,
        NO_ACTIVE: 0,
        DELETE: 2,
    };
    static STATUS = {
        ACTIVE: 1,
        NO_ACTIVE: 0,
        WAITING: 2,
        CANCEL: 3,
        WAITING_AND_NOUPDATE: 4
    };
    static CALENDAR = {
        ACCEPT: 1,
        WAITING: 2,
        REFUSE: 3,
        GV_REFUSE: 4,
    };

    static TYPE_SCHEDULE = {
        TEACH: 1,
        TRIP: 2,
        TA: 3,
    };

    static STATUS_CALENDAR = {
        NORMAL: 1,
        PROJECT: 2,
        PROGRESS_TEST: 3,
        FINAL_TEST: 4,
        SUB_TEACHER: 5,
    };

    static CUSTOMER = {
        COOL: 1,
        WARM: 2,
        HOT: 3,
        EXIST: 4,
        IFTL: 5,
        STOP: 6,
    };

    static ROLE = {
        STAFF: 0,
        TEACHER: 1,
        ADMIN: 2,
        STUDENT: 3,
    };

    static NEWSTUDENT = {
        EXIST: 1,
        NEW: 0,
    };



    static DEPARTMENT = {
        PERSONNEL: 1,
        ACCOUNTANT: 2,
        SALES: 3,
        PLANNING: 4,
        CSKH: 5,
        QC: 6,
        TRAVEL_AND_LEARN: 7,
    };
    static EMPTY = 0;

    static PROCEDURE = {
        PLANNING_HDKD: 1, // LẬP KẾ HOẠCH HOẠT ĐỘNG KINH DOANH
        PLANNING_LKH_BC: 2, // LẬP KẾ HOẠCH BÁO CÁO
    };

    //
    static POST_CATEGORY = {
        NEWS: 1,
        DOCUMENT: 2,
        EXERCISE: 3,
        EXAM: 4,
    }
    static SUBMISSION = {
        UNSENT: 0,
        NOT_SCORED: 1,
        SUBMITTED: 2,
    }
}
module.exports = EnumServerDefinitions;