const moment = require('moment');
const fs = require('fs-extra');
const classServices = require("../../services/class/class.services");
const Teacher = require('../../models/teacher.model');
const EnumServerDefinitions = require('../enums/enum_server_definitions');
const { ProcedurePlan, ProcedurePlanBusiness, ProcessAccountant, ProcedureAccountBusiness, ProcessAcademic } = require('./content_procedure');
const step_procedureServices = require('../../services/procedure/step_procedure.services');
const planning_calendar_teachServices = require('../../services/calendar/planning_calendar_teach.services');
const Student = require('../../models/student.model');
const StudentList = require('../../models/student_list.model');
const Classroom = require('../../models/classroom.model');
const AssignmentClass = require('../../models/assignment_class.model');
const Post = require('../../models/post.model');


class FormatUtils {

    async getAddTeachMonth(year, month, dayOfWeekList, startTime) {
        const result = [];
        const firstDay = moment([year, month - 1, 1]);
        // Chuyển đổi chuỗi thành mảng số
        const selectedDays = dayOfWeekList.split('-').map(day => {
            if (day != 'CN') {
                return day - 1;
            } else {
                return day = 0;
            }
        });
        for (let day = firstDay.clone(); day.month() === month - 1; day.add(1, 'day')) {
            const dayOfWeek = day.day();
            // Kiểm tra xem ngày hiện tại có trong danh sách được chọn không
            if (selectedDays.includes(dayOfWeek)) {
                const startDateTime = day.set({
                    hour: parseInt(startTime.split(':')[0]),
                    minute: parseInt(startTime.split(':')[1]),
                    second: parseInt(startTime.split(':')[2])
                });
                result.push(startDateTime.clone());
            }
        }
        return result;
    }


    async getDayOfClass(classId, startDate, endDate) {
        const checkClass = await classServices.findClassRoomById(classId)

        const result = [];
        // Chuyển đổi chuỗi thành mảng số
        const selectedDays = checkClass.day_study.split('-').map(day => {
            if (day !== 'CN') {
                return parseInt(day) - 1;
            } else {
                return 0;
            }
        });
        // Lấy đối tượng moment cho startDate và endDate
        const startDateTime = moment(startDate);
        const endDateTime = moment(endDate);

        // Lặp qua mỗi ngày trong khoảng thời gian
        for (let day = startDateTime.clone(); day.isSameOrBefore(endDateTime); day.add(1, 'day')) {
            const dayOfWeek = day.day();
            // Kiểm tra xem ngày hiện tại có trong danh sách được chọn không
            if (selectedDays.includes(dayOfWeek)) {
                result.push(day.format('DD-MM-YYYY'));
            }
        }
        return result;
    }

    async getNumberDay(startDate, numberSession, dayOfWeekList) {
        let result = 0;
        let check = 0;
        const selectedDays = dayOfWeekList.split('-').map(day => {
            if (day !== 'CN') {
                return parseInt(day) - 1;
            } else {
                return 0; // Chủ nhật trong thư viện moment là ngày 0
            }
        });

        let currentDay = moment(startDate);

        while (check < numberSession) {
            if (selectedDays.includes(currentDay.day())) {
                check++;
            }
            currentDay.add(1, 'day');
            result++
        }
        return result - 1;
    }

    async  getNumberDayEndTemplate(startDate, numberSession, dayOfWeekList) {
        let result = 0;
        let check = 0;
    
        const selectedDays = dayOfWeekList.split('-').map(day => {
            if (day === 'CN') return 0; // Chủ nhật
            return parseInt(day) - 1; // T2 là 1 -> 0 trong moment
        });
        let currentDay = moment(startDate);
    
        while (check < numberSession) {
            if (selectedDays.includes(currentDay.day())) {
                check++;
                if (check === numberSession) break; // Nếu vừa đủ số buổi thì dừng không cần cộng ngày nữa
            }
            currentDay.add(1, 'day');
            result++;
        }
    
        return result; // trả về số ngày cần thêm để đến buổi học cuối cùng
    }
    

    async checkDepartment(department) {
        var result;
        switch (department) {
            case '1': {
                result = 'Nhân Sự';
                break;
            }
            case '2': {
                result = 'Kế Toán';
                break;
            }
            case '3': {
                result = 'Sales';
                break;
            }
            case '4': {
                result = 'Kế Hoạch';
                break;
            }
            case '5': {
                result = 'CSKH';
                break;
            }
            case '6': {
                result = 'QC';
                break;
            }
        }
        return result;
    }



