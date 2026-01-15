const EnumServerDefinitions = require('../enums/enum_server_definitions');
const { Op } = require('sequelize');
const Teacher = require('../../models/teacher.model');
const Student = require('../../models/student.model');
const Classroom = require('../../models/classroom.model');
const logger = require('../../config/logger.config');
const Staff = require('../../models/staff.model');
const templateServices = require('../../services/template.services');
const { TemplateString, AdultInstallationCourse } = require('./check_template');
const moment = require('moment');
const Course = require('../../models/course.model');
const Template = require('../../models/template.model');
const StudentList = require('../../models/student_list.model');
const formatUtils = require('./format.utils');
const template_public_class = require('../../services/cskh/template_public_class');
const { TemplatePublicClass } = require('./content_procedure');
class CommonService {


    async checkCCCDUserExist(CCCD, role) {
        try {
            let isCheck;
            if (role === EnumServerDefinitions.ROLE.TEACHER) {
                isCheck = await Teacher.findOne({
                    where: {
                        CCCD: CCCD
                    },
                    attributes: ['id']
                });
            } else {
                isCheck = await Staff.findOne({
                    where: {
                        CCCD: CCCD
                    },
                    attributes: ['id']
                });
            }
            return isCheck;
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }

    async addTemplateToTemplateString(studentListId, classId, date_start_study, expected_date_expiration, course_id) {
        try {
            const checkClassStudy = await Classroom.findOne({
                where: {
                    id: classId
                },
                attributes: ['type_study', 'name_programme', 'day_study'],
            })
            const checkCourse = await Course.findOne({
                where: {
                    id: course_id
                },
            })
            const date_start = moment(date_start_study, "YYYY-MM-DD").clone();
            const expected_date = moment(expected_date_expiration, "YYYY-MM-DD").clone();
            const checkClass = await formatUtils.getNumberDay(date_start, 10, checkClassStudy.day_study)
            const date_1 = date_start.clone().subtract(7, 'days');
            const date_2 = date_start.clone().subtract(5, 'days');
            const date_3 = date_start.clone().subtract(2, 'days');
            const date_4 = date_start.clone().subtract(1, 'days');
            const date_5 = date_start.clone();
            const date_6 = date_start.clone().add(1, 'days');
            const date_7 = date_start.clone().add(9, 'days');
            const date_8 = date_7.clone().add(3, 'days');
            var date_9 = date_start.clone().add(checkClass, 'days');
            var date_10 = date_9.clone().add(1, 'days');
            const date_11 = expected_date.clone().subtract(14, 'days');
            const date_12 = expected_date.clone().subtract(10, 'days');
            const date_13 = expected_date.clone().subtract(14, 'days');
            const date_14 = expected_date.clone().subtract(3, 'days');
            const date_15 = expected_date.clone();
            const date_16 = expected_date.clone().add(3, 'days');
            const date_task_10_sessions = expected_date.clone().subtract(2, 'days');
            const date_18 = expected_date.clone()
            if (checkClassStudy.type_study === 'Private') {
                if (checkCourse && checkCourse.number_session <= 10) {
                    await templateServices.addTemplate(studentListId, TemplateString.Template_17.TITLE_17, TemplateString.Template_17.DESCRIPTION_17, 17, moment(date_14).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 18, moment(date_15).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                } else if (checkClassStudy.name_programme === 'Adults' || checkClassStudy.name_programme === 'IELTS Adults') {
                    await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_5.TITLE_5, TemplateString.Template_5.DESCRIPTION_5, 5, moment(date_5).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 6, moment(date_6).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_7.TITLE_7, TemplateString.Template_7.DESCRIPTION_7, 7, moment(date_7).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_8.TITLE_8, TemplateString.Template_8.DESCRIPTION_8, 8, moment(date_8).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 9, moment(date_9).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 10, moment(date_10).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 11, moment(date_11).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 12, moment(date_12).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_13.TITLE_13, TemplateString.Template_13.DESCRIPTION_13, 13, moment(date_13).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 14, moment(date_14).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_15.TITLE_15, TemplateString.Template_15.DESCRIPTION_15, 15, moment(date_15).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 18, moment(date_18).format('YYYY-MM-DD'));
                } else {
                    await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD')),
                        await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD')),
                        await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 5, moment(date_6).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 6, moment(date_9).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 7, moment(date_10).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 8, moment(date_11).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 9, moment(date_12).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 10, moment(date_14).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 11, moment(date_16).format('YYYY-MM-DD'));
                    await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 12, moment(date_18).format('YYYY-MM-DD'));
                }
            } else if (checkClassStudy.type_study === 'Private Cài Đặt') {
                await templateServices.addTemplate(studentListId, AdultInstallationCourse.Template_1.TITLE_1, AdultInstallationCourse.Template_1.DESCRIPTION_1, 1, moment(date_14).format('YYYY-MM-DD'));
            }
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }


    async resetTemplateToTemplateString(studentListId, classId, date_start_study, expected_date_expiration, checkSession) {
        try {
            const checkClassStudy = await Classroom.findOne({
                where: {
                    id: classId
                },
                attributes: ['type_study', 'name_programme', 'day_study'],
            })
            const date_start = moment(date_start_study, "YYYY-MM-DD").clone();
            const expected_date = moment(expected_date_expiration, "YYYY-MM-DD").clone();
            const checkClass = await formatUtils.getNumberDay(date_start, 10, checkClassStudy.day_study)
            const date_1 = date_start.clone().subtract(7, 'days');
            const date_2 = date_start.clone().subtract(5, 'days');
            const date_3 = date_start.clone().subtract(2, 'days');
            const date_4 = date_start.clone().subtract(1, 'days');
            const date_5 = date_start.clone();
            const date_6 = date_start.clone().add(1, 'days');
            const date_7 = date_start.clone().add(9, 'days');
            const date_8 = date_7.clone().add(3, 'days');
            var date_9 = date_start.clone().add(checkClass, 'days');
            var date_10 = date_9.clone().add(1, 'days');
            const date_11 = expected_date.clone().subtract(14, 'days');
            const date_12 = expected_date.clone().subtract(10, 'days');
            const date_13 = expected_date.clone().subtract(14, 'days');
            const date_14 = expected_date.clone().subtract(3, 'days');
            const date_15 = expected_date.clone();
            const date_16 = expected_date.clone().add(3, 'days');
            const date_10_sessions = expected_date.clone().subtract(2, 'days');
            const date_18 = expected_date.clone()

            const checkTemplate = await templateServices.checkTemplate(studentListId);
            const checkTemplateStt = await templateServices.checkTemplateByStt(studentListId, 17);

            if (checkTemplate.length != 0) {
                await templateServices.addTemplateHistory(studentListId);
                if (checkClassStudy.type_study === 'Private') {
                    if (checkSession == 2) {
                        await templateServices.resetActiveTemplate(studentListId);
                        if (checkTemplateStt.length == 0) {
                            await templateServices.addTemplate(studentListId, TemplateString.Template_17.TITLE_17, TemplateString.Template_17.DESCRIPTION_17, 17, moment(date_14).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 18, moment(date_15).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                        } else {
                            await templateServices.resetTemplate(studentListId, 17, moment(date_14).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 18, moment(date_15).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 16, moment(date_16).format('YYYY-MM-DD'));
                        }
                    } else if (checkClassStudy.name_programme === 'Adults' || checkClassStudy.name_programme === 'IELTS Adults') {
                        await templateServices.resetActiveTemplate(studentListId);
                        if ((checkTemplate.length == 3 || checkTemplate.length == 1) && checkTemplateStt.length != 0) {
                            await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_5.TITLE_5, TemplateString.Template_5.DESCRIPTION_5, 5, moment(date_5).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 6, moment(date_6).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_7.TITLE_7, TemplateString.Template_7.DESCRIPTION_7, 7, moment(date_7).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_8.TITLE_8, TemplateString.Template_8.DESCRIPTION_8, 8, moment(date_8).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 9, moment(date_9).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 10, moment(date_10).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 11, moment(date_11).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 12, moment(date_12).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_13.TITLE_13, TemplateString.Template_13.DESCRIPTION_13, 13, moment(date_13).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 14, moment(date_14).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_15.TITLE_15, TemplateString.Template_15.DESCRIPTION_15, 15, moment(date_15).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 17, moment(date_18).format('YYYY-MM-DD'));
                        } else {
                            await templateServices.resetTemplate(studentListId, 1, moment(date_1).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 1, moment(date_1).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 2, moment(date_2).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 3, moment(date_3).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 4, moment(date_4).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 5, moment(date_5).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 6, moment(date_6).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 7, moment(date_7).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 8, moment(date_8).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 9, moment(date_9).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 10, moment(date_10).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 11, moment(date_11).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 12, moment(date_12).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 13, moment(date_13).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 14, moment(date_14).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 15, moment(date_15).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 16, moment(date_16).format('YYYY-MM-DD'));
                            await templateServices.resetTemplate(studentListId, 18, moment(date_18).format('YYYY-MM-DD'));
                        }
                    } else {
                        await templateServices.resetActiveTemplate(studentListId);
                        if ((checkTemplate.length == 3 || checkTemplate.length == 1) && checkTemplateStt.length != 0) {
                            await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 5, moment(date_6).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 6, moment(date_9).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 7, moment(date_10).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 8, moment(date_11).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 9, moment(date_12).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 10, moment(date_14).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 11, moment(date_16).format('YYYY-MM-DD'));
                            await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 12, moment(date_18).format('YYYY-MM-DD'));
                        }
                        await templateServices.resetTemplate(studentListId, 1, moment(date_1).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 2, moment(date_2).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 3, moment(date_3).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 4, moment(date_4).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 5, moment(date_6).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 6, moment(date_9).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 7, moment(date_10).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 8, moment(date_11).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 9, moment(date_12).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 10, moment(date_14).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 11, moment(date_16).format('YYYY-MM-DD'));
                        await templateServices.resetTemplate(studentListId, 12, moment(date_18).format('YYYY-MM-DD'));
                    }
                }
            } else {
                if (checkClassStudy.type_study === 'Private') {
                    if (checkSession == 2) {
                        await templateServices.addTemplate(studentListId, TemplateString.Template_17.TITLE_17, TemplateString.Template_17.DESCRIPTION_17, 17, moment(date_14).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 18, moment(date_15).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                    } else if (checkClassStudy.name_programme === 'Adults' || checkClassStudy.name_programme === 'IELTS Adults') {
                        await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_5.TITLE_5, TemplateString.Template_5.DESCRIPTION_5, 5, moment(date_5).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 6, moment(date_6).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_7.TITLE_7, TemplateString.Template_7.DESCRIPTION_7, 7, moment(date_7).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_8.TITLE_8, TemplateString.Template_8.DESCRIPTION_8, 8, moment(date_8).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 9, moment(date_9).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 10, moment(date_10).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 11, moment(date_11).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 12, moment(date_12).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_13.TITLE_13, TemplateString.Template_13.DESCRIPTION_13, 13, moment(date_13).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 14, moment(date_14).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_15.TITLE_15, TemplateString.Template_15.DESCRIPTION_15, 15, moment(date_15).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 16, moment(date_16).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 17, moment(date_18).format('YYYY-MM-DD'));
                    } else {
                        await templateServices.addTemplate(studentListId, TemplateString.Template_1.TITLE_1, TemplateString.Template_1.DESCRIPTION_1, 1, moment(date_1).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_2.TITLE_2, TemplateString.Template_2.DESCRIPTION_2, 2, moment(date_2).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_3.TITLE_3, TemplateString.Template_3.DESCRIPTION_3, 3, moment(date_3).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_4.TITLE_4, TemplateString.Template_4.DESCRIPTION_4, 4, moment(date_4).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_6.TITLE_6, TemplateString.Template_6.DESCRIPTION_6, 5, moment(date_6).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_9.TITLE_9, TemplateString.Template_9.DESCRIPTION_9, 6, moment(date_9).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_10.TITLE_10, TemplateString.Template_10.DESCRIPTION_10, 7, moment(date_10).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_11.TITLE_11, TemplateString.Template_11.DESCRIPTION_11, 8, moment(date_11).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_12.TITLE_12, TemplateString.Template_12.DESCRIPTION_12, 9, moment(date_12).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_14.TITLE_14, TemplateString.Template_14.DESCRIPTION_14, 10, moment(date_14).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_16.TITLE_16, TemplateString.Template_16.DESCRIPTION_16, 11, moment(date_16).format('YYYY-MM-DD'));
                        await templateServices.addTemplate(studentListId, TemplateString.Template_18.TITLE_18, TemplateString.Template_18.DESCRIPTION_18, 12, moment(date_18).format('YYYY-MM-DD'));
                    }
                }
            }
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }
    async updateDateTemplateNumberEnd(studentListId, numberEnd) {
        try {
            const CheckTemplate = await Template.findAll({
                where: {
                    student_list_id: studentListId,
                    status: EnumServerDefinitions.STATUS.ACTIVE,
                    link: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường link không null
                            { [Op.eq]: '' }    // Trường link không rỗng
                        ]
                    },
                    note: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường note không null
                            { [Op.eq]: '' }    // Trường note không rỗng
                        ]
                    },
                    file_id: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường file_id không null
                            { [Op.eq]: '' }    // Trường file_id không rỗng
                        ]
                    },
                },
                attributes: ['id', 'stt', 'date_template'],
                include: [{
                    model: StudentList,
                    required: false,
                    attributes: ['id'],
                    include: [{
                        model: Classroom,
                        required: false,
                        attributes: ['name_programme']
                    },]
                }]
            })
            const CheckStudent = await StudentList.findOne({
                where: {
                    id: studentListId
                },
                attributes: ['id'],
                include: [{
                    model: Classroom,
                    required: false,
                    attributes: ['name_programme', 'day_study']
                },]
            })
            if (CheckStudent.Classroom.name_programme === 'Adults' || CheckStudent.Classroom.name_programme === 'IELTS Adults') {
                for (var i = 0; i < CheckTemplate.length; i++) {
                    if (CheckTemplate[i].stt > 10) {
                        const result = await formatUtils.getNumberDayEndTemplate(CheckTemplate[i].date_template, numberEnd, CheckStudent.Classroom.day_study)
                        const date_template = moment(CheckTemplate[i].date_template).clone();
                        const date = date_template.add(result, 'days');
                        // if (CheckTemplate[i].stt == 16) {
                        //     const date_16 = date.add(3, 'days');
                        //     await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date_16)
                        // } else {
                        await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                        // }
                    }
                }
            } else {
                for (var i = 0; i < CheckTemplate.length; i++) {
                    // if (CheckTemplate[i].stt > 7) {
                    const result = await formatUtils.getNumberDayEndTemplate(CheckTemplate[i].date_template, numberEnd, CheckStudent.Classroom.day_study)
                    const date_template = moment(CheckTemplate[i].date_template).clone();
                    const date = date_template.add(result, 'days');
                    // if (CheckTemplate[i].stt == 11) {
                    //     const date_11 = date.add(3, 'days');
                    //     await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date_11)
                    // } else {
                    await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                    // }
                    // }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async updateDateTemplateDateEnd(studentListId, dateEnd) {
        try {
            const CheckTemplate = await Template.findAll({
                where: {
                    student_list_id: studentListId,
                    status: EnumServerDefinitions.STATUS.ACTIVE,
                    link: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường link không null
                            { [Op.eq]: '' }    // Trường link không rỗng
                        ]
                    },
                    note: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường note không null
                            { [Op.eq]: '' }    // Trường note không rỗng
                        ]
                    },
                    file_id: {
                        [Op.or]: [
                            { [Op.eq]: null }, // Trường file_id không null
                            { [Op.eq]: '' }    // Trường file_id không rỗng
                        ]
                    },
                },
                attributes: ['id', 'stt', 'date_template'],
                include: [{
                    model: StudentList,
                    required: false,
                    attributes: ['id'],
                    include: [{
                        model: Classroom,
                        required: false,
                        attributes: ['name_programme']
                    },]
                }]
            })
            const CheckStudent = await StudentList.findOne({
                where: {
                    id: studentListId
                },
                attributes: ['id'],
                include: [{
                    model: Classroom,
                    required: false,
                    attributes: ['name_programme', 'day_study']
                },]
            })
            if (CheckStudent.Classroom.name_programme === 'Adults' || CheckStudent.Classroom.name_programme === 'IELTS Adults') {
                for (var i = 0; i < CheckTemplate.length; i++) {
                    switch (CheckTemplate[i].stt) {
                        case 11: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(14, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 12: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(10, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 13: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(14, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 14: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 15: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.add(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 16: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.add(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 17: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.add(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                    }
                }
            } else {
                for (var i = 0; i < CheckTemplate.length; i++) {
                    switch (CheckTemplate[i].stt) {
                        case 8: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(14, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 9: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(10, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 10: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.subtract(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 11: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.add(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                        case 17: {
                            const date_template = moment(dateEnd).clone();
                            const date = date_template.add(3, 'days');
                            await templateServices.updateDateTemplate(studentListId, CheckTemplate[i].stt, date)
                            break;
                        };
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    //template class public
    async addTemplateClassPublic(studentListId, classId, date_start_study, expected_date_expiration) {
        try {
            const checkClassStudy = await Classroom.findOne({
                where: {
                    id: classId
                },
                attributes: ['type_study', 'name_programme', 'class_name', 'day_study', 'date_end'],
            })
            const date_start = moment(date_start_study, "YYYY-MM-DD").clone();
            const expected_date = moment(expected_date_expiration, "YYYY-MM-DD").clone();
            const currentDate = moment(); // Lấy ngày hiện tại
            const date_1 = currentDate.clone().add(1, 'days');
            const date_2 = date_start.clone().subtract(1, 'days');
            const date_3 = date_start.clone();
            const date_4 = date_start.clone().add(7, 'days');
            const date_5 = expected_date.clone().subtract(1, 'month');
            const date_8 = expected_date.clone().add(3, 'days');
            const month_3 = moment(checkClassStudy.date_end).subtract(3, 'months');
            if (checkClassStudy.type_study === 'Group') {
                if (checkClassStudy.name_programme !== 'Adults' || checkClassStudy.name_programme !== 'IELTS Adults') {
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateOne.CONTENT, TemplatePublicClass.TemplateOne.STT, moment(date_1).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateTwo.CONTENT, TemplatePublicClass.TemplateTwo.STT, moment(date_2).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateThere.CONTENT, TemplatePublicClass.TemplateThere.STT, moment(date_3).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateFour.CONTENT, TemplatePublicClass.TemplateFour.STT, moment(date_4).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateFive.CONTENT, TemplatePublicClass.TemplateFive.STT, moment(date_5).format('YYYY-MM-DD'));
                    // kiểm tra level của học viên nào
                    if (checkClassStudy.class_name.substring(0, 3) === 'KL3' || checkClassStudy.class_name.substring(0, 3) === 'KL4' || checkClassStudy.class_name.substring(0, 3) === 'KL5' || checkClassStudy.class_name.substring(0, 6) === 'FLYERS' || checkClassStudy.class_name.substring(0, 3) === 'TT3' || checkClassStudy.class_name.substring(0, 3) === 'TT4') {
                        await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSix.CONTENT, TemplatePublicClass.TemplateSix.STT, moment(month_3).format('YYYY-MM-DD'));
                    } else {
                        await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSix.CONTENT, TemplatePublicClass.TemplateSix.STT, null);
                    }
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSeven.CONTENT, TemplatePublicClass.TemplateSeven.STT, null);
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateEight.CONTENT, TemplatePublicClass.TemplateEight.STT, moment(date_8).format('YYYY-MM-DD'));
                }
            }
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }

    async resetTemplateToTemplatePublic(studentListId, classId, date_start_study, expected_date_expiration) {
        try {
            const checkClassStudy = await Classroom.findOne({
                where: {
                    id: classId
                },
                attributes: ['type_study', 'name_programme', 'class_name', 'day_study', 'date_end'],
            })
            // Chuyển date_end thành đối tượng moment và lùi 3 tháng
            const month_3 = moment(checkClassStudy.date_end).subtract(3, 'months');
            const date_start = moment(date_start_study, "YYYY-MM-DD").clone();
            const expected_date = moment(expected_date_expiration, "YYYY-MM-DD").clone();
            const currentDate = moment(); // Lấy ngày hiện tại
            const date_1 = currentDate.clone().add(1, 'days');
            const date_2 = date_start.clone().subtract(1, 'days');
            const date_3 = date_start.clone();
            const date_4 = date_start.clone().subtract(7, 'days');
            const date_5 = expected_date.clone().subtract(1, 'month');
            const date_8 = expected_date.clone().add(3, 'days');
            const checkTemplate = await template_public_class.checkTemplatePublicByStudentList(studentListId);
            if (checkTemplate.length != 0) {
                await template_public_class.addTemplateHistoryPublic(studentListId);
                if (checkClassStudy.type_study === 'Group' && checkClassStudy.name_programme !== 'Adults' && checkClassStudy.name_programme !== 'IELTS Adults') {
                    await template_public_class.resetTemplatePublic(studentListId, 5, moment(date_5).format('YYYY-MM-DD'));
                    await template_public_class.resetTemplatePublic(studentListId, 8, moment(date_8).format('YYYY-MM-DD'));
                }
            } else {
                if (checkClassStudy.type_study === 'Group' && checkClassStudy.name_programme !== 'Adults' || checkClassStudy.name_programme !== 'IELTS Adults') {
                    await template_public_class.addTemplatePublicHaveContent(studentListId, TemplatePublicClass.TemplateOne.CONTENT, TemplatePublicClass.TemplateOne.STT, moment(date_1).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublicHaveContent(studentListId, TemplatePublicClass.TemplateTwo.CONTENT, TemplatePublicClass.TemplateTwo.STT, moment(date_2).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublicHaveContent(studentListId, TemplatePublicClass.TemplateThere.CONTENT, TemplatePublicClass.TemplateThere.STT, moment(date_3).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublicHaveContent(studentListId, TemplatePublicClass.TemplateFour.CONTENT, TemplatePublicClass.TemplateFour.STT, moment(date_4).format('YYYY-MM-DD'));
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateFive.CONTENT, TemplatePublicClass.TemplateFive.STT, moment(date_5).format('YYYY-MM-DD'));
                    // kiểm tra level của học viên nào
                    if (checkClassStudy.class_name.substring(0, 3) === 'KL3' || checkClassStudy.class_name.substring(0, 3) === 'KL4' || checkClassStudy.class_name.substring(0, 3) === 'KL5' || checkClassStudy.class_name.substring(0, 6) === 'FLYERS' || checkClassStudy.class_name.substring(0, 3) === 'TT3' || checkClassStudy.class_name.substring(0, 3) === 'TT4') {
                        await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSix.CONTENT, TemplatePublicClass.TemplateSix.STT, moment(month_3).format('YYYY-MM-DD'));
                    } else {
                        await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSix.CONTENT, TemplatePublicClass.TemplateSix.STT, null);
                    }
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateSeven.CONTENT, TemplatePublicClass.TemplateSeven.STT, null);
                    await template_public_class.addTemplatePublic(studentListId, TemplatePublicClass.TemplateEight.CONTENT, TemplatePublicClass.TemplateEight.STT, moment(date_8).format('YYYY-MM-DD'));
                }
            }
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }


    async updateTemplateTaskSix(studentListId, classId) {
        try {
            const checkClassStudy = await Classroom.findOne({
                where: {
                    id: classId
                },
                attributes: ['type_study', 'name_programme', 'class_name', 'day_study', 'date_end'],
            })
            // Chuyển date_end thành đối tượng moment và lùi 3 tháng
            const month_3 = moment(checkClassStudy.date_end).subtract(3, 'months');
            const checkTemplate = await template_public_class.checkTemplatePublicByStudentList(studentListId);
            if (checkTemplate.length != 0) {
                if (checkClassStudy.type_study === 'Group' && checkClassStudy.name_programme !== 'Adults' && checkClassStudy.name_programme !== 'IELTS Adults') {
                    const checkTemplatePublicSix = await template_public_class.checkTemplatePublicStt(studentListId, 6);
                    const checkTemplatePublicSeven = await template_public_class.checkTemplatePublicStt(studentListId, 7);
                    if (!checkTemplatePublicSix && !checkTemplatePublicSeven) {
                        await template_public_class.resetTemplatePublic(studentListId, 6, moment(month_3).format('YYYY-MM-DD'));
                    }
                }
            }
        } catch (error) {
            logger.error(error)
            throw error;
        }
    }
}

module.exports = new CommonService;