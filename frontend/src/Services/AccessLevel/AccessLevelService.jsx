import { PAGE_ACCESS_LEVEL_MAP } from "./AccessLevelMap";

export const setAccessLevel = (accessLevels) => {
    accessLevels = JSON.stringify(accessLevels);
    localStorage.setItem('accessLvls', accessLevels);
}

export const getAccessLvl = () => {
    return JSON.parse(localStorage.getItem('accessLvls'));
}
export const hasAuthority = (page) => {
    let auth = getAccessLvl();
    let pageAccessedBy = PAGE_ACCESS_LEVEL_MAP.get(page);
    let count = 0;
    if (auth) {
        for (let i = 0; i < auth.length; i++) {
            if (pageAccessedBy.includes(auth[i])) {
                count++;
            }
        }
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