    async checkLeadTeacher() {
        const teachers = await Teacher.findAll({
            where: {
                type_teacher: 'Trưởng Phòng',
                status: EnumServerDefinitions.STATUS.ACTIVE
            },
            attributes: ['id']
        })
        return teachers;
    }

    async checkLeadStaff() {
        const teachers = await Teacher.findAll({
            where: {
                type_teacher: 'Trưởng Phòng'
            },
            attributes: ['id']
        })
        return teachers;
    }


    async checkDayOfWeek(date, classId) {
        const checkClass = await classServices.findClassRoomById(classId)

        var dayOfWeek = new Date(date).getDay();

        // Chuyển đổi chuỗi thành mảng số
        const selectedDays = checkClass.day_study.split('-').map(day => {
            if (day !== 'CN') {
                return parseInt(day) - 1;
            } else {
                return 0;
            }
        });
        // Kiểm tra xem ngày trong tuần của ngày cần kiểm tra có trong mảng các ngày đã chọn không
        return selectedDays.includes(dayOfWeek);
        // const checkCalendarTeach = await planning_calendar_teachServices.findOneCheckCalendarTeach(date,classId);
        // return checkCalendarTeach;
    }

    async addUtilProcedurePlanningLKHBC(procedureId, year) {
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_FEBRUARY.STT, ProcedurePlan.PLAN_MONTH_FEBRUARY.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_FEBRUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_JANUARY.STT, ProcedurePlan.REPORT_MONTH_JANUARY.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_JANUARY.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_MARCH.STT, ProcedurePlan.PLAN_MONTH_MARCH.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_MARCH.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_FEBRUARY.STT, ProcedurePlan.REPORT_MONTH_FEBRUARY.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_FEBRUARY.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_APRIL.STT, ProcedurePlan.PLAN_MONTH_APRIL.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_APRIL.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_MARCH.STT, ProcedurePlan.REPORT_MONTH_MARCH.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_MARCH.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_MAY.STT, ProcedurePlan.PLAN_MONTH_MAY.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_MAY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_APRIL.STT, ProcedurePlan.REPORT_MONTH_APRIL.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_APRIL.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_JUNE.STT, ProcedurePlan.PLAN_MONTH_JUNE.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_JUNE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_MAY.STT, ProcedurePlan.REPORT_MONTH_MAY.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_MAY.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_JULY.STT, ProcedurePlan.PLAN_MONTH_JULY.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_JULY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_JUNE.STT, ProcedurePlan.REPORT_MONTH_JUNE.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_JUNE.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_AUGUST.STT, ProcedurePlan.PLAN_MONTH_AUGUST.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_AUGUST.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_JULY.STT, ProcedurePlan.REPORT_MONTH_JULY.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_JULY.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_SEPTEMBER.STT, ProcedurePlan.PLAN_MONTH_SEPTEMBER.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_SEPTEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_AUGUST.STT, ProcedurePlan.REPORT_MONTH_AUGUST.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_AUGUST.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_OCTOBER.STT, ProcedurePlan.PLAN_MONTH_OCTOBER.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_OCTOBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_SEPTEMBER.STT, ProcedurePlan.REPORT_MONTH_SEPTEMBER.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_SEPTEMBER.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_NOVEMBER.STT, ProcedurePlan.PLAN_MONTH_NOVEMBER.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_NOVEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_OCTOBER.STT, ProcedurePlan.REPORT_MONTH_OCTOBER.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_OCTOBER.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_DECEMBER.STT, ProcedurePlan.PLAN_MONTH_DECEMBER.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_DECEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_NOVEMBER.STT, ProcedurePlan.REPORT_MONTH_NOVEMBER.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_NOVEMBER.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_MONTH_JANUARY.STT, ProcedurePlan.PLAN_MONTH_JANUARY.CONTENT, year + '-' + ProcedurePlan.PLAN_MONTH_JANUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_MONTH_DECEMBER.STT, ProcedurePlan.REPORT_MONTH_DECEMBER.CONTENT, year + '-' + ProcedurePlan.REPORT_MONTH_DECEMBER.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_QUARTER_FOUR.STT, ProcedurePlan.REPORT_QUARTER_FOUR.CONTENT, year + '-' + ProcedurePlan.REPORT_QUARTER_FOUR.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_QUARTER_TWO.STT, ProcedurePlan.PLAN_QUARTER_TWO.CONTENT, year + '-' + ProcedurePlan.PLAN_QUARTER_TWO.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_QUARTER_ONE.STT, ProcedurePlan.REPORT_QUARTER_ONE.CONTENT, year + '-' + ProcedurePlan.REPORT_QUARTER_ONE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_QUARTER_THREE.STT, ProcedurePlan.PLAN_QUARTER_THREE.CONTENT, year + '-' + ProcedurePlan.PLAN_QUARTER_THREE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_QUARTER_TWO.STT, ProcedurePlan.REPORT_QUARTER_TWO.CONTENT, year + '-' + ProcedurePlan.REPORT_QUARTER_TWO.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_QUARTER_FOUR.STT, ProcedurePlan.PLAN_QUARTER_FOUR.CONTENT, year + '-' + ProcedurePlan.PLAN_QUARTER_FOUR.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.REPORT_QUARTER_THREE.STT, ProcedurePlan.REPORT_QUARTER_THREE.CONTENT, year + '-' + ProcedurePlan.REPORT_QUARTER_THREE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_QUARTER_ONE.STT, ProcedurePlan.PLAN_QUARTER_ONE.CONTENT, year + '-' + ProcedurePlan.PLAN_QUARTER_ONE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlan.PLAN_YEAR.STT, ProcedurePlan.PLAN_YEAR.CONTENT, year + '-' + ProcedurePlan.PLAN_YEAR.DATE)

