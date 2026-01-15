const Classroom = require('../../models/classroom.model');
const logger = require('../../config/logger.config');
const moment = require('moment');
const formatUtils = require('./format.utils');
const template_contentServices = require('../../services/student_template.services.js/template_content.services');
const student_templateServices = require('../../services/student_template.services.js/student_template.services');
const StudentTemplate = require('../../models/student_template.model');
class TemplatePrivate {
    async addTemplateToTemplateString(studentListId, classId, dateStartStr, dateEndStr) {
        try {
            const classInfo = await Classroom.findOne({
                where: { id: classId },
                attributes: ['template_category_id', 'day_study']
            });
            if (!classInfo?.template_category_id) return;
            const templates = await template_contentServices.findAllTemplateByCategory(classInfo.template_category_id);
            const dateStart = moment(dateStartStr, "YYYY-MM-DD");
            const dateEnd = moment(dateEndStr, "YYYY-MM-DD");
            const after10Buoi = await formatUtils.getNumberDay(dateStart, 10, classInfo.day_study);
            const dateResolver = {
                "Trước Ngày Bắt Đầu": t => dateStart.clone().subtract(t.number_date, "days"),
                "Ngày Bắt Đầu": () => dateStart.clone(),
                "Sau Ngày Bắt Đầu": t => dateStart.clone().add(t.number_date, "days"),
                "Trước Ngày Kết Thúc": t => dateEnd.clone().subtract(t.number_date, "days"),
                "Ngày Kết Thúc": () => dateEnd.clone(),
                "Sau Ngày Kết Thúc": t => dateEnd.clone().add(t.number_date, "days"),
                "Sau 10 Buổi": () => dateStart.clone().add(after10Buoi, "days")
            };
            for (const t of templates) {
                const resolver = dateResolver[t.type_date];
                if (!resolver) continue;

                await student_templateServices.createStudentTemplate(
                    t.id,
                    studentListId,
                    resolver(t)
                );
            }
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async resetTemplate(studentListId, classId, dateStartStr, dateEndStr) {
        try {
            await student_templateServices.UpdateResetTemplateStudent(studentListId)
            const classInfo = await Classroom.findOne({
                where: { id: classId },
                attributes: ['template_category_id', 'day_study']
            });
            if (!classInfo?.template_category_id) return;
            const templates = await template_contentServices.findAllTemplateByCategory(classInfo.template_category_id);
            const dateStart = moment(dateStartStr, "YYYY-MM-DD");
            const dateEnd = moment(dateEndStr, "YYYY-MM-DD");
            const after10Buoi = await formatUtils.getNumberDay(dateStart, 10, classInfo.day_study);
            const dateResolver = {
                "Trước Ngày Bắt Đầu": t => dateStart.clone().subtract(t.number_date, "days"),
                "Ngày Bắt Đầu": () => dateStart.clone(),
                "Sau Ngày Bắt Đầu": t => dateStart.clone().add(t.number_date, "days"),
                "Trước Ngày Kết Thúc": t => dateEnd.clone().subtract(t.number_date, "days"),
                "Ngày Kết Thúc": () => dateEnd.clone(),
                "Sau Ngày Kết Thúc": t => dateEnd.clone().add(t.number_date, "days"),
                "Sau 10 Buổi": () => dateStart.clone().add(after10Buoi, "days")
            };
            for (const t of templates) {
                const resolver = dateResolver[t.type_date];
                if (!resolver) continue;

                await student_templateServices.createStudentTemplate(
                    t.id,
                    studentListId,
                    resolver(t)
                );
            }
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}

module.exports = new TemplatePrivate;