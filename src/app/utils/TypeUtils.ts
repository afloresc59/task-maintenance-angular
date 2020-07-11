export class TypeUtils {

    static DEFAULT_VALUE_PROGRESS = 'P';
    static DEFAULT_VALUE_STATUS = '1';
    static DEFAULT_VALUE_EMPLOYEE = '0';
    
    static buildProgressTypes() {
        const progressTypes = [
            {"code": 'P', "description": "PENDING"},
            {"code": 'F', "description": "FINISHED"}
        ];
        return progressTypes;
    }

    static buildStatusTypes() {
        const statustypes = [
            {'code': '1', 'description': 'ACTIVE'},
            {'code': '0', 'description': 'INACTIVE'}
        ];
        return statustypes;
    }

}