        return;
    }
    async addUtilProcedurePlanningLKHKD(procedureId, year) {
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_FEBRUARY.STT, ProcedurePlanBusiness.PLAN_MONTH_FEBRUARY.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_FEBRUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_MARCH.STT, ProcedurePlanBusiness.PLAN_MONTH_MARCH.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_MARCH.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_APRIL.STT, ProcedurePlanBusiness.PLAN_MONTH_APRIL.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_APRIL.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_QUARTER_TWO.STT, ProcedurePlanBusiness.PLAN_QUARTER_TWO.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_QUARTER_TWO.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_MAY.STT, ProcedurePlanBusiness.PLAN_MONTH_MAY.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_MAY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_JUNE.STT, ProcedurePlanBusiness.PLAN_MONTH_JUNE.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_JUNE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_JULY.STT, ProcedurePlanBusiness.PLAN_MONTH_JULY.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_JULY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_QUARTER_THREE.STT, ProcedurePlanBusiness.PLAN_QUARTER_THREE.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_QUARTER_THREE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_AUGUST.STT, ProcedurePlanBusiness.PLAN_MONTH_AUGUST.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_AUGUST.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_SEPTEMBER.STT, ProcedurePlanBusiness.PLAN_MONTH_SEPTEMBER.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_SEPTEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_OCTOBER.STT, ProcedurePlanBusiness.PLAN_MONTH_OCTOBER.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_OCTOBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_QUARTER_FOUR.STT, ProcedurePlanBusiness.PLAN_QUARTER_FOUR.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_QUARTER_FOUR.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_NOVEMBER.STT, ProcedurePlanBusiness.PLAN_MONTH_NOVEMBER.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_NOVEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_DECEMBER.STT, ProcedurePlanBusiness.PLAN_MONTH_DECEMBER.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_DECEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_YEAR_NOVEMBER.STT, ProcedurePlanBusiness.PLAN_YEAR_NOVEMBER.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_YEAR_NOVEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_MONTH_JANUARY.STT, ProcedurePlanBusiness.PLAN_MONTH_JANUARY.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_MONTH_JANUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedurePlanBusiness.PLAN_QUARTER_ONE.STT, ProcedurePlanBusiness.PLAN_QUARTER_ONE.CONTENT, year + '-' + ProcedurePlanBusiness.PLAN_QUARTER_ONE.DATE)
        return;
    }

    async addProcessAccountantBusiness(procedureId, year) {
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_DECEMBER.STT, ProcedureAccountBusiness.REPORT_MONTH_DECEMBER.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_DECEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_QUARTER_FOUR.STT, ProcedureAccountBusiness.REPORT_QUARTER_FOUR.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_QUARTER_FOUR.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_YEAR.STT, ProcedureAccountBusiness.REPORT_YEAR.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_YEAR.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_JANUARY.STT, ProcedureAccountBusiness.REPORT_MONTH_JANUARY.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_JANUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_FEBRUARY.STT, ProcedureAccountBusiness.REPORT_MONTH_FEBRUARY.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_FEBRUARY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_MARCH.STT, ProcedureAccountBusiness.REPORT_MONTH_MARCH.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_MARCH.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_QUARTER_ONE.STT, ProcedureAccountBusiness.REPORT_QUARTER_ONE.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_QUARTER_ONE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_APRIL.STT, ProcedureAccountBusiness.REPORT_MONTH_APRIL.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_APRIL.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_MAY.STT, ProcedureAccountBusiness.REPORT_MONTH_MAY.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_MAY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_JUNE.STT, ProcedureAccountBusiness.REPORT_MONTH_JUNE.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_JUNE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_QUARTER_TWO.STT, ProcedureAccountBusiness.REPORT_QUARTER_TWO.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_QUARTER_TWO.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_JULY.STT, ProcedureAccountBusiness.REPORT_MONTH_JULY.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_JULY.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_AUGUST.STT, ProcedureAccountBusiness.REPORT_MONTH_AUGUST.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_AUGUST.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_SEPTEMBER.STT, ProcedureAccountBusiness.REPORT_MONTH_SEPTEMBER.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_SEPTEMBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_QUARTER_THREE.STT, ProcedureAccountBusiness.REPORT_QUARTER_THREE.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_QUARTER_THREE.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_OCTOBER.STT, ProcedureAccountBusiness.REPORT_MONTH_OCTOBER.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_OCTOBER.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcedureAccountBusiness.REPORT_MONTH_NOVEMBER.STT, ProcedureAccountBusiness.REPORT_MONTH_NOVEMBER.CONTENT, year + '-' + ProcedureAccountBusiness.REPORT_MONTH_NOVEMBER.DATE)
        return;
    }

    async addProcessAccountant(procedureId, year) {
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfJanuary.STT, ProcessAccountant.StartOfJanuary.CONTENT, year + '-' + ProcessAccountant.StartOfJanuary.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfJanuary.STT, ProcessAccountant.EndOfJanuary.CONTENT, year + '-' + ProcessAccountant.EndOfJanuary.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfFebruary.STT, ProcessAccountant.StartOfFebruary.CONTENT, year + '-' + ProcessAccountant.StartOfFebruary.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfFebruary.STT, ProcessAccountant.EndOfFebruary.CONTENT, year + '-' + ProcessAccountant.EndOfFebruary.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfMarch.STT, ProcessAccountant.StartOfMarch.CONTENT, year + '-' + ProcessAccountant.StartOfMarch.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfMarch.STT, ProcessAccountant.EndOfMarch.CONTENT, year + '-' + ProcessAccountant.EndOfMarch.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.QuarterONe.STT, ProcessAccountant.QuarterONe.CONTENT, year + '-' + ProcessAccountant.QuarterONe.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfApril.STT, ProcessAccountant.StartOfApril.CONTENT, year + '-' + ProcessAccountant.StartOfApril.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfApril.STT, ProcessAccountant.EndOfApril.CONTENT, year + '-' + ProcessAccountant.EndOfApril.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfMay.STT, ProcessAccountant.StartOfMay.CONTENT, year + '-' + ProcessAccountant.StartOfMay.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfMay.STT, ProcessAccountant.EndOfMay.CONTENT, year + '-' + ProcessAccountant.EndOfMay.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfJune.STT, ProcessAccountant.StartOfJune.CONTENT, year + '-' + ProcessAccountant.StartOfJune.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfJune.STT, ProcessAccountant.EndOfJune.CONTENT, year + '-' + ProcessAccountant.EndOfJune.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfJuly.STT, ProcessAccountant.StartOfJuly.CONTENT, year + '-' + ProcessAccountant.StartOfJuly.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.QuarterTwo.STT, ProcessAccountant.QuarterTwo.CONTENT, year + '-' + ProcessAccountant.QuarterTwo.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfJuly.STT, ProcessAccountant.EndOfJuly.CONTENT, year + '-' + ProcessAccountant.EndOfJuly.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfAugust.STT, ProcessAccountant.StartOfAugust.CONTENT, year + '-' + ProcessAccountant.StartOfAugust.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfAugust.STT, ProcessAccountant.EndOfAugust.CONTENT, year + '-' + ProcessAccountant.EndOfAugust.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfSeptember.STT, ProcessAccountant.StartOfSeptember.CONTENT, year + '-' + ProcessAccountant.StartOfSeptember.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfSeptember.STT, ProcessAccountant.EndOfSeptember.CONTENT, year + '-' + ProcessAccountant.EndOfSeptember.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.QuarterThree.STT, ProcessAccountant.QuarterThree.CONTENT, year + '-' + ProcessAccountant.QuarterThree.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfOctober.STT, ProcessAccountant.StartOfOctober.CONTENT, year + '-' + ProcessAccountant.StartOfOctober.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfOctober.STT, ProcessAccountant.EndOfOctober.CONTENT, year + '-' + ProcessAccountant.EndOfOctober.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfNovember.STT, ProcessAccountant.StartOfNovember.CONTENT, year + '-' + ProcessAccountant.StartOfNovember.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfNovember.STT, ProcessAccountant.EndOfNovember.CONTENT, year + '-' + ProcessAccountant.EndOfNovember.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.StartOfDecember.STT, ProcessAccountant.StartOfDecember.CONTENT, year + '-' + ProcessAccountant.StartOfDecember.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.EndOfDecember.STT, ProcessAccountant.EndOfDecember.CONTENT, year + '-' + ProcessAccountant.EndOfDecember.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAccountant.QuarterFour.STT, ProcessAccountant.QuarterFour.CONTENT, year + '-' + ProcessAccountant.QuarterFour.DATE)
        return;
    }

    async addProcessAcademic(procedureId, year) {
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportJanuary.STT, ProcessAcademic.ReportJanuary.CONTENT, year + '-' + ProcessAcademic.ReportJanuary.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportFebruary.STT, ProcessAcademic.ReportFebruary.CONTENT, year + '-' + ProcessAcademic.ReportFebruary.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportMarch.STT, ProcessAcademic.ReportMarch.CONTENT, year + '-' + ProcessAcademic.ReportMarch.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportApril.STT, ProcessAcademic.ReportApril.CONTENT, year + '-' + ProcessAcademic.ReportApril.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportMay.STT, ProcessAcademic.ReportMay.CONTENT, year + '-' + ProcessAcademic.ReportMay.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportJune.STT, ProcessAcademic.ReportJune.CONTENT, year + '-' + ProcessAcademic.ReportJune.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportJuly.STT, ProcessAcademic.ReportJuly.CONTENT, year + '-' + ProcessAcademic.ReportJuly.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportAugust.STT, ProcessAcademic.ReportAugust.CONTENT, year + '-' + ProcessAcademic.ReportAugust.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportSeptember.STT, ProcessAcademic.ReportSeptember.CONTENT, year + '-' + ProcessAcademic.ReportSeptember.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportOctober.STT, ProcessAcademic.ReportOctober.CONTENT, year + '-' + ProcessAcademic.ReportOctober.DATE)

        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportNovember.STT, ProcessAcademic.ReportNovember.CONTENT, year + '-' + ProcessAcademic.ReportNovember.DATE)
        await step_procedureServices.addStepProcedure(procedureId, ProcessAcademic.ReportDecember.STT, ProcessAcademic.ReportDecember.CONTENT, year + '-' + ProcessAcademic.ReportDecember.DATE)
        return;
    }


    formatAccount(account) {
        if (account.role === EnumServerDefinitions.ROLE.TEACHER) {
            // Nếu là giáo viên (role = 1)
            return {
                name: account.Teacher.name,
                avatar: account.Teacher.avatar,
            };
        } else if (account.role === EnumServerDefinitions.ROLE.STUDENT) {
            // Nếu là học sinh (role = 2)
            return {
                name: account.Student.name,
                avatar: '',
            };
        } else {
            // Nếu là học sinh (role = 2)
            return {
                name: account.Admin.name,
                avatar: '',
            };
        }
    }
    //format comments
    formatComments(listComments) {
        return listComments.map(comment => {
            const account = this.formatAccount(comment.Account);
            return {
                id: comment.id,
                content: comment.content,
                time_comment: comment.time_comment,
                name: account.name,
                account_id: comment.account_id,
                role: comment.Account.role,
            }
        });
    }
    formatFile(listFile) {
        return listFile.map(postFile => ({
            file_id: postFile.File.id,
            file_name: postFile.File.file_name,
            physical_name: postFile.File.physical_name,
        }));
    }

    formatPost(listPost) {
        const formattedListPost = listPost.map(post => {
            const formattedPostFiles = this.formatFile(post.PostFiles);
            const account = this.formatAccount(post.Account)
            const formattedPost = {
                id: post.id,
                title: post.title,
                content: post.content,
                category_post: post.category_post,
                title_assignment: post.Assignment.title,
                link_assignment: post.Assignment.link,
                name_programme: post.Assignment.name_programme,
                name: account.name,
                avatar: account.avatar,
                files: formattedPostFiles,
                created_at: post.created_at,
                category: post.categories_post,
                status: post.status
            };
            if (post.post_category_id !== EnumServerDefinitions.POST_CATEGORY.NEWS && post.post_details) {
                formattedPost.finish_date = post.post_details.finish_date;
            }
            return formattedPost;
        });
        return formattedListPost;
    }

    formatPostDetail(postDetail) {

        const formatComments = this.formatComments(postDetail?.CommentPosts);
        const account = this.formatAccount(postDetail.Account);
        const studentPosts = (postDetail.categories_post === EnumServerDefinitions.POST_CATEGORY.EXERCISE || postDetail.categories_post === EnumServerDefinitions.POST_CATEGORY.EXAM) ? postDetail.StudentPosts.map(item => ({
            id: item.id,
            student_list_id: item.StudentList?.id,
            finish_date: item.finish_date,
            total_score: item.total_score,
            name: item.StudentList?.Student?.name,
            evaluate: item.evaluate,
            comment: item.comment,
            answer_text: item.answer_text,
            file: this.formatFile(item.StudentPostFiles)
        })) : [];
        const formattedPost = {
            id: postDetail.id,
            title: postDetail.title,
            content: postDetail.content,
            create_date: postDetail.created_at,
            start_date: postDetail.PostDetail?.start_date ?? null,
            finish_date: postDetail.PostDetail?.finish_date ?? null,
            post_category: postDetail.categories_post,
            name: account.name,
            files: this.formatFile(postDetail.PostFiles),
            comments: formatComments,
            student_posts: studentPosts,
        };
        return formattedPost;
    }

    async checkStudentOfAssignmentClass(studentId) {
        const classListOfStudent = await Classroom.findAll({
            where: {
                status: EnumServerDefinitions.STATUS.ACTIVE,
            },
            include: [{
                model: StudentList,
                where: {
                    student_id: studentId,
                    status: EnumServerDefinitions.STATUS.ACTIVE,
                },
                required: true,
                attributes: ['id'],
            }],
            attributes: ['id'],
        })
        // Lấy danh sách ID các lớp học
        const classIds = classListOfStudent.map(cls => cls.id);

        if (classIds.length === 0) {
            return []; // Nếu học viên không tham gia lớp nào, trả về mảng rỗng
        }
        const assignmentClass = await AssignmentClass.findAll({
            where: {
                class_id: classIds,
                status: EnumServerDefinitions.STATUS.ACTIVE,
            },
            attributes: ['assignment_id'],
        })
        const assignmentClassIds = assignmentClass.map(asm => asm.assignment_id);

        if (assignmentClassIds.length === 0) {
            return []; // Nếu học viên không tham gia lớp nào, trả về mảng rỗng
        }

        const checkAssignmentPost = await Post.findAll({
            where: {
                assignment_id: assignmentClassIds,
                status: EnumServerDefinitions.STATUS.ACTIVE,
            },
            attributes: ['id'],
        });
        return checkAssignmentPost;
    }

    // check dead line exceeded
    checkDeadlineExceeded(finishDate) {
        const submissionDate = moment().utc();
        if (submissionDate > finishDate && finishDate) {
            return true;
        }
        return false;
    }

    // check dead line exceeded
    async deleteFile(urlFile) {
        const physicalFilePath = 'public/images/' + urlFile;
        if (fs.existsSync(physicalFilePath)) {
            fs.removeSync(physicalFilePath);
        }
    }
}


module.exports = new FormatUtils;