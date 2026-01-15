const SystemConst = require("../../common/consts/system_const");
const EnumMessage = require("../../common/enums/enum_message");
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions");
const logger = require("../../config/logger.config");
const studentServices = require("../../services/student/student.services");
const formatUtils = require("./format.utils");
const server_response = require("./server_response");


const checkStudentOfAssignmentClass = async (req, res, next) => {
    try {
        const accountId = req.user.account_id;
        const role = req.user.role;
        const postId = req.params.post_id || req.body.post_id;
        let student;
        if (role === EnumServerDefinitions.ROLE.STUDENT) {
            student = await studentServices.findStudentByAccountId(accountId);
            if (!student) {
                return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.FORBIDDEN_REQUEST,
                    EnumMessage.NO_PERMISSION);
            }
            const checkAssignmentOfClass = await formatUtils.checkStudentOfAssignmentClass(student.id);
            const found = checkAssignmentOfClass.find((item) => item.id == postId);
            if (found) {
                return next();
            }
            return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.FORBIDDEN_REQUEST,
                EnumMessage.NO_PERMISSION);
        }
    } catch (error) {
        logger.error(error);
        return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER,
            EnumMessage.DEFAULT_ERROR);
    }
}

module.exports = checkStudentOfAssignmentClass;