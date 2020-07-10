export class PathUrl {

    static EMPTY = '';
    static TASK = 'task';
    static TASK_MAINTENANCE = 'maintenance';

    static buildRouteApplication(...paths: any[]) {
        let route = '';

        paths.forEach(path => { route = route + path + '/' });

        return route.slice(0, route.length - 1);
    }

}